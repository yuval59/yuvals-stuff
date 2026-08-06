'use client'

import { useEffect, useRef } from 'react'
import {
    FractionalBrownianMotion,
    GradientNoise,
    NoiseMap,
    ValueNoise,
    getMulberry32,
} from '../noise-gen'

// The noise map's default grid minus one: sampling coordinates are kept inside
// it so the generator never wraps and seams.
const LATTICE = 254

// Camera. The mesh lives in [-1, 1] on X/Z with Y up.
const PITCH = 0.62 // radians, how far we look down at the terrain
const DISTANCE = 4.2 // camera distance along the view axis
const NEAR = 0.2 // anything closer than this gets clipped away

// The canvas is a 100vmax square, which is a huge buffer on a hidpi display,
// so the backing store is capped instead of blindly following the pixel ratio.
const MAX_BACKING_SIDE = 3072

// Directional light, in view space so the shading matches the fixed camera.
const LIGHT: readonly [number, number, number] = [-0.45, 0.82, -0.35]

// Low to high elevation, roughly matching the blue-950 page background.
const RAMP: readonly (readonly [number, number, number])[] = [
    [7, 17, 54],
    [17, 56, 128],
    [37, 128, 186],
    [116, 199, 214],
    [238, 246, 255],
]

const rampColor = (height: number): [number, number, number] => {
    const clamped = Math.min(Math.max(height, 0), 1)
    const position = clamped * (RAMP.length - 1)
    const index = Math.min(Math.floor(position), RAMP.length - 2)
    const t = position - index

    const from = RAMP[index]
    const to = RAMP[index + 1]

    return [
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
        from[2] + (to[2] - from[2]) * t,
    ]
}

export type HeightmapCanvasProps = {
    /**
     * Extra classes for the wrapping element. The default pins the mesh to the
     * viewport behind everything else, which needs an ancestor that creates a
     * stacking context (e.g. `isolate`) so it still paints over its background.
     */
    className?: string
    /** Grid subdivisions per side. Higher looks smoother, costs more to draw. */
    resolution?: number
    /** Vertical exaggeration of the terrain, in world units. */
    amplitude?: number
    /** Noise frequency. Higher means smaller, busier features. */
    scale?: number
    /** Fixed camera yaw, in radians. The camera never moves on its own. */
    rotation?: number
    /** Seed for the noise, so the terrain is reproducible. */
    seed?: number
    /** How many noise maps fBm stacks on top of each other. */
    octaves?: number
    /** Frequency multiplier between octaves. */
    lacunarity?: number
    /** Amplitude multiplier between octaves. Lower means smoother. */
    gain?: number
    /** Which of the generator's noise maps to stack. */
    noiseType?: 'gradient' | 'value'
    /** Draw the mesh as a wireframe instead of shaded quads. */
    wireframe?: boolean
}

