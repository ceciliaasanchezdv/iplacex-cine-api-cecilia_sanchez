import { ObjectId } from "mongodb";
import client from '../common/db.js'
import { Actor } from './actor.js'

const actorCollection = client.db('cine-db').collection('actores')

const peliculaCollection = client.db('cine-db').collection('peliculas')

async function handleInsertActorRequest(req,res){
  const data = req.body
  
  await peliculaCollection.findOne({nombre: data.pelicula})
  .then ((peliculaEncontrada) => {if (peliculaEncontrada === null) { return res.status(404).send('Película no encontrada')}
  
  const actor = { ...Actor }

    actor._id = new ObjectId()
    actor.idPelicula = peliculaEncontrada._id.toString() //Guarda el _id de la película encontrada como string
    actor.nombre = data.nombre
    actor.edad = data.edad
    actor.estaRetirado = data.estaRetirado
    actor.premios = data.premios

    //inserta el actor
    return actorCollection.insertOne(actor)
    .then ((result) => {return res.status(201).send(result)
    })
    
    .catch((e) => { return res.status(500).send({error: e.code}) })
    })

    .catch((e) => { return res.status(500).send({error: e.code}) })
}

async function handleGetActoresRequest(req,res){
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({error: e.code}) })
}

async function handleGetActorByIdRequest(req,res){
    const id = req.params.id
        
        try {
            let oid = ObjectId.createFromHexString(id)
            
            await actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (data === null) {return res.status(404).send('Actor no encontrado')}
                
                return res.status(200).send(data) 
            })
            
            .catch((e) => { return res.status(500).send({ error: e.code }) })
      
        } 

        catch (e) {return res.status(400).send('Id mal formado')}
}

async function handleGetActoresByPeliculaIdRequest(req,res){
    const peliculaId = req.params.pelicula;
    
    try {
        let oid = ObjectId.createFromHexString(peliculaId);
        
        await actorCollection.find({idPelicula: peliculaId}).toArray()
        .then ((Actor) => {return res.status(200).send(data)})
        
        .catch((e) => { return res.status(500).send({error: e.code}) })
    }

    catch(e) {return res.status(400).send({error: e.code})
    }
}

export default {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest
}