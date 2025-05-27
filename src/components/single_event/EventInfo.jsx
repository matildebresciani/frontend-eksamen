"use client";

// Maja
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LuMapPin, LuClock4 } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";

const Eventinfo = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // API'et kræver id, så vi sender eventId som id
        const res = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (eventId) fetchEvent(); // sikre, at eventId eksisterer før vi kalder fetch
  }, [eventId]);

  if (!event) return <div>Loading...</div>; // viser loading indtil eventet er hentet

  const formattedDate = formatDate(event.date);

  return (
    <div className="flex flex-col">
      <h1 className="text-center mb-5 font-semibold capitalize">{event.title}</h1>
      <p className="mx-auto text-center first-letter:capitalize">{event.description}</p>

      <div className="grid grid-cols-3 py-20 gap-28 text-center max-w-[1000px] mx-auto ">
        <div className="flex flex-col items-center">
          <FiCalendar size={80} className="text-primary-red " strokeWidth={1.4} />
          <div className="font-semibold capitalize text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">{formattedDate}</div>
        </div>

        <div className="flex flex-col items-center">
          <LuMapPin size={80} className="text-primary-red " strokeWidth={1.4} />
          <div className="font-semibold text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">{event.location?.address}</div>
        </div>

        <div className="flex flex-col items-center">
          <LuClock4 size={80} className="text-primary-red " strokeWidth={1.4} />
          <div className="font-semibold text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">Kl. 10-14</div>
        </div>
      </div>
    </div>
  );
};

export default Eventinfo;
