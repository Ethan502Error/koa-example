import Router from '@koa/router'

// Import some controller to here

const book = new Router()

// Create some router methods and input controllers | middlewares
book.get('/', async (ctx) => {
  ctx.body = 'hooo'
})

export default book