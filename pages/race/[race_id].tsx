import { fetchRace } from '@/actions/actions';
import { Race, Racer } from '@/actions/models';
import { RacersCard } from '@/components/RacersCard';
//import router from 'next/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RawCreateParams } from 'zod';


export default function RacePage() {
    const router = useRouter();
    const { race_id } = router.query;
    //console.log("Race ID:", race_id);
    const [data, setData] = useState<Race | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (race_id) {
            fetchData();
        }
    }, [race_id]);


    const fetchData = async () => {
        try {
            // Replace with your actual API endpoint
            const result = await fetchRace(race_id as string) as Race;
            if(result.status === 'finished' || result.status === 'in_progress') {
                result.racers.sort((a, b) => a.current_position - b.current_position);
            }
            else {
                result.racers.sort((a, b) => a.starting_position - b.starting_position);
            }

            setData(result);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Event not found</div>;

    return (
        <div className='bg-white shadow-md rounded-lg p-6'>
            <h1>{data?.letter} {data?.type}</h1>
            <h2>Laps: {data?.laps}</h2>
            <h2>Cars: {data?.num_cars}</h2>
            <RacersCard raceId={data?._id} />

            <button
                onClick={() => router.push(`/event/${data?.event_id}`)}
                className="mt-4 bg-blue-600 text-white p-4 rounded-full"
            >
                Back to Event
            </button>
        </div>
    );
}