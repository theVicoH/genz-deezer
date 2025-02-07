const VISIBLE_CARDS = 2

export const getVisibleIndexes = (currentIndex: number, total: number) => {
  const indexes = []

  for (let i = -VISIBLE_CARDS; i <= VISIBLE_CARDS; i++) {
    indexes.push((currentIndex + i + total) % total)
  }

  return indexes
}

export const getCardStyles = (index: number, currentIndex: number, total: number) => {
  const diff = (index - currentIndex + total) % total
  const adjustedDiff = diff > total / 2 ? diff - total : diff

  return {
    x: adjustedDiff * 150,
    scale: 1 - Math.abs(adjustedDiff) * 0.15,
    opacity: 1 - Math.abs(adjustedDiff) * 0.2,
    zIndex: 10 - Math.abs(adjustedDiff),
    isLeft: adjustedDiff < 0,
    isRight: adjustedDiff > 0
  }
}
