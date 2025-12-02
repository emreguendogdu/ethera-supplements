export interface CartItemType {
  slug: string
  name: string
  price: number
  salePrice: number
  size: number
  flavor: string
  id: string
  quantity?: number
}

export interface CartContextType {
  cart: { cartItems: CartItemType[] }
  addItemToCart: (item: CartItemType) => void
  displayCart: boolean
  setDisplayCart: (display: boolean) => void
}

