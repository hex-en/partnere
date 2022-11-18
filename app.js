import express from 'express'
import mongoose from 'mongoose'
import { articleRouter } from './routes/articles.js'
import { Article } from './models/article.js'


const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use('/assets', express.static('public'))


app.get('/', async (request, response) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    response.render('home', { articles: articles })
})
app.get('/contact', (request, response) => {
    response.render('contact')
})
app.post('/contact', (request, response) => {
    console.log('Contact form submission: ')
    response.send('Thank you for your message. We will be in touch soon.')
})
app.get('/login', (request, response) => {
    response.render('login')
})

app.use('/articles', articleRouter)

app.listen(PORT, () => {
    console.log(`Starter server on port ${PORT}`)
})