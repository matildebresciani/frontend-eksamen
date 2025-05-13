//Maja's kode (DENNE HAR ÆNDRINGER LAVET AF KATINKA FOR AT KOBLE TIL singleArtwork)

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const TestArtCart = ({ artworkId, eventId }) => {
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchSingleArtwork = async () => {
      try {
        const res = await fetch(
          `https://api.smk.dk/api/v1/art/?object_number=${artworkId}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setArtwork(data.items[0]);
        }
      } catch (error) {
        console.error("Fejl ved hentning af artwork:", error);
      }
    };

    fetchSingleArtwork();
  }, [artworkId]);

  if (!artwork) return <div>Loading...</div>;

  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg min-w-[300px] h-[300px]">
      <Image
        src={artwork.image_thumbnail || "/placeholder.jpg"}
        alt={artwork.title || "Artwork"}
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
      <Link
        // href={`/artwork/${artwork.object_number}`}
        href={`/events/${eventId}/artwork/${artwork.object_number}`}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
      >
        <span className="text-white font-bold text-lg">LÆS MERE</span>
      </Link>
    </div>
  );
};

export default TestArtCart;

//Maja's oprindelige kode
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// const ArtCart = () => {
//   const [artworks, setArtworks] = useState([]);
//   const { eventId } = useParams();

//   useEffect(() => {
//     const fetchArtwork = async () => {
//       try {
//         const eventResponse = await fetch(
//           `https://server-gititgirls.onrender.com/events/${eventId}`
//         );
//         const eventData = await eventResponse.json();

//         const fetchedArtworks = [];
//         for (const artwork of eventData.artworkIds) {
//           try {
//             const artworkResponse = await fetch(
//               `https://api.smk.dk/api/v1/art/?object_number=${artwork}`
//             );
//             const artworkData = await artworkResponse.json();

//             // Naviger til items-arrayet og tilføj det til fetchedArtworks
//             if (artworkData.items && artworkData.items.length > 0) {
//               fetchedArtworks.push(...artworkData.items); // Tilføj alle items til fetchedArtworks
//             } else {
//               console.warn(`No items found for artwork ID ${artwork}`);
//             }
//           } catch (error) {
//             console.error(`Error fetching artwork with ID ${artwork}:`, error);
//           }
//         }

//         setArtworks(fetchedArtworks);
//       } catch (error) {
//         console.error("Error fetching artwork:", error);
//       }
//     };

//     fetchArtwork();
//   }, [eventId]);

//   if (artworks.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {artworks.map((artwork, index) => (
//         <div
//           key={index}
//           className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg"
//         >
//           {/* Artwork Image */}
//           <Image
//             src={artwork.image_thumbnail || "/placeholder.jpg"} // Fallback hvis billedet mangler
//             alt={`Artwork ${artwork.object_number}`}
//             width={300}
//             height={300}
//             className="object-cover w-full h-full"
//           />

//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity" />

//           {/* Tekst + Link */}
//           <Link
//             href={`/artwork/${artwork.object_number}`}
//             className="absolute inset-0 flex items-center justify-center"
//           >
//             <span className="text-white font-bold text-lg">LÆS MERE</span>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArtCart;
