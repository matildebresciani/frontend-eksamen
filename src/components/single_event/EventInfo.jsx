"use client";

// Maja
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LuMapPin, LuClock4 } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";

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

  return (
    <div>
      <h1 className="font-bold text-center text-2xl">{event.title}</h1>
      <p className="text-center max-w-xl mx-auto">{event.description}</p>

      <div className="flex flex-row justify-evenly mt-6">
        <div className="flex flex-col items-center">
          <FiCalendar size={90} className="text-primary-red" />
          <div className="font-semibold text-gray-500">{event.date}</div>
        </div>

        <div className="flex flex-col items-center">
          <LuMapPin size={90} className="text-primary-red" />
          <div className="font-semibold text-gray-500">{event.location?.address}</div>
        </div>

        <div className="flex flex-col items-center">
          <LuClock4 size={90} className="text-primary-red" />
          <div className="font-semibold text-gray-500">17:00-20:00</div>
          {/*hardcoded tid siden API ikke har*/}
        </div>
      </div>
    </div>
  );
};

export default Eventinfo;
