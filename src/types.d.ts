export interface BookEntry {
  id: string
  title: string
  author: string
  price: number
  availability: number
  num_reviews: number
  stars: number
  description: string
}

export type NewBookEntry = Omit<BookEntry, 'id'>
