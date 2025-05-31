//Matilde
//Prompt: Kan du flytte nogle af mine funktioner ind i en logic fil for at gøre min kode lidt mere overskuelig og ryddelig?

import { useState, useEffect } from "react";
import {
  fetchDates,
  fetchLocations,
  fetchEvents,
  createEvent,
} from "@/api-mappe/EventsApiKald";

export const useEventFormLogic = () => {
  //Sætter dato, lokation og events som states
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);

  //Fetcher information fra databasen via api kald filen til at kunne bruge i forms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDates, fetchedLocations, fetchedEvents] =
          await Promise.all([fetchDates(), fetchLocations(), fetchEvents()]);
        //Sætter den fetchede info fra databasen ind i vores states
        setDates(fetchedDates);
        setLocations(fetchedLocations);
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Fejl ved hentning af data:", err);
      }
    };

    fetchData();
  }, []);

  // Checker om en lokation er optaget på en bestemt dato
  const isLocationOccupied = (locationId, date) => {
    return events.some(
      (event) => event.locationId === locationId && event.date === date
    );
  };

  // Checker om en dato er optaget for en bestemt lokation
  const isDateOccupied = (date, locationId) => {
    return events.some(
      (event) => event.date === date && event.locationId === locationId
    );
  };

  // Funktion til at oprette et nyt event i databasen
  const createNewEvent = async (data) => {
    try {
      const result = await createEvent(data); // createEvent er et POST request fra API kald filen
      return result;
    } catch (error) {
      console.error("Fejl ved oprettelse:", error);
      throw error;
    }
  };

  return {
    dates,
    locations,
    isLocationOccupied,
    isDateOccupied,
    createNewEvent,
  };
};
