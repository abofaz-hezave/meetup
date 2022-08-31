import MeetupList from '../components/meetups/MeetupList';

function HomePage() {
  const DUMMY_MEETUPS = [
    {
      id: 'm1',
      title: 'Austia Meetup',
      image:
        'https://th-thumbnailer.cdn-si-edu.com/Ejt5akJFA2JjER12jJwUx-kiJ1U=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/03/25/03251376-be81-470c-ac01-a15130b3e9b0/kunst889.jpg',
      address: 'Austia, Vienna',
      description: 'description',
    },
  ];
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
