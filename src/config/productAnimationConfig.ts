export const desktopCFG = {
  center: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.5,
  },
  left: {
    position: [-2.5, -0.125, -2.25],
    rotation: [0, 0.75, 0],
    scale: 0.4,
  },
  right: {
    position: [2.5, -0.125, -2.25],
    rotation: [0, -0.75, 0],
    scale: 0.4,
  },
}

export const mobileCFG = {
  center: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: 0.5,
  },
  left: {
    position: [-1.1, -0.125, -2],
    rotation: [0, 0.75, 0],
    scale: 0.35,
  },
  right: {
    position: [1.1, -0.125, -2],
    rotation: [0, -0.75, 0],
    scale: 0.35,
  },
}

export const desktopSpreadCFG = {
  spacing: 1.9,
  y: 0,
  z: 0,
  scale: 0.45,
}

export const mobileSpreadCFG = {
  spacing: 1.0,
  y: 0,
  z: 0,
  scale: 0.32,
}

export const SPREAD_PROGRESS_RANGE: [number, number] = [0.4, 0.95]
export const SPREAD_INFO_THRESHOLD = 0.6
