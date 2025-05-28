import { fetchEvent, fetchGamesByEvent, fetchRacesByEvent } from '@/actions/actions';
import { Game, Race, RaceEvent } from '@/actions/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GamesCard } from "@/components/GamesCard";

export default function EditEvent() {
    const router = useRouter();
    const { event_id } = router.query;
    console.log("Event ID:", event_id);
    const [event, setEvent] = useState<RaceEvent | null>(null);
    const [races, setRaces] = useState<Race[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (event_id) {
            fetchEventData();
        }
    }, [event_id]);

    const fetchEventData = async () => {
        try {
            // Replace with your actual API endpoint
            const data = await fetchEvent(event_id as string);
            setEvent(data);
            const result = await fetchRacesByEvent(event_id as string);
            setRaces(result);
            console.log("event Idddddd:", event_id);
            const gameData = await fetchGamesByEvent(event_id as string);
            setGames(gameData);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!event) return <div>Event not found</div>;

    return (
        <div>
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h1>{event.name}</h1>
                <h2>ID: {event._id}</h2>
                {/* Add your event editing form here */}
            </div>
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h1>Races</h1>
                {races.map((race) => (
                    <div key={race._id} className="border-b p-4">
                        <h3 className="text-lg font-semibold">{race.letter} {race.type}</h3>
                        <p className="text-gray-600">Laps: {race.laps}</p>
                        <p className="text-gray-600">Cars: {race.num_cars}</p>
                    </div>
                ))}
            </div>
            <GamesCard eventId={event_id as string} />
         
        </div>
    );
}