import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/Index.vue'
import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'

const Article = ()=>import('../views/post/article/Article.vue')
const ArticleEdit = ()=>import('../views/post/article/ArticleEdit.vue')
const Category = ()=>import('../views/post/category/Category.vue')
const Tag = ()=>import('../views/post/tag/Tag.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/post',
                    name: 'post',
                    children: [
                        {
                            path: '/article',
                            name: 'article',
                            component: Article
                        },
                        {
                            path: '/article-edit/:article_id',
                            name: 'article-edit',
                            component: ArticleEdit
                        },
                        {
                            path: '/category',
                            name: 'category',
                            component: Category
                        },
                        {
                            path: '/tag',
                            name: 'tag',
                            component: Tag
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

export default router