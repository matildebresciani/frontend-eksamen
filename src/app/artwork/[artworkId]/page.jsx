//Katinka
//(Dette er en server component!)

// TEST jeg brugte for at checke at params og mappestruktur fungerede:
// export default function DebugParams({ params }) {
//   return <pre>{JSON.stringify(params, null, 2)}</pre>;
// }

// import Image from "next/image";
// import RelatedArt from "@/components/art_singleview/RelatedArt";
// import SingleArtTextContent from "@/components/art_singleview/SingleArtTextContent";

// // Opdateret version med hjælp fra chatGPT
// export default async function SingleArtwork({ params }) {
//   console.log("PARAMS:", params);
//   if (!params) {
//     return <div>Mangler URL-parametre</div>;
//   }

//   const { artworkId, eventId } = params;

//   if (!artworkId || !eventId) {
//     return <div>Ugyldige parametre</div>;
//   }

//   console.log("artworkId:", artworkId);
//   console.log("eventId:", eventId);
//   console.log(params);
//   const res = await fetch(
//     `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
//   );
//   const data = await res.json();
//   const artwork = data.items?.[0];

//   if (!artwork) return <div>Kunstværk blev ikke fundet</div>;

//   return (
//     <div>
//       <div className="flex flex-col items-center mx-3">
//         <Image
//           src={artwork.image_thumbnail || "/placeholder.jpg"}
//           alt={artwork.title || "Artwork"}
//           width={artwork.width || 1200}
//           height={artwork.height || 900}
//           className="w-full h-auto object-contain"
//         />
//         <SingleArtTextContent data={artwork} />
//       </div>
//       <RelatedArt artworkId={artworkId} />
//     </div>
//   );
// }

import ArtworkPageContent from "@/components/art_singleview/ArtworkPageContent";

export default async function ArtworkPage({ params }) {
  const { artworkId } = params;

  if (!artworkId) return <div>Ugyldige parametre</div>;

  return (
    <div>
      <ArtworkPageContent artworkId={artworkId} eventId={undefined} />
    </div>
  );
}
