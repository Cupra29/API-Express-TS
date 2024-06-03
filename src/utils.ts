import { NewBookEntry } from './types'

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value)
}

const parseTitle = (titleFromRequest: any): string => {
  if (!isString(titleFromRequest)) {
    throw new Error('Incorrect or missing title')
  }
  return titleFromRequest
}

const parseAuthor = (authorFormRequest: any): string => {
  if (!isString(authorFormRequest)) {
    throw new Error('Incorrect or missing author')
  }
  return authorFormRequest
}

const parsePrice = (priceFromRequest: any): number => {
  if (!isNumber(priceFromRequest)) {
    throw new Error('Inccorect or missing price')
  }
  return priceFromRequest
}

const parseAvailability = (availabilityFromRequest: any): number => {
  if (!isNumber(availabilityFromRequest)) {
    throw new Error('Incorrect or missing availability')
  }
  return availabilityFromRequest
}

const parseNumReviews = (numReviewsFromRequest: any): number => {
  if (!isNumber(numReviewsFromRequest)) {
    throw new Error('Incorrect or missing number of reviews')
  }
  return numReviewsFromRequest
}

const parseStars = (starsFromRequest: any): number => {
  if (!isNumber(starsFromRequest)) {
    throw new Error('Incorrect or missing number of stars')
  }
  return starsFromRequest
}

const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing description')
  }
  return descriptionFromRequest
}

const toNewBook = (object: any): NewBookEntry => {
  const newBook: NewBookEntry = {
    title: parseTitle(object.title),
    author: parseAuthor(object.author),
    price: parsePrice(object.price),
    availability: parseAvailability(object.availability),
    num_reviews: parseNumReviews(object.num_reviews),
    stars: parseStars(object.stars),
    description: parseDescription(object.description)
  }
  return newBook
}

export default toNewBook
