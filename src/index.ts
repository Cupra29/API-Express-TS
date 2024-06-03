import express from 'express'
import bookRoutes from './routes/book.routes'

const app = express()

app.use(express.json())

const PORT = 3000

app.use('/', bookRoutes)

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
