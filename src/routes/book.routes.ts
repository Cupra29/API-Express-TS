import express from 'express'
import * as bookServices from '../services/book.services'
import { signin } from '../controllers/auth.controller'
import { getBooksByPhrase, getBooksByPrice, getAverageBookCost } from '../controllers/book.controller'
import toNewBook from '../utils'

const router = express.Router()

router.get('/hello', (_req, res) => {
  res.send('Hello, world!')
})

router.get('/books', (req, res) => {
  const { phrase, price } = req.query

  if (phrase !== undefined) {
    getBooksByPhrase(req, res)
  } else if (price !== undefined) {
    getBooksByPrice(req, res)
  } else {
    const allBooks = bookServices.getBooks()
    res.status(200).json(allBooks)
  }
})

router.get('/books/average', getAverageBookCost)

router.get('/books/:id', (req, res) => {
  const book = bookServices.getBookById(req.params.id)

  return (book != null)
    ? res.status(200).json(book)
    : res.status(400).json({ error: 'ID not found' })
})

router.post('/books', (req, res) => {
  try {
    const newBook = toNewBook(req.body)

    const addedBook = bookServices.addBook(newBook)

    res.status(201).json(addedBook)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

router.post('/auth', signin)

export default router
