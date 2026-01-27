"use client"

import { useState, useEffect } from "react"
import * as Slider from "@radix-ui/react-slider"

interface YearRangeSliderProps {
  minYear: number
  maxYear: number
  onChange: (range: [number, number]) => void
}

export function YearRangeSlider({ minYear, maxYear, onChange }: YearRangeSliderProps) {
  const [range, setRange] = useState<[number, number]>([minYear, maxYear])

  useEffect(() => {
    setRange([minYear, maxYear])
  }, [minYear, maxYear])

  const handleChange = (newRange: number[]) => {
    const typedRange: [number, number] = [newRange[0], newRange[1]]
    setRange(typedRange)
    onChange(typedRange)
  }

  return (
    <div className="px-2">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>{range[0]}</span>
        <span>{range[1]}</span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={range}
        min={minYear}
        max={maxYear}
        step={1}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-red-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Min year"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Max year"
        />
      </Slider.Root>
    </div>
  )
}
