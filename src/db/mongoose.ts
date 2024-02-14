import { MongoClient } from 'mongodb'
import process from 'node:process'

const DB_HEAD = process.env.DB_HEAD
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_COLLECTION = process.env.DB_COLLECTION

const Auth = process.env.NODE_ENV === 'prod' ? `${DB_USER}:${DB_PASS}@` : ''

const mongo_uri = `${DB_HEAD}://${Auth}${DB_HOST}:${DB_PORT}`

const client = new MongoClient(mongo_uri, {
  maxPoolSize: 50,
  minPoolSize: 2
})

const run = async () => {
  try {
    await client.connect()
    await client.db(DB_COLLECTION).command({ ping: 1 })
    // eslint-disable-next-line no-console, no-undef
    console.log('Mongodb connected successfully')
  } finally {
    await client.close()
  }
}

// eslint-disable-next-line no-console, no-undef
run().catch(console.dir)
