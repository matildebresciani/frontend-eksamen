import Image from "next/image";
import RelatedArt from "@/components/art_singleview/RelatedArt";
import SingleArtTextContent from "@/components/art_singleview/SingleArtTextContent";
import { fetchEvents } from "@/api-mappe/EventsApiKald";

export default async function ArtworkPageContent({ artworkId, eventId }) {
  if (!artworkId) return <div>Ugyldige parametre</div>;

  // Hent kunstværk
  const res = await fetch(
    `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
  );
  const data = await res.json();
  const artwork = data.items?.[0];

  if (!artwork) return <div>Kunstværk blev ikke fundet</div>;

  // Hent events (bruger din API-kald funktion)
  let events = [];
  try {
    events = await fetchEvents();
  } catch (error) {
    console.error("Kunne ikke hente events:", error);
  }

  return (
    <div>
      <div className="flex flex-col items-center mx-3">
        <Image
          src={artwork.image_thumbnail || "/placeholder.jpg"}
          alt={artwork.title || "Artwork"}
          width={artwork.width || 1200}
          height={artwork.height || 900}
          className="w-full h-auto object-contain"
        />

        <SingleArtTextContent data={artwork} allEvents={events} eventId={eventId} />
      </div>

      <RelatedArt artworkId={artworkId} />
    </div>
  );
}
