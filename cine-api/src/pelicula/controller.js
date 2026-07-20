import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Pelicula } from './película.js'

const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertPeliculaRequest(req,res){
    const data = req.body
    const pelicula = { ...Pelicula }

    pelicula._id = new ObjectId()
    pelicula.nombre = data.nombre
    pelicula.generos = data.generos
    pelicula.anioEstreno = data.anioEstreno

    await peliculaCollection.insertOne(pelicula)
    .then ((data) => {
        if (data === null) return res.status(400).send('Error al guardar la pelicula')
            
            return res.status(201).send(data)
        })
    .catch((e) => { return res.status(500).send({error: e.code}) })
}

async function handleGetPeliculasRequest(req,res){
    await peliculaCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({error: e}) })
}

async function handleGetPeliculaByIdRequest(req,res){
    const id = req.params.id
    
    try {
        let oid = ObjectId.createFromHexString(id)
        
        await peliculaCollection.findOne({ _id: oid })
        .then((data) => {
            if (data === null) { return res.status(404).send('Pelicula no encontrada.')}
            
            return res.status(200).send(data) 
        })
        
        .catch((e) => { return res.status(500).send({ error: e.code }) })
  
    } catch (e) {
    return res.status(400).send('Id mal formado')
  }
}

async function handleUpdatePeliculaByIdRequest(req,res){
    const id = req.params.id
    const data = req.body

    try {
        let oid = ObjectId.createFromHexString(id)

        const pelicula = { 
            nombre: data.nombre,
            generos: data.generos,
            anioEstreno: data.anioEstreno
        }

        let query = { $set: pelicula }
        
        await peliculaCollection.updateOne({_id: oid}, query)
        
        .then((data) => {if (data.matchedCount === 0) { return res.status(404).send('Película no encontrada')}
        
        return res.status(200).send(data)
    })
        
        .catch((e) => { return res.status(500).send({error: e.code}) })
    
    } catch (e) { return res.status(400).send('Id mal formado')}
}

async function handleDeletePeliculaByIdRequest(req,res){
    const id = req.params.id

    try{
       let oid = ObjectId.createFromHexString(id) 

       await peliculaCollection.deleteOne({_id: oid})
       
       .then((data) => {if (data.deletedCount === 0) {return res.status(404).send('Película no encontrada')}
        
        return res.status(200).send(data)
       })
       
       .catch((e) => { return res.status(500).send({error: e.code}) })

    } catch (e) { return res.status(400).send('Id mal formado')}
}

export default{
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculaByIdRequest,
    handleUpdatePeliculaByIdRequest,
    handleDeletePeliculaByIdRequest
}