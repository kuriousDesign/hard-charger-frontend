import { fetchRace } from '@/actions/actions';
import { Race } from '@/actions/models';
import { RacersCard } from '@/components/RacersCard';
//import router from 'next/router';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RacePage() {
    const router = useRouter();
    const { event_id, race_id } = router.query;
    //console.log("Race ID:", race_id);
    const [data, setData] = useState<Race | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint
                const result = await fetchRace(race_id as string) as Race;
                setData(result);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (race_id) {
            fetchData();
        }
    }, [race_id]);




    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Event not found</div>;

    return (
        <div className='flex flex-col gap-4 min-h-screen p-4'>
            <div className='bg-white shadow-md rounded-lg p-4'>
                <h1 className='text-xl font-bold text-gray-300'>Race</h1>
                <h1 className='text-3xl font-bold'>{data?.letter} {data?.type}</h1>
                <h2>Laps: {data?.laps}</h2>
                <h2>Cars: {data?.num_cars}</h2>
            </div>
                <RacersCard raceId={race_id as string} eventId={event_id as string} />

            <button
                onClick={() => router.push(`/event/${event_id}`)}
                className="mt-4 bg-gray-50 text-gray-700 p-4 rounded-full w-fit min-w-[150px] hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
                Back to Event
            </button>
        </div>
    );
}