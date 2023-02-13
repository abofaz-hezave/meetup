import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function Home() {
  const router = useRouter();

  async function addMeetup(enteredMeetup) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    router.push('/');
  }
  return (
    <>
      <Head>
        <title>Create New Meetups</title>
        <meta
          name='description'
          content='Create new meetups and make great networking opportunities'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </>
  );
}
