import express from 'express'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/assets', express.static('public'))


app.get('/', (request, response) => {
    response.render('home')
})
app.get('/contact', (request, response) => {
    response.send('contact')
})
app.get('/login', (request, response) => {
    response.send('login')
})

app.listen(PORT, () => {
    console.log(`Starter server on port ${PORT}`)
})