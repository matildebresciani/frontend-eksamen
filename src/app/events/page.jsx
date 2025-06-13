//Matilde
//Katinka - dropdown til mobile

"use client";

import { useEffect, useState, useRef } from "react";
import EventCard from "@/components/events/EventCard";
import SelectCity from "@/components/events/SelectCity";
import normalizeCity from "@/utils/normalizeCity";
import { fetchEvents } from "../../api-mappe/EventsApiKald";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

export default function Page() {
  const [events, setEvents] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(true); //Giver en loading besked, hvis event loades

  //NYT - PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // eller 5, som du vil

  useEffect(() => {
    const getEvents = async () => {
      try {
        //Gammel - sætter events ind i den rækkefølge de er oprettet
        // const data = await fetchEvents();
        // setEvents(data);

        //Prompt: hvordan kan jeg sortere mine events så det er efter dato??

        //Ny - Sorterer events efter dato
        const data = await fetchEvents(); //Henter events fra API (fra vores API kald fil)
        const sortedEvents = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)  //Konverterer dato-strengene til Date-objekter, så JS bedre kan sammenligne og sortere
        );
        //Opdaterer state med den sorterede event data
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        //Sætter loading besked på siden til false, da events nu er blevet hentet
        setLoading(false);
      }
    };

    // Kalder funktionen for at hente events når siden bliver vist første gang
    getEvents();
  }, []);

  //Sletter et event
  // Opdaterer events state ved at filtrere det slettede event fra listen
  // Funktionen sendes som prop til EventCard og videre til Delete btn
  const handleDeleted = (deletedEventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  //Opdaterer card efter redigering
  // Går eventlisten igennem, hvis id matcher det opdaterede, erstattes det
  const handleEdit = (updatedEvent) => {
    setEvents((prevEvents) => 
      prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  // Hvis "Alle Byer" er valgt eller ingen byer er valgt, vis alle events
  // Ellers filtrer events så kun de, hvor eventets by er i selectedCities, vises
  // normalizeCity bruges til at sikre at varianter som "kbh" og "københavn" samles under samme navn
  const filteredEvents =
    selectedCities.includes("Alle Byer") || selectedCities.length === 0
      ? events
      : events.filter((event) =>
          selectedCities.includes(normalizeCity(event.location.address))
        );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Luk dropdown når man klikker udenfor
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //NYT - PAGINATION
  //Udregner hvor mange sider vi skal have ved at tage total events (efter filtrering) og dividerer med det antal der må være på hver side
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  //De events der vises på den aktuelle side
  //slice tager en del af arrayet (for at finde ud af hvilke events der skal vises på siden man er på)
  //vi minusser med 1 fordi currentPage starter ved 1, men arrays starter med index 0
  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, //startindex
    currentPage * ITEMS_PER_PAGE //slutindex
  );


  return (
    <section>
      <h1 className="mb-2 sm:mb-3">Events</h1>
      <p>
        Oplev spændende kunstevents med fokus på modernismen – over hele
        Danmark. Vi glæder os til at byde dig velkommen!
      </p>
      <div>
        <div className="border-2 border-black w-full my-6 sm:my-10 z-50 self-start sticky sm:top-37 md:top-41 lg:top-45"></div>

        <div className="grid sm:grid-cols-[1fr_2fr] gap-4">
          {/* Mobilversion, dropdown filtrering */}
          <div
            ref={dropdownRef}
            className="block md:hidden self-start sticky top-26 bg-white pt-2 z-50"
          >
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="text-white bg-black flex justify-between items-center px-4 py-2 border-2 border-black rounded cursor-pointe"
            >
              <span>Vælg By</span>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isDropdownOpen && (
              <div className="px-4 pb-2">
                <SelectCity
                  selectedCities={selectedCities}
                  setSelectedCities={setSelectedCities}
                />
              </div>
            )}
          </div>

          {/* Desktop version, dropdown filtrering */}
          <div className="hidden md:block md:self-start md:sticky md:top-45 lg:top-55">
            <SelectCity
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
            />
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="mt-2 italic">Indlæser events...</p>
            ) : filteredEvents.length === 0 ? (
              <p className="mt-2 italic">
                Ingen events fundet på den valgte lokation...
              </p>
            ) : (
              displayedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDeleted={() => handleDeleted(event.id)}
                  onEdit={handleEdit}
                />
              ))
            )}

            <div className="flex justify-center mt-3 gap-3">
            {/* Laver nyt array ud fra længden af totalPages */}
            {/* _ = element, men tom fordi vi ikke bruger den */}
            {/* i = index (positionen(nummeret) af elementet i array'et) */}
            {/* vi plusser i med 1, for at sidetal ikke starter på 0 */}
            {Array.from({ length: totalPages }).map((_, i) => ( 
              <motion.button
                key={i}
                onClick={() => setCurrentPage(i + 1)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className={`px-2 py-1 mb-5 border rounded ${
                  currentPage === i + 1
                    ? "bg-primary-red text-white border-primary-red"
                    : "border-primary-red text-primary-red hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
          </div>


        </div>
      </div>
    </section>
  );
}