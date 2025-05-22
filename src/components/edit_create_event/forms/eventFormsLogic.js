//Matilde

import { useState, useEffect } from "react";
import {
  fetchDates,
  fetchLocations,
  fetchEvents,
  createEvent,
} from "@/api-mappe/EventsApiKald";

export const useEventFormLogic = () => {
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDates, fetchedLocations, fetchedEvents] =
          await Promise.all([fetchDates(), fetchLocations(), fetchEvents()]);
        setDates(fetchedDates);
        setLocations(fetchedLocations);
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Fejl ved hentning af data:", err);
      }
    };

    fetchData();
  }, []);

  const isLocationOccupied = (locationId, date) => {
    return events.some(
      (event) => event.locationId === locationId && event.date === date
    );
  };

  const isDateOccupied = (date, locationId) => {
    return events.some(
      (event) => event.date === date && event.locationId === locationId
    );
  };

  const createNewEvent = async (data) => {
    try {
      const result = await createEvent(data);
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
