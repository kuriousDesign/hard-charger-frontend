import { EventsCard } from "@/components/EventsCard";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function Home() {

  return (
    <div
      className={`${geistSans.className} ${geistMono.className}  w-screen h-screen font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-4 w-full h-full p-4">
        <EventsCard />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
