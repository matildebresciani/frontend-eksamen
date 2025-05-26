import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchArtworkById } from "../../../api-mappe/SmkApiKald";

const TestArtCart = ({ artworkId, eventId }) => {
  const [artwork, setArtwork] = useState(null);

  console.log(artworkId, "artworkId in TestArtCart"); // Log artworkId prop

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await fetchArtworkById(artworkId);
        if (data.items && data.items.length > 0) {
          setArtwork(data.items[0]);
        }
        console.log("artwork id", artworkId); // Log fetched artwork data
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };
    fetchArtwork();
  }, [artworkId]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg min-w-[300px] h-[300px]">
      <Image src={artwork.image_thumbnail || "/placeholder.jpg"} alt={artwork.titles?.[0]?.title || "Artwork"} width={300} height={300} className="object-cover w-full h-full" />
      <Link
        href={`/events/${eventId}/artwork/${artwork.object_number}`}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
      >
        <span className="text-white font-bold text-lg">LÆS MERE</span>
      </Link>
    </div>
  );
};

export default TestArtCart;
