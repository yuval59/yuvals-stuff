'use client'

import { useDeferredValue, useState } from 'react'
import { HeightmapCanvas } from './heightmap-canvas'
import { HeightmapControls, HeightmapParams } from './heightmap-controls'

// Mirrors the canvas' own defaults, which stay in place for using it on its own.
const DEFAULTS: HeightmapParams = {
    resolution: 256,
    amplitude: 0.55,
    scale: 4,
    rotation: 0,
    seed: 1337,
    octaves: 4,
    lacunarity: 2,
    gain: 0.5,
    noiseType: 'gradient',
    wireframe: true,
}

export const HeightmapBackground = () => {
    const [params, setParams] = useState(DEFAULTS)
    const [controlsShown, setControlsShown] = useState(false)

    // Regenerating is expensive, so the panel keeps reacting immediately while
    // the canvas catches up with the latest value rather than every one on the
    // way there.
    const deferredParams = useDeferredValue(params)

    return (
        <>
            <HeightmapCanvas {...deferredParams} />

            <HeightmapControls
                params={params}
                onChange={(patch) => setParams({ ...params, ...patch })}
                onReset={() => setParams(DEFAULTS)}
                shown={controlsShown}
                onToggle={() => setControlsShown(!controlsShown)}
            />
        </>
    )
}
