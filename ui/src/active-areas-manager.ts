/**
 * This file handles ActiveAreas, which are the clickable rectangles on the screen;
 * this is useful so we can build a UI that lets users interact with the UI itself,
 * while also being able to move around in our space.
 */

// @ts-ignore
const ipcRenderer = window.require('electron').ipcRenderer as ElectronIpcRenderer

interface ActiveArea {
  x: number
  y: number
  w: number
  h: number
}

let activeAreasDebugDraw = false
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null

/**
 * Toggle debug visuals for ActiveAreas
 */
function toggleDebugDraw() {
  activeAreasDebugDraw = !activeAreasDebugDraw
}

/**
 * Set up automatic ActiveAreas handling. Use "mwActiveArea" css classname on elements to make them clickable.
 * ```html
 * <div class="mwActiveArea"></div>
 * ```
 */
function activeAreasManagerSetup() {
  window.addEventListener('load', () => {
    const classToWatch = 'mwActiveArea'
    const activeAreaHtmlElements = document.getElementsByClassName(classToWatch)
    const handleActiveAreaChange = () => {
      const activeAreas = getActiveAreasFromHtmlCollection(activeAreaHtmlElements)
      if (activeAreasDebugDraw) {
        reDrawActiveAreas(activeAreas)
      }
      // TODO: FIX ESLINT IGNORE
      // eslint-disable-next-line
      // @ts-ignore
      ipcRenderer.send(`set-active-areas-${window._mw_overlay_id}`, activeAreas)
    }
    handleActiveAreaChange()
    window.addEventListener('resize', () => {
      handleActiveAreaChange()
    })

    const resizeObserver = new ResizeObserver(() => {
      handleActiveAreaChange()
    })
    for (let i = 0; i < activeAreaHtmlElements.length; i++) {
      const element = activeAreaHtmlElements.item(i)
      if (element) {
        // otherwise possible null
        resizeObserver.observe(element)
      }
    }
    const mutationObserver = new MutationObserver((mutationRecords) => {
      const toRefresh = mutationRecords.find((mutationRecord) => {
        switch (mutationRecord.type) {
          case 'attributes':
            if (mutationRecord.target instanceof HTMLElement) {
              if (mutationRecord.target.classList.contains(classToWatch)) {
                resizeObserver.observe(mutationRecord.target)
                return true
              } else if (
                mutationRecord.oldValue &&
                mutationRecord.oldValue.includes(classToWatch)
              ) {
                resizeObserver.unobserve(mutationRecord.target)
                return true
              }
            }
            break
          case 'childList':
            for (let i = 0; i < mutationRecord.addedNodes.length; i++) {
              const node = mutationRecord.addedNodes[i]
              if (node instanceof HTMLElement) {
                if (node.classList.contains(classToWatch)) {
                  resizeObserver.observe(node)
                  return true
                }
              }
            }
            for (let i = 0; i < mutationRecord.removedNodes.length; i++) {
              const node = mutationRecord.removedNodes[i]
              if (node instanceof HTMLElement) {
                if (node.classList.contains(classToWatch)) {
                  resizeObserver.unobserve(node)
                  return true
                }
              }
            }
            break
          default:
            break
        }
      })
      if (toRefresh) {
        handleActiveAreaChange()
      }
    })
    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    })
  })

  // canvas setup
  canvas = document.createElement('canvas')
  canvas.id = 'activeAreaDisplay'
  //styling
  canvas.style.position = 'absolute'
  canvas.style.zIndex = '-1'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.top = '0'
  canvas.style.left = '0'
  document.body.prepend(canvas)
  ctx = canvas.getContext('2d')
}

function getActiveAreasFromHtmlCollection(htmlCollection: HTMLCollection): ActiveArea[] {
  const activeAreas = []
  if (htmlCollection == null) {
    return []
  }
  for (let i = 0; i < htmlCollection.length; i++) {
    const htmlItem = htmlCollection.item(i)
    if (htmlItem == null) {
      continue
    }
    const domRect = htmlItem.getBoundingClientRect()
    activeAreas.push({
      x: domRect.x / window.innerWidth,
      y: domRect.y / window.innerHeight,
      w: domRect.width / window.innerWidth,
      h: domRect.height / window.innerHeight
    })
  }
  return activeAreas
}

function reDrawActiveAreas(activeAreas: ActiveArea[]) {
  if (ctx == null || canvas == null) {
    return
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //always draw the edge of the overlay
  drawNormalizedRectangle({ x: 0, y: 0, w: 1, h: 1 }, 'red', 6)
  activeAreas.forEach((activeArea) => {
    drawNormalizedRectangle(activeArea, 'yellow', 7)
  })
}

function drawNormalizedRectangle(
  { x, y, w, h }: { x: number; y: number; w: number; h: number },
  color: string | CanvasGradient | CanvasPattern,
  lineWidth: number
) {
  if (ctx == null) {
    return
  }
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color
  ctx.rect(
    x * window.innerWidth,
    y * window.innerHeight,
    w * window.innerWidth,
    h * window.innerHeight
  )
  ctx.stroke()
}

export { activeAreasManagerSetup, toggleDebugDraw }
