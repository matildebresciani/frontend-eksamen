//maja
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchArtworkById } from "../../../api-mappe/SmkApiKald";
import BtnWithArrow from "@/components/BtnWithArrow";

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

  const linkHref = `/events/${eventId}/artwork/${artwork.object_number}`;

  return (
    <Link
      href={linkHref}
      className="relative flex items-center justify-center overflow-hidden rounded-xl shadow-lg bg-white max-w-[340px] max-h-[420px] min-w-[200px] min-h-[200px] cursor-pointer group"
    >
      <Image
        src={artwork.image_thumbnail || "/placeholder.jpg"}
        alt={artwork.titles?.[0]?.title || "Artwork"}
        width={600}
        height={800}
        className="object-contain max-h-[400px] max-w-[340px] w-auto h-auto transition duration-300 group-hover:opacity-40"
      />
      <div className="absolute inset-0 flex flex-col justify-end px-6 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10 backdrop-blur-[2px] rounded-xl">
        <span className="text-white font-semibold text-xl mb-2 break-words leading-tight max-w-full text-balance sm:text-md md:text-lg lg:text-xl line-clamp-2 text-shadow-red">
          {artwork.titles?.[0]?.title || "TITEL PÅ BILLEDE"}
        </span>
        <span className="mt-2 group/button pointer-events-none">
          <BtnWithArrow>
            <span className="font-semibold text-lg">LÆS MERE</span>
          </BtnWithArrow>
        </span>
      </div>
    </Link>
  );
};

export default TestArtCart;
