"use client";

import { useEffect, useState } from "react";
import { fetchDrivers } from "@/actions/actions";
import { Driver } from "@/actions/models";
import router from "next/router";


export const DriversCard = ()  => {

    const [drivers, setDrivers] = useState<Driver[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint
                let result = await fetchDrivers();
                //console.log('drivers', result);
                
                if(result.length === 0) {
                    //setRacersTitle('No Drivers');
                }
                else {
                    // 1. Remove any driver whos last_name begins with Transfer
                    result = result.filter((driver: Driver) => !driver.last_name?.toLowerCase().startsWith('transfer'));
                    result.sort((a, b) => {
                        const aName = a?.last_name || '';
                        const bName = b?.last_name || '';
                        return aName.localeCompare(bName);
                    });
                }
                setDrivers(result);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                //console.log('drivers', result);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, []);



    if (loading) return <div>Loading...</div>;
    if (!drivers) return <div>Drivers not found</div>;

    function getDriverFullName(driver: Driver): string {
        return driver? `${driver.first_name} ${driver.last_name} ${driver.suffix}` : '';
    }


    const DriversDiv = () => {   
        return (
             <div className="grid grid-cols-1 gap-2 space-x-2 w-fit">
                {drivers.map((driver:Driver) => (
                    <button 
                        key={driver._id} 
                        className="p-2 hover:bg-gray-50 rounded shadow-sm bg-gray-100 w-fit px-4"
                        onClick={() => router.push(`driver/${driver._id}}`)}
                    >
                        <div className='flex flex-row gap-2 justify-start'>
                            <p className="font-bold">{getDriverFullName(driver)}</p>
                            <p className="font-bold text-gray-400">{drivers? driver.car_number : ''}</p>
                        </div>
                    </button>
                ))}
            </div>
        );
    };  

    return (
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md gap-4">
            <h2 className="text-xl font-bold mb-4">Drivers</h2>
            {DriversDiv()}
            <button 
                onClick={() => router.push(`drivers/create_driver`)}
                className="bg-blue-600 text-white p-4 rounded-full w-fit min-w-[150px] hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
                Add Driver
            </button> 

        </div>
    );
};