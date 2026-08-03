const express = require('express')
const dontenv = require('dotenv')
const cors = require('cors');
const app = express()
const port = process.env.PORT


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dontenv.config()
const uri = process.env.MONGODB_URI;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
    const db = client.db('mediqueue');
      app.get('/', (req, res) => {
      res.send('Hello World!')
})
  } 
   catch (error) {
      console.error("Database connection failed:", error);
   }
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}