export const HeightmapCanvas = ({
    className = 'pointer-events-none fixed inset-0 -z-10 grid place-items-center overflow-hidden',
    resolution = 256,
    amplitude = 0.55,
    scale = 4,
    rotation = 0,
    seed = 1337,
    octaves = 4,
    lacunarity = 2,
    gain = 0.5,
    noiseType = 'gradient',
    wireframe = true,
}: HeightmapCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context) return

        const side = resolution + 1
        const vertexCount = side * side

        // Scratch buffers for the single render pass.
        const heights = new Float32Array(vertexCount)
        const worldY = new Float32Array(vertexCount)
        const projX = new Float32Array(vertexCount)
        const projY = new Float32Array(vertexCount)
        const screenX = new Float32Array(vertexCount)
        const screenY = new Float32Array(vertexCount)
        const depth = new Float32Array(vertexCount)

        const quadCount = resolution * resolution
        const quadIndex = new Int32Array(quadCount)
        const quadDepth = new Float32Array(quadCount)
        const quadOrder = new Int32Array(quadCount)

        // Canvas size in CSS pixels, kept in sync by the ResizeObserver below.
        let width = 0
        let height = 0

        const resize = () => {
            width = canvas.clientWidth
            height = canvas.clientHeight

            const ratio = Math.min(
                window.devicePixelRatio || 1,
                MAX_BACKING_SIDE / Math.max(width, height, 1),
            )

            canvas.width = Math.max(1, Math.round(width * ratio))
            canvas.height = Math.max(1, Math.round(height * ratio))

            // Draw in CSS pixels, let the transform handle the device ratio.
            context.setTransform(ratio, 0, 0, ratio, 0, 0)
        }

        const octaveMaps = Array.from({ length: octaves }, (_, octave) => {
            const randomness = getMulberry32(seed + octave)

            return noiseType === 'value'
                ? new ValueNoise(randomness)
                : new GradientNoise(randomness)
        })

        // Every octave multiplies the frequency by the lacunarity, so the base
        // is held low enough that the last one still fits the lattice.
        const spread = Math.pow(lacunarity, octaves - 1)
        const frequency = Math.min(scale, LATTICE / spread) / LATTICE

        const noiseMap = new FractionalBrownianMotion(
            // fBm asks for NoiseMap<unknown>[], which a NoiseMap<Vector2> is
            // not assignable to because of the class' private members.
            octaveMaps as unknown as NoiseMap<unknown>[],
            frequency,
            frequency,
            1,
            lacunarity,
            gain,
        )

        // The terrain only depends on the props, so it is generated once and
        // every draw after that is pure projection.
        const buildTerrain = () => {
            let lowest = Infinity
            let highest = -Infinity

            for (let vertex = 0; vertex < vertexCount; vertex++) {
                const column = vertex % side
                const row = (vertex - column) / side

                // Sampled over [0, 1] so even the highest octave stays inside
                // the generator's lattice, which would otherwise wrap.
                const raw = noiseMap.getValueAt(
                    column / resolution,
                    row / resolution,
                )

                heights[vertex] = raw

                if (raw < lowest) lowest = raw
                if (raw > highest) highest = raw
            }

            // fBm sums signed octaves, so rescale whatever came out to [0, 1].
            const span = Math.max(highest - lowest, Number.EPSILON)
            const step = 2 / resolution

            for (let vertex = 0; vertex < vertexCount; vertex++) {
                const column = vertex % side
                const row = (vertex - column) / side

                const x = -1 + column * step
                const z = -1 + row * step

                // Flatten the edges a little so the mesh reads as an island, not a slab.
                const falloff = Math.max(0, 1 - 0.45 * (x * x + z * z))
                const elevation = ((heights[vertex] - lowest) / span) * falloff

                heights[vertex] = elevation
                worldY[vertex] = (elevation - 0.5) * amplitude
            }
        }

        const draw = () => {
            if (width === 0 || height === 0) return

            const cosYaw = Math.cos(rotation)
            const sinYaw = Math.sin(rotation)
            const cosPitch = Math.cos(PITCH)
            const sinPitch = Math.sin(PITCH)

            const centerX = width / 2
            const centerY = height / 2

            // Projected bounds of the mesh, used to fit it to the canvas below.
            let minX = Infinity
            let maxX = -Infinity
            let minY = Infinity
            let maxY = -Infinity

            // Undo the yaw on the light so it stays put relative to the viewer.
            const lightX = LIGHT[0] * cosYaw + LIGHT[2] * sinYaw
            const lightY = LIGHT[1]
            const lightZ = -LIGHT[0] * sinYaw + LIGHT[2] * cosYaw

            const step = 2 / resolution

            for (let row = 0; row < side; row++) {
                const z = -1 + row * step

                for (let column = 0; column < side; column++) {
                    const x = -1 + column * step
                    const vertex = row * side + column

                    const y = worldY[vertex]

                    // Yaw around Y, then pitch, then push away from the camera.
                    const rotatedX = x * cosYaw - z * sinYaw
                    const rotatedZ = x * sinYaw + z * cosYaw

                    const viewY = y * cosPitch - rotatedZ * sinPitch
                    const viewZ = y * sinPitch + rotatedZ * cosPitch + DISTANCE

                    depth[vertex] = viewZ

                    // Unscaled projection, turned into pixels once the mesh
                    // bounds are known.
                    const perspective = 1 / Math.max(viewZ, NEAR)
                    const projectedX = rotatedX * perspective
                    const projectedY = -viewY * perspective

                    projX[vertex] = projectedX
                    projY[vertex] = projectedY

                    if (projectedX < minX) minX = projectedX
                    if (projectedX > maxX) maxX = projectedX
                    if (projectedY < minY) minY = projectedY
                    if (projectedY > maxY) maxY = projectedY
                }
            }

            // Scale so the shorter side of the mesh still covers the canvas,
            // i.e. the terrain bleeds off the edges instead of leaving gaps.
            const spanX = Math.max(maxX - minX, Number.EPSILON)
            const spanY = Math.max(maxY - minY, Number.EPSILON)
            const zoom = Math.max(width / spanX, height / spanY)

            const meshCenterX = (minX + maxX) / 2
            const meshCenterY = (minY + maxY) / 2

            for (let vertex = 0; vertex < vertexCount; vertex++) {
                screenX[vertex] = centerX + (projX[vertex] - meshCenterX) * zoom
                screenY[vertex] = centerY + (projY[vertex] - meshCenterY) * zoom
            }

            // Collect the quads that are actually in front of the camera.
            let visible = 0
            for (let row = 0; row < resolution; row++) {
                for (let column = 0; column < resolution; column++) {
                    const topLeft = row * side + column
                    const topRight = topLeft + 1
                    const bottomLeft = topLeft + side
                    const bottomRight = bottomLeft + 1

                    const averageDepth =
                        (depth[topLeft] +
                            depth[topRight] +
                            depth[bottomLeft] +
                            depth[bottomRight]) /
                        4

                    if (averageDepth <= NEAR) continue

                    quadIndex[visible] = topLeft
                    quadDepth[visible] = averageDepth
                    visible++
                }
            }

            for (let index = 0; index < visible; index++)
                quadOrder[index] = index

            // Painter's algorithm: furthest quads first, so near ones paint over them.
            const order = quadOrder.subarray(0, visible)
            order.sort((a, b) => quadDepth[b] - quadDepth[a])

            context.clearRect(0, 0, width, height)
            context.lineJoin = 'round'
            context.lineWidth = wireframe ? 0.6 : 1

            for (let index = 0; index < visible; index++) {
                const quad = order[index]
                const topLeft = quadIndex[quad]
                const topRight = topLeft + 1
                const bottomLeft = topLeft + side
                const bottomRight = bottomLeft + 1

                context.beginPath()
                context.moveTo(screenX[topLeft], screenY[topLeft])
                context.lineTo(screenX[topRight], screenY[topRight])
                context.lineTo(screenX[bottomRight], screenY[bottomRight])
                context.lineTo(screenX[bottomLeft], screenY[bottomLeft])
                context.closePath()

                const averageHeight =
                    (heights[topLeft] +
                        heights[topRight] +
                        heights[bottomLeft] +
                        heights[bottomRight]) /
                    4

                if (wireframe) {
                    const [red, green, blue] = rampColor(averageHeight * 1.6)
                    context.strokeStyle = `rgb(${red | 0}, ${green | 0}, ${blue | 0})`
                    context.stroke()
                    continue
                }

                // Surface normal from the two grid-aligned edges of the quad.
                const dy = worldY[topRight] - worldY[topLeft]
                const dz = worldY[bottomLeft] - worldY[topLeft]

                let normalX = -dy * step
                let normalY = step * step
                let normalZ = -step * dz

                const length = Math.hypot(normalX, normalY, normalZ) || 1
                normalX /= length
                normalY /= length
                normalZ /= length

                const diffuse = Math.max(
                    0,
                    normalX * lightX + normalY * lightY + normalZ * lightZ,
                )
                const shade = 0.35 + 0.65 * diffuse

                // Fade the far side of the mesh into the background.
                const fog = Math.min(
                    1,
                    Math.max(0, (quadDepth[quad] - DISTANCE + 1.1) / 2.2),
                )
                const [red, green, blue] = rampColor(averageHeight * 1.6)

                const finalRed = red * shade * (1 - 0.55 * fog)
                const finalGreen = green * shade * (1 - 0.55 * fog)
                const finalBlue = blue * shade * (1 - 0.4 * fog)

                const fill = `rgb(${finalRed | 0}, ${finalGreen | 0}, ${finalBlue | 0})`

                context.fillStyle = fill
                // Stroking with the fill colour hides the hairline seams between quads.
                context.strokeStyle = fill
                context.fill()
                context.stroke()
            }
        }

        // The mesh is static, so the only reason to redraw is a size change.
        const observer = new ResizeObserver(() => {
            resize()
            draw()
        })
        observer.observe(canvas)

        buildTerrain()
        resize()
        draw()

        return () => observer.disconnect()
    }, [
        resolution,
        amplitude,
        scale,
        rotation,
        seed,
        octaves,
        lacunarity,
        gain,
        noiseType,
        wireframe,
    ])

    return (
        <div className={className} aria-hidden='true'>
            {/* Square so the mesh keeps its aspect, vmax so it still covers the viewport */}
            <canvas ref={canvasRef} className='h-[100vmax] w-[100vmax]' />
        </div>
    )
}
