"use client";

import { getDrivers } from "@/actions/actions";
import { EventsCard } from "@/components/EventsCard";
import runConnectionTest from "@/lib/test_connection";
import { Geist, Geist_Mono } from "next/font/google";
import router from "next/router";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function Home() {

  async function submitDriver() {
    console.log('Submitting driver...');
    const res = await fetch('/api/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        suffix: 'Jr.',
        car_number: '42L',
      }),
    });

    console.log('Response status:', res.body);

    // const data = await res.json();

    // if (res.ok) {
    //   console.log('Driver saved:', data);
    // } else {
    //   console.error('Error:', data.error);
    // }
  }

  //submitDriver();
  //runConnectionTest().catch(console.error);
  useEffect(() => {
    const fetchDrivers = async () => {
      const drivers = await getDrivers();
      console.log('Drivers:', drivers);
    };
    
    fetchDrivers().catch(console.error);
  }, []);


  return (
    <div
      className={`${geistSans.className} ${geistMono.className}  w-screen h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-4 w-full h-full p-4">
        <EventsCard />
        <button
            onClick={() => router.push(`/drivers`)}
            className="mt-4 bg-gray-50 text-gray-700 p-4 rounded-full w-fit min-w-[150px] hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
        >
          View Drivers
        </button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
