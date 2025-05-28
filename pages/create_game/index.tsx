'use client';

import { useRouter } from 'next/navigation';
import { Game } from '@/actions/models';
import { CreateGameForm } from './components/CreateGameForm';
import { postGame } from '@/actions/actions';

export default function CreateGamePage({eventId}: { eventId: string }) {
  const router = useRouter();

  const handleCreate = async (game: Game) => {
    // modify game prop event_id to match the eventId prop
    game.event_id = eventId; // ✅ Set the event_id to the eventId prop
    await postGame(game);
    router.push(`/raceEvent/${eventId}`); // ✅ Redirect to homepage
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Game</h1>
      <CreateGameForm onSubmit={handleCreate} />
    </div>
  );
}