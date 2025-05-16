"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VerticalScrollCards({
  data = [],
  renderCard,
  className = "",
}: {
  data: any[]
  renderCard: (item: any, index: number) => React.ReactNode
  className?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Safety check for empty data
  const noDataAvailable = !data || !Array.isArray(data) || data.length === 0
  if (noDataAvailable) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)] min-h-[400px]">
        <p className="text-gray-500">No data available</p>
      </div>
    )
  }

  // Set up refs for each card
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, data.length)
  }, [data])

  // Reset current index when data changes
  useEffect(() => {
    setCurrentIndex(0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [data])

  const scrollToCard = (index: number) => {
    if (!data || index < 0 || index >= data.length || !containerRef.current) return

    setIsScrolling(true)
    setCurrentIndex(index)

    const card = cardRefs.current[index]
    if (card && containerRef.current) {
      containerRef.current.scrollTo({
        top: card.offsetTop,
        behavior: "smooth",
      })

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }
  }

  const handleScroll = () => {
    if (isScrolling || !containerRef.current || !data || data.length === 0) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight

    // Find which card is most visible in the viewport
    let bestVisibleIndex = 0
    let bestVisibleArea = 0

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const cardTop = card.offsetTop - container.offsetTop
      const cardBottom = cardTop + card.clientHeight
      const visibleTop = Math.max(cardTop, scrollTop)
      const visibleBottom = Math.min(cardBottom, scrollTop + containerHeight)

      if (visibleBottom > visibleTop) {
        const visibleArea = visibleBottom - visibleTop
        if (visibleArea > bestVisibleArea) {
          bestVisibleArea = visibleArea
          bestVisibleIndex = index
        }
      }
    })

    if (bestVisibleIndex !== currentIndex) {
      setCurrentIndex(bestVisibleIndex)
    }
  }

  return (
    <div className={`relative h-[calc(100vh-200px)] min-h-[400px] ${className}`}>
      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory" onScroll={handleScroll}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`snap-start snap-always h-full w-full py-2 ${
              index === currentIndex ? "scale-100" : "scale-95 opacity-90"
            } transition-all duration-300`}
          >
            {renderCard(item, index)}
          </div>
        ))}
      </div>

      {data.length > 1 && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md"
            onClick={() => scrollToCard(currentIndex - 1)}
            disabled={currentIndex === 0 || isScrolling}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <div className="text-xs font-medium text-center bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
            {currentIndex + 1}/{data.length}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md"
            onClick={() => scrollToCard(currentIndex + 1)}
            disabled={currentIndex === data.length - 1 || isScrolling}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
