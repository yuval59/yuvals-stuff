'use client'

import { HeightmapCanvasProps } from './heightmap-canvas'

/** Every knob the canvas takes, with nothing left optional. */
export type HeightmapParams = Required<Omit<HeightmapCanvasProps, 'className'>>

export type HeightmapControlsProps = {
    params: HeightmapParams
    onChange: (patch: Partial<HeightmapParams>) => void
    onReset: () => void
    shown: boolean
    onToggle: () => void
}

const panel =
    'w-72 rounded-xl border border-gray-700 bg-black/70 p-4 text-white shadow-lg'
const button =
    'rounded-lg bg-gray-800/80 px-3 py-2 text-sm font-medium text-white border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
const label = 'flex items-center justify-between text-xs text-gray-300'
const slider = 'w-full accent-blue-500'
const select =
    'w-full rounded-md border border-gray-700 bg-gray-900 p-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500'

type SliderRowProps = {
    name: string
    value: number
    min: number
    max: number
    step: number
    onChange: (value: number) => void
}

const SliderRow = ({ name, value, min, max, step, onChange }: SliderRowProps) => (
    <label className='block space-y-1'>
        <span className={label}>
            <span>{name}</span>
            <span className='font-mono text-gray-400'>
                {Number.isInteger(step) ? value : value.toFixed(2)}
            </span>
        </span>

        <input
            type='range'
            className={slider}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onChange(event.target.valueAsNumber)}
        />
    </label>
)

export const HeightmapControls = ({
    params,
    onChange,
    onReset,
    shown,
    onToggle,
}: HeightmapControlsProps) => (
    // Above the canvas, which sits at a negative z-index
    <div className='fixed bottom-4 right-4 z-20 flex flex-col items-end gap-2'>
        {shown && (
            <div id='heightmap-controls' className={panel}>
                <div className='space-y-3'>
                    <SliderRow
                        name='Seed'
                        value={params.seed}
                        min={0}
                        max={9999}
                        step={1}
                        onChange={(seed) => onChange({ seed })}
                    />
                    <SliderRow
                        name='Octaves'
                        value={params.octaves}
                        min={1}
                        max={8}
                        step={1}
                        onChange={(octaves) => onChange({ octaves })}
                    />
                    <SliderRow
                        name='Lacunarity'
                        value={params.lacunarity}
                        min={1.5}
                        max={4}
                        step={0.1}
                        onChange={(lacunarity) => onChange({ lacunarity })}
                    />
                    <SliderRow
                        name='Gain'
                        value={params.gain}
                        min={0.1}
                        max={0.9}
                        step={0.05}
                        onChange={(gain) => onChange({ gain })}
                    />
                    <SliderRow
                        name='Amplitude'
                        value={params.amplitude}
                        min={0}
                        max={1.5}
                        step={0.05}
                        onChange={(amplitude) => onChange({ amplitude })}
                    />

                    <label className='block space-y-1'>
                        <span className={label}>Noise type</span>

                        <select
                            className={select}
                            value={params.noiseType}
                            onChange={(event) =>
                                onChange({
                                    noiseType: event.target
                                        .value as HeightmapParams['noiseType'],
                                })
                            }
                        >
                            <option value='gradient'>Gradient</option>
                            <option value='value'>Value</option>
                        </select>
                    </label>

                    <label className='flex items-center gap-2 text-xs text-gray-300'>
                        <input
                            type='checkbox'
                            className='accent-blue-500'
                            checked={params.wireframe}
                            onChange={(event) =>
                                onChange({ wireframe: event.target.checked })
                            }
                        />
                        Wireframe
                    </label>

                    <button type='button' className={button} onClick={onReset}>
                        Reset
                    </button>
                </div>
            </div>
        )}

        <button
            type='button'
            className={button}
            onClick={onToggle}
            aria-expanded={shown}
            aria-controls='heightmap-controls'
        >
            {shown ? 'Hide controls' : 'Show controls'}
        </button>
    </div>
)
