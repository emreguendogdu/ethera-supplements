const Item = ({ product, i, selectedItem, setSelectedItem, CFG, isMobile }) => {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const selected = selectedItem === i

  const positionKey = getPositionKey(i, selected, selectedItem)
  const targetPosition = CFG[positionKey].position
  const targetRotation = (state) =>
    selected || hovered
      ? [0, Math.sin(state.clock.getElapsedTime()) * 0.125, 0]
      : [0, Math.sin(state.clock.getElapsedTime() * 0.75) * 0.0625, 0]
  const targetScale = hovered
    ? CFG[positionKey].hoveredScale
    : CFG[positionKey].scale

  useProductAnimation({
    ref,
    position: targetPosition,
    rotation: targetRotation,
    scale: targetScale,
  })

  // Event Handlers
  const handlePointerOver = (e) => {
    if (!selected && !isMobile) {
      e.stopPropagation()
      hover(true)
    }
  }
  const handlePointerOut = () => {
    if (!selected && !isMobile) hover(false)
  }
  const handleClick = () => setSelectedItem(i)

  useEffect(() => {
    if (isMobile) return

    document.body.style.cursor = hovered ? "pointer" : "auto"
  }, [hovered, isMobile])

  return (
    <>
      <group
        ref={ref}
        position={[0, 10, 0]} // Initial position - will be overridden by the useFrame hook
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <Tub slug={product.slug} />
      </group>
      {selected && (
        <Html center position={[targetPosition[0], -1.125, targetPosition[2]]}>
          <div className="w-[200px] flex flex-col items-center justify-center text-center">
            <h3 className="subheading text-xl tracking-wide w-fit select-none">
              {product.name}
            </h3>
            <div>
              <Button
                href={`/products/${product.slug}`}
                className="mt-4 w-fit h-fit"
              >
                Shop now
              </Button>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}