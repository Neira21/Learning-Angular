export interface iStore {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

export interface iDetailProduct {
  product: iStore,
  count: number,
  total: number
}
