//maja

//GET: til at hente datoer
async function fetchDates() {
  try {
    const response = await fetch("https://server-gititgirls.onrender.com/dates");
    if (!response.ok) {
      throw new Error("Failed to fetch dates");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dates:", error);
    throw error;
  }
}

async function fetchLocations() {
  try {
    const response = await fetch("https://server-gititgirls.onrender.com/locations");
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
}


//GET: til hente flere events
async function fetchEvents() {
  try {
    const response = await fetch("https://server-gititgirls.onrender.com/events");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
//GET:  hente ET event (id)
async function fetchEventById(eventId) {
  try {
    const response = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
}

//POST: til at oprette et event
async function createEvent(eventData) {
  try {
    const response = await fetch("https://server-gititgirls.onrender.com/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

//PATCH: redigere et event
async function EditEvent(eventId, eventData) {
  try {
    const response = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error("Failed to update event");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

//DELETE: til at slette et event
async function deleteEvent(eventId) {
  try {
    const response = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
    return true; // Return true if deletion was successful
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

//PUT: book billetter til et event
async function bookTickets(eventId, ticketData) {
  try {
    const response = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}/book`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) {
      throw new Error("Failed to book tickets");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error booking tickets:", error);
    throw error;
  }
}

//POST: nulstil events til testdata
async function resetEvents() {
  try {
    const response = await fetch("https://server-gititgirls.onrender.com/events/reset", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to reset events");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting events:", error);
    throw error;
  }
}

export { fetchDates, fetchLocations, fetchEvents, fetchEventById, createEvent, EditEvent, deleteEvent, bookTickets, resetEvents };
