import { v4 as uuidv4 } from 'uuid'
import { BookEntry, NewBookEntry } from '../types'
import bookData from './MOCK_DATA.json'

const books: BookEntry[] = bookData

export const getBooks = (): BookEntry[] => books

export const getBookById = (id: string): BookEntry | undefined => {
  const entry = books.find(b => b.id === id)
  return entry
}

export const addBook = (newBookEntry: NewBookEntry): BookEntry => {
  const newBook = {
    id: uuidv4(),
    ...newBookEntry
  }
  books.push(newBook)
  return newBook
}

function isPhraseInAuthorName (phrase: string, authorName: string): boolean {
  const phraseChars = Array.from(phrase)

  return phraseChars.every(char => authorName.includes(char))
}

export const filterBooksByPhrase = (phrase: string): BookEntry[] => {
  const lowercasePhrase = phrase.toLowerCase()

  const filteredBooks = books.filter(book =>
    isPhraseInAuthorName(lowercasePhrase, book.author.toLowerCase())
  )

  return filteredBooks
}

export const filterBooksByPrice = (price: number): BookEntry[] => {
  return books.filter(book => book.price > price)
}
