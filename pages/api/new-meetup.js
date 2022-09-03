import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://admin-user:qd0YB8OtdFehcKaA@cluster0.9nm7qt6.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupCollection = db.collection('meetup-collection');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Successfully inserted' });
  }
}

export default handler;
