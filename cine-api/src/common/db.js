import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://ev3_express:n6oL7ukRGppaVIjz@cluster-express.bg7s9ir.mongodb.net/?appName=cluster-express'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
        }
})

export default client