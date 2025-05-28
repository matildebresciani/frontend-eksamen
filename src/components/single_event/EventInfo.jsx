"use client";

// Maja
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LuMapPin, LuClock4 } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { formatDate } from "@/utils/formatDate";
import { SignedIn } from "@clerk/nextjs";
import EditIcon from "../edit_create_event/EditIcon";

const Eventinfo = ({ event, onEdit }) => {
  // const { eventId } = useParams();
  // const [event, setEvent] = useState(null);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     try {
  //       // API'et kræver id, så vi sender eventId som id
  //       const res = await fetch(
  //         `https://server-gititgirls.onrender.com/events/${eventId}`
  //       );
  //       if (!res.ok) throw new Error("Event not found");
  //       const data = await res.json();
  //       setEvent(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   if (eventId) fetchEvent(); // sikre, at eventId eksisterer før vi kalder fetch
  // }, [eventId]);

  // if (!event) return <div>Loading...</div>; // viser loading indtil eventet er hentet

  // const handleEdit = (updatedEvent) => {
  //   console.log("Updated event modtaget fra API:", updatedEvent);
  //   setEvent(updatedEvent);
  // };

  const formattedDate = formatDate(event.date);

  return (
    <div className="flex flex-col">
      <SignedIn>
        <div className="flex justify-center my-4">
          <EditIcon event={event} onEdit={onEdit}>
            <div className="text-sm md:text-lg ">REDIGER EVENT</div>
          </EditIcon>
        </div>
      </SignedIn>
      <h1 className="text-center mb-5 first-letter:capitalize">
        {event.title}
      </h1>
      <p className="mx-auto text-center first-letter:capitalize">
        {event.description}
      </p>

      <div className="grid grid-cols-3 py-10 gap-5 sm:py-14 sm:gap-18 md:py-18 md:gap-23 lg:py-20 lg:gap-28 text-center max-w-[1000px] mx-auto">
        <div className="flex flex-col items-center">
          <FiCalendar
            size={50}
            className="text-primary-red sm:w-17 md:w-20 lg:w-23 h-auto"
            strokeWidth={1.2}
          />
          <div className="font-semibold capitalize text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">
            {formattedDate}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <LuMapPin
            size={50}
            className="text-primary-red sm:w-17 md:w-20 lg:w-23 h-auto"
            strokeWidth={1.2}
          />
          <div className="font-semibold text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">
            {event.location?.address}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <LuClock4
            size={50}
            className="text-primary-red sm:w-17 md:w-20 lg:w-23 h-auto"
            strokeWidth={1.2}
          />
          <div className="font-semibold text-[var(--color-text-light)] mt-5 text-sm sm:text-m md:text-lg lg:text-xl">
            Kl. 10-14
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventinfo;
