// //Maja
//prompt: "Hvordan styler man en importeret barcode i react?"
//svar: <div style={{ transform: "rotate(90deg)", width: "150px" }}>
//   <Barcode
//     value="2740284000576   KLMH"
//     lineColor="#000000"    // stregfarve
//     width={1.5}            // bredde på stregene
//     height={80}            // højde på stregkoden
//     background="#f3f4f6"   // baggrundsfarve
//     displayValue={false}   // skjul tekst under stregkoden
//   />
// </div>

import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { fetchEventById } from "../../api-mappe/EventsApiKald";

const Ticket = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventById(eventId)
      .then(setEvent)
      .catch(() => setEvent(null));
  }, [eventId]);
  console.log(eventId);

  return (
    <div className="w-[1000px] h-[280px] mx-auto mt-10 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-sm bg-white grid grid-cols-[280px_1fr_1fr] overflow-visible">
      {/* Billede del */}
      <div className="bg-primary-red aspect-square h-full w-full overflow-hidden rounded-sm">
        {/* Erstat nedenstående div med et billede når du har det */}
        <div className="w-full h-full" />
        {/* Eksempel med billede:
        <img src="BILLEDE_URL" alt="Event billede" className="object-cover w-full h-full" />
        */}
      </div>
      {/* Information del */}
      <div className="flex flex-col justify-center px-4 py-2">
        {event ? (
          <>
            <h2 className="text-lg font-bold mb-1">{event.title}</h2>
            <p className="text-sm text-gray-700 mb-1">{event.location?.address}</p>
            <p className="text-xs text-gray-500">{event.date}</p>
            <p className="text-xs text-gray-500">{event.time}</p>
          </>
        ) : (
          <p className="text-gray-400 text-sm">Indlæser event...</p>
        )}
      </div>
      {/* Barcode del */}
      <div className="flex items-start justify-end pr-6">
        <div style={{ transform: "rotate(90deg)", width: "100px" }}>
          <Barcode value="2740284000576   KLMH" lineColor="#6b7280" width={1.2} height={60} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
