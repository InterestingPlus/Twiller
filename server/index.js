const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const job = require("./cron");

const uri =
  "mongodb+srv://jatin:nullclass@twiller.xooswpu.mongodb.net/?retryWrites=true&w=majority&appName=Twiller";
const port = 5000;

const app = express();

job.start();

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const postCollection = client.db("databse").collection("posts");
    const userCollection = client.db("databse").collection("users");

    app.post("/register", async (req, res) => {
      const user = req.body;
      console.log(user);

      const alreadyUser = await userCollection.findOne({
        email: user.email,
      });
      if (alreadyUser) {
        console.log("User Already Exists");
        return res.send("User Already Exists");
      }
      const result = await userCollection.insertOne(user);

      console.log("REgister : ", result);
      res.send(result);
    });

    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;

      const user = await userCollection.findOne({ email: email });
      res.send(user);
    });

    app.post("/post", async (req, res) => {
      const post = req.body;

      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    app.get("/post", async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();

      res.send(post);
    });

    app.get("/userpost", async (req, res) => {
      const email = req.query.email;

      const post = (
        await postCollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;

      const options = { upsert: true };
      const updateDoc = {
        $set: profile,
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);

      res.send(result);
    });

    app.patch("/likeupdate/:_id", async (req, res) => {
      const { _id } = req.params;
      const profile = req.body;

      const options = { upsert: true };
      const updateDoc = {
        $set: profile,
      };

      const result = await postCollection.updateOne(
        { _id: new ObjectId(_id) },
        updateDoc,
        options
      );

      res.send(result);
    });

    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Database Error: ", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller Server is Working!");
});

app.listen(port, () => {
  console.log(`Server is Running on PORT ${port}`);
});
