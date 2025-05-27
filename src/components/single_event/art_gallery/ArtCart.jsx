//Maja
//når den skal aættes til dynamisk skal man "npm install react-router-dom" og så "import { Link } from 'react-router-dom';" og derefter vil den være link til singleview således: "  <Link to={`/artwork/${id}`}>"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const ArtCart = () => {
  const [artworks, setArtworks] = useState([]);
  const { eventId } = useParams();
  

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const eventResponse = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`);
        const eventData = await eventResponse.json();

        const fetchedArtworks = [];
        for (const artwork of eventData.artworkIds) {
          try {
            const artworkResponse = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${artwork}`);
            const artworkData = await artworkResponse.json();

            // Naviger til items-arrayet og tilføj det til fetchedArtworks
            if (artworkData.items && artworkData.items.length > 0) {
              fetchedArtworks.push(...artworkData.items); // Tilføj alle items til fetchedArtworks
            } else {
              console.warn(`No items found for artwork ID ${artwork}`);
            }
          } catch (error) {
            console.error(`Error fetching artwork with ID ${artwork}:`, error);
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
        <div key={index} className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg">
          {/* Artwork Image */}
          <Image
            src={artwork.image_thumbnail || "/placeholder.jpg"} // Fallback hvis billedet mangler
            alt={`Artwork ${artwork.object_number}`}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity" />

          {/* Tekst + Link */}
          <Link href={`/artwork/${artwork.object_number}`} className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">LÆS MERE</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArtCart;

//hvis animation til pil vil tilføjes skal man indsætte følgende i tailwind.config.js:
// module.exports = {
//     theme: {
//       extend: {
//         keyframes: {
//           'bounce-x': {
//             '0%, 100%': { transform: 'translateX(0)' },
//             '50%': { transform: 'translateX(5px)' },
//           },
//         },
//         animation: {
//           'bounce-x': 'bounce-x 0.8s infinite',
//         },
//       },
//     },
//   };
