import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
    id:String,
    name: String,
    age: Number,
    email: String,
},
{ collection: 'Clients' }
)

const ClientModel = mongoose.model('Client', ClientSchema);

export { ClientModel }