import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import http from 'http'

const app = express()

//habilitando o uso de cookies no browser ao habilitar supports_credentials como true
app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8080/')
})
