//Matilde
//Katinka - dropdown til mobile

"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/events/EventCard";
import SelectCity from "@/components/events/SelectCity";
import normalizeCity from "@/utils/normalizeCity";
import { fetchEvents } from "../../api-mappe/EventsApiKald";
import { IoIosArrowDown } from "react-icons/io";

export default function Page() {
  const [events, setEvents] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents(); // importerer events fra api mappe
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, []);

  const handleDeleted = (deletedEventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  const handleEdit = (updatedEvent) => {
    console.log("Updated event modtaget fra API:", updatedEvent);
    setEvents((prevEvents) =>
      prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  const filteredEvents =
    selectedCities.includes("Alle Byer") || selectedCities.length === 0
      ? events
      : events.filter((event) =>
          selectedCities.includes(normalizeCity(event.location.address))
        );

  return (
    <section>
      <h1 className="mb-2 sm:mb-3">Events</h1>
      <p>
        Her finder du en oversigt over spændende kunstevents i hele Danmark.
        Glæd dig til alt fra Monets klassiske mesterværker til nyskabende
        moderne kunst og installationer. Udstillingerne spænder bredt – fra
        intime gallerier til store museer. Der er noget for enhver smag, uanset
        om du er kunstelsker eller nysgerrig nybegynder. Vi glæder os til at se
        dig!
      </p>
      <div>
        <div className="border-2 border-black w-full my-6 sm:my-10  sm:self-start sm:sticky sm:top-37 md:top-41 lg:top-45"></div>

        <div className="grid sm:grid-cols-[1fr_2fr] gap-4">
          {/* Mobilversion med dropdown */}
          <div className="block md:hidden">
            <details className="w-full">
              <summary className="text-primary-red flex justify-between items-center px-4 py-2 border-2 border-primary-red rounded cursor-pointer bg-white">
                <span>Vælg By</span>
                <IoIosArrowDown />
              </summary>
              <div className="px-4 pb-2">
                <SelectCity
                  selectedCities={selectedCities}
                  setSelectedCities={setSelectedCities}
                />
              </div>
            </details>
          </div>
          {/* Desktop version med sidefiltrering */}
          <div className="hidden md:block">
            <SelectCity
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
            />
          </div>

          <div className="flex flex-col gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDeleted={() => handleDeleted(event.id)}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
