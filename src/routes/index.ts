import Router from '@koa/router'

import bookRoutes from '@routes/book/bookRoutes'

const router = new Router({
  prefix: '/api'
})

// If you write a alias string before the routes
// Then your request url like: /api/book/routesFile`s prefix/*
router.use('/book', bookRoutes.routes())

export default router