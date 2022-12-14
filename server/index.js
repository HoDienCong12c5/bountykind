const next = require('next')
const cacheableResponse = require('cacheable-response')
const express = require('express')
// const fs = require('fs')
// const resizeImg = require('resize-img')
// const fetch = require('node-fetch')
// const imageToBase64 = require('image-to-base64')

const routes = require('../common/routes')
const rp = require('request-promise')

require('dotenv').config()

const port = parseInt(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

// app.prepare().then(() => {
//   const server = express()
//   if (process.env.REACT_NEED_DEBUG !== 'true') {
//     server.get(
//       '*',
//       (_, res, nextHandler) => {
//         res.setHeader('Cache-Control', 'no-store, must-revalidate')
//         nextHandler()
//       }
//     )
//   }
//   server.use(handler).listen(port)
// }).catch(ex => {
//   console.error(ex.stack)
//   process.exit(1)
// })

const ssrCache = cacheableResponse({
  ttl: 0, // no cache
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})
const replaceOpenPhrap = async (dataa) => {
  const address = dataa.req.params.address || null
  const id = dataa.req.params.id || null
  const options = {
    uri: process.env.API_APP + '/store/' + address + '/' + id,
    json: true
  }
  rp(options).then(async (data) => {
    dataa.req.dataItem = data
  //   const response = await fetch(encodeURI(data.data.image))
  //   const buffer = await response.buffer()
  //   // dataa.req.file = await rp(buffer).then(async imageData => {
  //   const image = await resizeImg(buffer, {
  //     width: 62,
  //     height: 93
  //   })
  //
  //   await fs.writeFileSync('thumbnail.png', image)
  //   dataa.req.ibase64 = await imageToBase64('thumbnail.png')
    // console.log(ibase64)
    handler(dataa.req, dataa.res)
  })
}
const replaceOpenPhrapPackage = async (dataa) => {
  const id = dataa.req.params.id || null
  const options = {
    uri: process.env.API_APP + '/package/' + id,
    json: true
  }
  rp(options).then(async (data) => {
    dataa.req.dataItem = data
    handler(dataa.req, dataa.res)
  })
}
app.prepare().then(() => {
  const server = express()
  if (process.env.REACT_NEED_DEBUG !== 'true') {
    server.get('/_next/*', (req, res) => {
    /* serving _next static content using next.js handler */
      handler(req, res)
    })
    server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))
    server.get('/assets/item/:address/:id', (req, res) => replaceOpenPhrap({ req, res, pagePath: '/assets/item/:address/:id' }))
    server.get('/market/item/:address/:id', (req, res) => replaceOpenPhrap({ req, res, pagePath: '/market/item/:address/:id' }))
    server.get('/package/item/:id', (req, res) => replaceOpenPhrapPackage({ req, res, pagePath: '/package/item/:id' }))
    server.use(handler).listen(port)
    // server.get('*', (req, res) => {
    //   handler(req, res)
    // })
    /* starting server */
    // server.listen(port, (err) => {
    //   if (err) throw err
    //   console.log(`> Ready on http://localhost:${port}`)
    // })
  } else {
    server.get('/assets/item/:address/:id', (req, res) => replaceOpenPhrap({ req, res, pagePath: '/assets/item/:address/:id' }))
    server.get('/market/item/:address/:id', (req, res) => replaceOpenPhrap({ req, res, pagePath: '/market/item/:address/:id' }))
    server.get('/package/item/:id', (req, res) => replaceOpenPhrapPackage({ req, res, pagePath: '/package/item/:id' }))
    server.use(handler).listen(port)
  }
}).catch(ex => {
  console.error(ex.stack)
  process.exit(1)
})
