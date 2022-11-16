import express from 'express'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/assets', express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (request, response) => {
    response.render('home')
})
app.get('/contact', (request, response) => {
    response.render('contact')
})
app.post('/contact', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('Thank you for your message. We will be in touch soon.')
})
app.get('/login', (request, response) => {
    response.render('login')
})

app.listen(PORT, () => {
    console.log(`Starter server on port ${PORT}`)
})