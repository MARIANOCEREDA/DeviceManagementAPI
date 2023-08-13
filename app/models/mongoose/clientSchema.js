import mongoose, { Schema } from 'mongoose'

const ClientSchema = new Schema(
{
    id:{ type: String, required:true },
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    age: { type: String, required:true },
    email: { type: String, required:true },
},

{ collection: 'Clients' }

)

export const ClientModel = mongoose.model('Client', ClientSchema);