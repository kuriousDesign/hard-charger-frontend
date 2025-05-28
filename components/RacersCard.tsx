"use client";

import { useEffect, useState } from "react";
import { fetchRace} from "@/actions/actions";
import { Race, Racer } from "@/actions/models";
import router from "next/router";


export const RacersCard = ({ raceId }: { raceId: string })  => {
    const [data, setData] = useState<Race | null>(null);
    const [loading, setLoading] = useState(true);
    const [racersTitle, setRacersTitle] = useState( 'Starting Lineup');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint
                const result = await fetchRace(raceId as string) as Race;
                console.log("status:", result.status);
                if(result.status === 'finished' || result.status === 'in_progress') {
                    result.racers.sort((a, b) => a.current_position - b.current_position);
                    setRacersTitle('Current Standings');
                    if(result.status === 'finished') {
                        setRacersTitle('Final Results');
                    }
                }
                else {
                    result.racers.sort((a, b) => a.starting_position - b.starting_position);
                }

                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };
        if (raceId) {
            fetchData();
        }
    }, [raceId]);





    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Race not found</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-1/3">
            <h2 className="text-xl font-bold mb-4">{racersTitle}</h2>
            <div className="grid grid-cols-2 gap-2 space-x-2 w-fit">
                {data?.racers.map((racer:Racer) => (
                    <button 
                        key={racer.driver_fullname} 
                        className="p-2 hover:bg-gray-50 rounded shadow-sm bg-gray-100 w-fit px-4"
                        onClick={() => router.push(`/racer/${racer.driver_fullname}`)}
                    >
                        <p className="font-bold">{racer.driver_fullname}</p>
                        <p className="font-bold text-gray-400">{racer.car_number}</p>
                        {data.status.startsWith('lineup') && (
                            <p className="font-medium">Starting Position: {racer.starting_position}</p>
                        )}
                        
                        {data.status === 'finished' && (
                            <>
                                <p className="font-medium">{racer.current_position} Place</p>
                                <p className="font-medium">Cars Passed: {racer.starting_position - racer.current_position}</p>
                            </>
                        )}
                        {data.status === 'in_progress' && (
                            <p className="font-medium">Current Position: {racer.current_position}</p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};