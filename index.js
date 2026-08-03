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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//---------------- tutor api endpoints ----------------
      
      // create a tutor
      app.post("/tutors", async (req, res) => {
         const tutor = req.body;
         const result = await tutorCollection.insertOne(tutor);
         console.log(result);

         res.status(201).json(result);
      });
      // get all tutors
      app.get("tutors", async (req, res) => {
         const tutors = await tutorCollection.find().toArray();
         console.log(tutors);

         res.status(200).json(tutors);
      });

      //get a tutor by id
      app.get("tutors/:id", async (req, res) => {
         const { id } = req.params;
         const tutor = await tutorCollection.findOne({ _id: new ObjectId(id)});
         console.log(tutor);
         
         res.status(200).json(tutor);
      })

      catch (error) {
      console.error("Database connection failed:", error);