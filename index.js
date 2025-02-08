const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://db-user:admin123@cluster0.zes60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
      const menuCollection = client.db("restaurant").collection("menu");
      const reviewCollection = client.db("restaurant").collection("review");
      const orderCollection = client.db("restaurant").collection("orders");

      // menu collection
      
      app.get('/menu', async(req, res)=>{
        const menuData = await menuCollection.find().toArray()
        res.send(menuData);
      })


      // review collection

      app.get('/review', async(req, res)=>{
        const result = await reviewCollection.find().toArray()
        res.send(result);
      })

      // order collection
      app.post('/order', async(req, res)=>{
        const result = await orderCollection.insertOne().toArray()
        res.send(result);
      })

    

      
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to restaurant server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// nameing convention
app.get('/user')
app.get('/user/:id')
app.post('/user')
app.post('/user/:id')
app.put('/user/:id')
app.delete('user/:id')