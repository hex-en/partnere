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

articleRouter.post('/', async (request, response) => {
    let article = new Article({
        title: request.body.title,
        description: request.body.description,
        markdown: request.body.markdown
    })
    try {
        article = await article.save()
        response.redirect(`/articles/${article.slug}`)
    } catch (e) {
        console.log(e)
        response.render('articles/new', { article: article })
    }

})

articleRouter.put('/:id', (request, response) => {

})

articleRouter.delete('/:id', async (request, response) => {
    await Article.findByIdAndDelete(request.params.id)
    response.redirect('/articles')
})

function saveArticleAndRedirect(path) {
    return(request, response) => {
        
    }
}


export { articleRouter };