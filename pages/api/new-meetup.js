import { MongoClient } from 'mongodb';
import { databaseConnectionString } from '../../lib/constants';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = req.body;

    try {
      client = await MongoClient.connect(databaseConnectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    const meetupCollection = db.collection('meetup-collection');
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Successfully inserted' });
  }
}

export default handler;
