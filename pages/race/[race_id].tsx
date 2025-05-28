import { fetchEvent, fetchRace } from '@/actions/actions';
import { RaceEvent } from '@/actions/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function RacePage() {
    const router = useRouter();
    const { race_id } = router.query;
    //console.log("Race ID:", race_id);
    const [data, setData] = useState<Race | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (race_id) {
            fetchRaceData();
        }
    }, [race_id]);

    const fetchRaceData = async () => {
        try {
            // Replace with your actual API endpoint
            const result = await fetchRace(race_id as string);
            setData(result);
        } catch (error) {
            console.error('Error fetching event:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!event) return <div>Event not found</div>;

    return (
        <div className='bg-white shadow-md rounded-lg p-6'>
            <h1>{data.name}</h1>
            <h2>ID: {data._id}</h2>
        </div>
    );
}