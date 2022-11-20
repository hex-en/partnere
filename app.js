import express from 'express'
import { mongoose } from 'mongoose'
import { articleRouter } from './routes/articles.js'
import { Article } from './models/article.js'
import methodOverride from 'method-override'



const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost/blog')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use('/assets', express.static('public'))
app.use(methodOverride('_method'))

app.get('/', async (request, response) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    response.render('home', { articles: articles })
})

app.get('/login', (request, response) => {
    response.render('login')
})
app.post('/login', (request, response) => {
    response.render('login')
})

app.get('/articles', async (request, response) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    response.render('articles', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => {
    console.log(`Starter server on port ${PORT}`)
})