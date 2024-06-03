import { Request, Response } from 'express'
import { filterBooksByPhrase, filterBooksByPrice, getBooks } from '../services/book.services'

export const getBooksByPhrase = (req: Request, res: Response): void => {
  const { phrase } = req.query

  if (typeof phrase !== 'string') {
    res.status(400).json({ error: 'Invalid phrase parameter. The phrase must be a string' })
    return
  }

  if (/^[a-zA-Z]+$/.test(phrase)) {
    const filteredBooks = filterBooksByPhrase(phrase)
    if (filteredBooks.length === 0) {
      if (phrase.trim() === '') {
        res.status(400).json({ error: 'Empty phrase provided' })
      } else {
        res.status(404).json({ error: 'No books found matching the provided phrase' })
      }
      return
    }
    res.status(200).json(filteredBooks)
    return
  }

  res.status(400).json({ error: 'Invalid phrase parameter. The phrase must contain only letters' })
}

export const getBooksByPrice = (req: Request, res: Response): void => {
  const { price } = req.query

  if (typeof price === 'number' || isNaN(parseFloat(price as string))) {
    res.status(400).json({ error: 'Invalid price parameter. The price must be a number' })
    return
  }

  const books = filterBooksByPrice(parseFloat(price as string))

  if (books.length === 0) {
    res.status(404).json({ error: 'No books found with the provided price' })
    return
  }

  res.status(200).json(books)
}

export const getAverageBookCost = (_req: Request, res: Response): void => {
  const books = getBooks()

  if (books.length === 0) {
    res.status(404).json({ error: 'No books found' })
    return
  }

  const totalCost = books.reduce((accumulator, book) => accumulator + book.price, 0)
  const averageCost = totalCost / books.length

  const roundedAverageCost = Math.round(averageCost * 100) / 100

  res.status(200).json({ average: roundedAverageCost })
}
