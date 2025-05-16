import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchEventById } from "../../../api-mappe/EventsApiKald";
import { fetchArtworkById } from "../../../api-mappe/SmkApiKald";

const TestArtCart = () => {
  const [artworks, setArtworks] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const eventData = await fetchEventById(eventId); // Fetch event data
        const fetchedArtworks = [];
        console.log(eventData.artworkIds); // Debugging

        for (const artworkId of eventData.artworkIds) {
          try {
            const artworkData = await fetchArtworkById(artworkId); // Fetch artwork data
            console.log(artworkData);

            if (artworkData.items && artworkData.items.length > 0) {
              fetchedArtworks.push(...artworkData.items); // Add items to fetchedArtworks
            } else {
              console.warn(`No items found for artwork ID ${artworkId}`);
            }
          } catch (error) {
            console.error(`Error fetching artwork with ID ${artworkId}:`, error);
          }
        }
        setArtworks(fetchedArtworks);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, [eventId]);

  if (artworks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map((artwork, index) => (
        <div key={index} className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg min-w-[300px] h-[300px]">
          {/* Artwork Image */}
          <Image
            src={artwork.image_thumbnail || "/placeholder.jpg"} // Fallback if image is missing
            alt={artwork.title || "Artwork"} // Use artwork.title for alt text
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          {/* Overlay */}
          <Link
            href={`/events/${eventId}/artwork/${artwork.object_number}`}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
          >
            <span className="text-white font-bold text-lg">LÆS MERE</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

//artwork.object_number
export default TestArtCart;
