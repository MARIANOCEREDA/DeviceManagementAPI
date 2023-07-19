import mongoose, { Schema, Document } from 'mongoose'

const ClientSchema = new Schema({
    id:{ type: String, required:true },
    name: { type: String, required:true },
    age: { type: String, required:true },
    email: { type: String, required:true },
},
{ collection: 'Clients' }
)

export const ClientModel = mongoose.model('Client', ClientSchema);