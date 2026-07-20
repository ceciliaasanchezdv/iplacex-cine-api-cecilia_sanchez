import { BSONType, ObjectId } from 'mongodb'

export const Pelicula = {
    _id: ObjectId,
    nombre: BSONType.string,
    generos: Array,
    anioEstreno: BSONType.int
}