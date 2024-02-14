import dotenv from 'dotenv'
import process from 'node:process'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

export default dotenv
