import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { databaseConnectionString } from '../lib/constants';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Dev Meetups</title>
        <meta name='description' content='Browse through golbal dev meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const client = await MongoClient.connect(databaseConnectionString);

  const db = client.db();

  const meetupCollection = db.collection('meetup-collection');
  const meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetupItem) => ({
        id: meetupItem._id.toString(),
        title: meetupItem.title,
        image: meetupItem.image,
        address: meetupItem.address,
      })),
    },
  };
}

export default HomePage;
