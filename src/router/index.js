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
            meta: {
              title: "首页"
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/post',
                    name: 'post',
                    meta: {
                        title: "发布管理"
                    },
                    children: [
                        {
                            path: '/article',
                            name: 'article',
                            component: Article,
                            meta: {
                                title: "文章列表"
                            }
                        },
                        {
                            path: '/article-edit/:article_id',
                            name: 'article-edit',
                            component: ArticleEdit,
                            meta: {
                                title: "编辑文章"
                            }
                        },
                        {
                            path: '/category',
                            name: 'category',
                            component: Category,
                            meta: {
                                title: "分类列表    "
                            }
                        },
                        {
                            path: '/tag',
                            name: 'tag',
                            component: Tag,
                            meta: {
                                title: "标签"
                            }
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