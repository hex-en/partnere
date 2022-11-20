import express, { response, Router } from 'express'
import { Article } from '../models/article.js'



const articleRouter = express.Router()

articleRouter.get('/new', (request, response) => {
    response.render('articles/new', { article: new Article })
})
articleRouter.get('/edit/:id', async (request, response) => {
    const article = await Article.findById(request.params.id)
    response.render('articles/edit', { article: article })
})

articleRouter.get('/:slug', async (request, response) => {
    const article = await Article.findOne({ slug: request.params.slug })
    if (article == null) response.redirect('/')
    response.render('articles/show', { article: article })
})

articleRouter.post('/', async (request, response, next) => {
    request.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

articleRouter.put('/:id', async (request, response, next) => {
    request.article = await Article.findById(request.params.id)
    next()
}, saveArticleAndRedirect('edit'))



articleRouter.delete('/:id', async (request, response) => {
    await Article.findByIdAndDelete(request.params.id)
    response.redirect('/articles')
})

function saveArticleAndRedirect(path) {
    return async (request, response) => {
        let article = request.article
        article.title = request.body.title,
            article.description = request.body.description,
            article.markdown = request.body.markdown

        try {
            article = await article.save()
            response.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.log(e)
            response.render(`articles/${path}`, { article: article })
        }

    }
}


export { articleRouter };