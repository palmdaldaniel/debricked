const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()


// change this to my local http 
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/api', createProxyMiddleware({
    target: 'https://debricked.com',
    changeOrigin: true
}))

app.listen(8081, () => {
    console.log('listening on port 8081')
})
