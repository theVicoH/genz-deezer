import { useState } from "react"

import { motion } from "motion/react"

import type { Track } from "@genz-deezer/core"

import { Skeleton } from "@/components/atoms/skeleton"

type TrackCardProps = {
  track: Track
  style: {
    x: number
    scale: number
    opacity: number
    zIndex: number
  }
  isActive: boolean
  isLeft: boolean
  isRight: boolean
  onClick: () => void
}

const TrackCard = ({ track, style, isActive, isLeft, isRight, onClick }: TrackCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const getRotationClass = () => {
    if (isLeft) {
      return "group-hover:-rotate-12"
    } else if (isRight) {
      return "group-hover:rotate-12"
    }

    return ""
  }

  return (
    <motion.div
      animate={style}
      initial={style}
      transition={{ duration: 0.3 }}
      style={{ 
        position: "absolute",
        top: "50%",
        x: `calc(-50% + ${style.x}px)`,
        y: "-50%",
        scale: style.scale,
        opacity: style.opacity,
        zIndex: style.zIndex
      }}
      className="group hover:cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={`relative h-64 w-64 overflow-hidden rounded-lg shadow-xl transition-all duration-300 ${getRotationClass()} ${
          isActive ? "group-hover:scale-110" : "group-hover:scale-105"
        }`}
      >
        {!imageLoaded && (
          <Skeleton className="bg-muted absolute inset-0 h-full w-full" />
        )}
        <img
          src={track.album.cover_medium}
          alt={track.title}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </motion.div>
  )
}

export default TrackCard
