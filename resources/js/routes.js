import HomeMain from "./views/HomeMain";
import Post from "./views/Post"
import HomeAdmin from "./views/admin/HomeAdmin"
import PostCreate from "./views/admin/PostCreate"
import PostEdit from "./views/admin/PostEdit"

export const routes = [
    {
        path: '/',
        component: HomeMain,
    },
    {
        path: '/posts/:slug',
        name: 'showPost',
        component: Post
    },
    {
        path: '/admin',
        component: HomeAdmin,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/post/create',
        component: PostCreate,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/post/edit/:slug',
        component: PostEdit,
        name: 'postEdit',
        meta: {
            requiresAuth: true
        }
    },
];
