// file untuk hubunign express ke mongo db
const MongoClient = require('mongodb').MongoClient

let database = null

async function connect() {
  try {
    const uri = 'mongodb://localhost:27017'

    const client = new MongoClient(uri, { useUnifiedTopology: true })

    await client.connect()

    
    const db = client.db('EntertainMe-Server')

    database =  db
    
    return db

  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  connect,
  getDatabase() {
    return database
  }
}