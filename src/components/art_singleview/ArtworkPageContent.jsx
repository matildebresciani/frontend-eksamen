//server component
import ArtworkPageContentClient from "./ArtworkPageContentClient";
import { fetchEvents } from "@/api-mappe/EventsApiKald";

export default async function ArtworkPageContent({ artworkId, eventId }) {
  if (!artworkId) return <div>Ugyldige parametre</div>;

  const res = await fetch(
    `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
  );
  const data = await res.json();
  const artwork = data.items?.[0];

  if (!artwork) return <div>Kunstværk blev ikke fundet</div>;

  let events = [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error("Kunne ikke hente events:", error);
  }

  return (
    <ArtworkPageContentClient
      artwork={artwork}
      eventId={eventId}
      events={events}
    />
  );
}