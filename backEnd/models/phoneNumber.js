const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //console.log(returnedObject.id);
    }
})

module.exports = mongoose.model('Phone', phoneSchema)



















