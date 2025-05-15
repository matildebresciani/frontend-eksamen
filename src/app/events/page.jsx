//Matilde

"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import SelectCity from "@/components/events/SelectCity";
import useCityStore from "../store/cityStore";

export default function Page() {
  const [events, setEvents] = useState([]);
  const { selectedCities, normalizeCity } = useCityStore();

  useEffect(() => {
    fetch("https://server-gititgirls.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const filteredEvents =
    selectedCities.includes("Alle Byer") || selectedCities.length === 0
      ? events
      : events.filter((event) =>
          selectedCities.includes(normalizeCity(event.location.address))
        );

  return (
    <section>
      <h1>Events</h1>
      <p>
        Her finder du en oversigt over spændende kunstevents i hele Danmark.
        Glæd dig til alt fra Monets klassiske mesterværker til nyskabende
        moderne kunst og installationer. Udstillingerne spænder bredt – fra
        intime gallerier til store museer. Der er noget for enhver smag, uanset
        om du er kunstelsker eller nysgerrig nybegynder. Vi glæder os til at se
        dig!
      </p>
      <div className="border-2 border-black w-full my-4"></div>
      <div className="grid sm:grid-cols-[1fr_2fr] gap-4">
        <SelectCity />
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
