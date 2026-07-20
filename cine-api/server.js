import express, { urlencoded } from 'express'
import cors from 'cors'

import client from './src/common/db.js'
import peliculaRoutes from './src/pelicula/routes.js'
import actorRoutes from './src/actor/routes.js'

const PORTS = 3000 || 4000
const app = express()

//dependencias
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {return res.status(200).send('Bienvenido al cine Iplacex') })

//middlewares
app.use('/api', peliculaRoutes)
app.use('/api', actorRoutes)

await client.connect()
.then(() => {
    console.log('Conexion exitosa.')
    app.listen(PORTS, () => {
        console.log(`Servidor corriendo en http://localhost:${PORTS}`)
        })
}) 
.catch((error) => {
    console.log('Error al intentar conectar al cluster:', error)
})


