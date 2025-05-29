'use client';

//import { useRouter } from 'next/navigation';
import { Race } from '@/actions/models';
import CreateRaceForm from './CreateRaceForm';
import { postRace } from '@/actions/actions';
import router from 'next/router';

export default function CreatRacePage() {
  const { event_id } = router.query;


  const handleCreate = async (race: Race) => {
    // modify game prop event_id to match the eventId prop
    race.event_id = event_id as string; // ✅ Set the event_id to the eventId prop
    await postRace(race);
    router.push(`/event/${event_id}`); // ✅ Redirect to homepage
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Race</h1>
      <CreateRaceForm onSubmit={handleCreate} />
    </div>
  );
}