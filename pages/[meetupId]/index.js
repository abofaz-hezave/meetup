import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { databaseConnectionString } from '../../lib/constants';

function MeetupDetails({ selectedMeetup }) {
  return <MeetupDetail {...selectedMeetup} />;
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(databaseConnectionString);

  const db = client.db();

  const meetupCollection = db.collection('meetup-collection');
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetupItem) => ({
      params: { meetupId: meetupItem._id.toString() },
    })),
  };
}

export async function getStaticProps(ctx) {
  const meetupId = ctx.params.meetupId;
  const client = await MongoClient.connect(databaseConnectionString);

  const db = client.db();

  const meetupCollection = db.collection('meetup-collection');
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      selectedMeetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
      },
    },
  };
}

export default MeetupDetails;
