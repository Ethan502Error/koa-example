import Koa, { Context, Next } from 'koa'
import process from 'node:process'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import KoaJson from 'koa-json'
import KoaLogger from 'koa-logger'
import KoaJsonError from 'koa-json-error'

import router from '@routes/index'

import '@/config/dotenv'
import '@/db/mongoose'

const app = new Koa()
const appPort: number = parseInt(process.env.APP_PORT || '3000', 10)
const appHost: string = process.env.App_Host || ''

/**
 * @description request logger
 * @param { Koa.Context } ctx
 * @param { Koa.Next } _next
 */
const loggerMiddleware = async (ctx: Context, _next: Next) => {
  const start: Date = new Date()
  await _next()
  const ms: number = new Date().getTime() - start.getTime()
  // eslint-disable-next-line no-undef, no-console
  console.log(`${ctx.ip}: ${ctx.method} ${ctx.url} - ${ms}ms`)
}

app.use(cors())
app.use(bodyParser())
app.use(loggerMiddleware)
app.use(KoaJson())
app.use(KoaLogger())
app.use(
  KoaJsonError({
    postFormat(err, { stack, ...rest }) {
      return process.env.NODE_ENV === 'prod' ? rest : err.name && { stack, ...rest }
    }
  })
)

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(appPort, appHost, () => {
  // eslint-disable-next-line no-console, no-undef
  console.log(`Server is runing on http://${appHost}:${appPort}`)
})