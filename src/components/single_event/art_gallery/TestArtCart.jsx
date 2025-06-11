//maja
//Denne komponent viser et kunstværk i et galleri, hvor brugeren kan klikke for at læse mere om værket.
//Den er stylet med en tydelig hover så brugeren kan se at den er klikbar.
//Hele billedet er et link men den har også en animeret knap med pil

//I DENNE FORK HAR DER VÆRET EN ÆNDRING SÅ ARTCART IKKE KUN VISER LINK VED HOVER

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchArtworkById } from "../../../api-mappe/SmkApiKald";
import BtnWithArrow from "@/components/BtnWithArrow";

const TestArtCart = ({ artworkId, eventId }) => {
  const [artwork, setArtwork] = useState(null); //holder data om værket
  const [isHovered, setIsHovered] = useState(false); //styler visuelle ændringer ved hover

  //Henter data om værket baseret på dets ID
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const data = await fetchArtworkById(artworkId);
        if (data.items && data.items.length > 0) {
          setArtwork(data.items[0]); //vi gemmer det første værk fra svaret
        }
      } catch (error) {
        console.error("Error fetching artwork:", error); //fejl hvis API-kald fejler
      }
    };
    fetchArtwork(); //kalder funktionen når komponenten loades
  }, [artworkId]); //kører igen hvis artworkId ændrer sig

  if (!artwork) {
    return <div>Loading...</div>; //viser en loading hvis data ikke er hentet endnu
  }

  const linkHref = `/events/${eventId}/artwork/${artwork.object_number}`; //bygger dynamisk link til værksiden

  return (
    //HELE KOMPONENTEN ER ET LINK – så brugeren kan klikke hvor som helst
    <Link
      href={linkHref}
      className="relative flex flex-col overflow-hidden rounded-sm shadow-lg bg-white max-w-[420px] min-w-[250px] cursor-pointer"
      style={{ padding: 0 }}
      onMouseEnter={() => setIsHovered(true)} //sætter hover til true
      onMouseLeave={() => setIsHovered(false)} //slår hover fra igen
    >
      {/* Billedet af værket */}
      <div className="relative w-full">
        <Image
          src={artwork.image_thumbnail || "/imgs/placeholder.jpg"} //fallback hvis billede mangler
          alt={artwork.titles?.[0]?.title || "Artwork"}
          width={600}
          height={800}
          className={`object-contain w-full h-auto transition-all duration-300 ease-in-out ${isHovered ? "brightness-75" : ""}`} //dæmper billede ved hover
          style={{ display: "block" }}
        />

        {/* Overlay titel – vises kun ved hover */}
        {isHovered && (
          <div className="absolute inset-0 z-30 flex items-end justify-start bg-black/45 transition-opacity ease-in-out duration-300 px-4 pb-2">
            <p className="!text-white text-lg font-semibold z-40">{artwork.titles?.[0]?.title}</p>
          </div>
        )}
      </div>

      {/* Nederste del med knappen */}
      <div className="bg-white/80 px-4 py-3 backdrop-blur-sm flex flex-col rounded-b-sm z-20 relative">
        {/* Knap med pil, importeret som komponent */}
        <BtnWithArrow className="text-red-600 hover:text-red-800">
          <span className="font-semibold text-base">Se værket her</span>
        </BtnWithArrow>
      </div>
    </Link>
  );
};

export default TestArtCart;