import mongoose from 'mongoose'
import process from 'node:process'

const DB_HEAD = process.env.DB_HEAD
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_COLLECTION = process.env.DB_COLLECTION


const Auth = process.env.NODE_ENV === 'prod' ? `${DB_USER}:${DB_PASS}@` : ''

const mongo_uri = `${DB_HEAD}://${Auth}${DB_HOST}:${DB_PORT}`

mongoose.connect(mongo_uri, {
  maxPoolSize: 50,
  dbName: DB_COLLECTION
})

const db = mongoose.connection

// eslint-disable-next-line no-console, no-undef
db.on('error', (err) => { console.error(err) })

// eslint-disable-next-line no-console, no-undef
db.on('open', () => { console.log('Mongodb connected successfully') })

export default db