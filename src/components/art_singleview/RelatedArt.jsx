//Katinka
//data.similar_images_url HENTE FRA API

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const RelatedArt = ({ artworkId }) => {
  const [related, setRelated] = useState([]);
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
        );
        const data = await res.json();

        const similarUrl = data.similar_images_url;

        if (!similarUrl) {
          console.warn("Ingen similar_images_url fundet.");
          setHasResults(false);
          return;
        }

        const similarRes = await fetch(similarUrl);
        const similarData = await similarRes.json();

        const filtered = similarData.filter(
          (item) => item.object_number !== artworkId
        );

        if (filtered.length === 0) {
          setHasResults(false);
          return;
        }

        setRelated(filtered);
        setHasResults(true);
      } catch (error) {
        console.error("Fejl ved hentning af relateret kunst:", error);
        setHasResults(false);
      }
    };

    fetchRelated();
  }, [artworkId]);

  return (
    <div className="pt-10 sm:pt-14 sm:col-[1/4]">
      <h4 className="text-lg font-semibold">Relaterede kunstværker</h4>
      <p className="text-sm text-gray-600">Hentet fra SMK's database:</p>

      <div className="mt-4">
        {!hasResults ? (
          <p className="text-sm text-gray-500 italic">
            Ingen lignende værker fundet
          </p>
        ) : (
          <div className="flex overflow-x-auto">
            <div className="flex gap-4 shrink-0">
              {related.map((item) => (
                <Link
                  href={`/artwork/${item.object_number}`}
                  key={item.object_number}
                >
                  <div className="min-w-[160px]">
                    <Image
                      src={item.image_thumbnail}
                      alt={item.title || "related art"}
                      width={160}
                      height={120}
                      className="object-cover rounded shadow"
                    />
                    <p className="text-xs mt-1">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedArt;

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// const RelatedArt = ({ artworkId }) => {
//   const [related, setRelated] = useState([]);

//   useEffect(() => {
//     const fetchRelated = async () => {
//       try {
//         // 1. Henter hovedværket for at finde kunstneren
//         const res = await fetch(
//           `https://api.smk.dk/api/v1/art?object_number=${artworkId}`
//         );
//         const data = await res.json();
//         const creator = data.creator;

//         // 2. Henter værker af samme kunstner
//         const relatedRes = await fetch(
//           `https://api.smk.dk/api/v1/art?creator=${encodeURIComponent(
//             creator
//           )}&size=5`
//         );
//         const relatedData = await relatedRes.json();

//         // Filtrérer originalværket fra resultaterne
//         const filtered = relatedData.items.filter(
//           (item) => item.object_number !== artworkId
//         );

//         setRelated(filtered);
//       } catch (error) {
//         console.error("Error fetching related art:", error);
//       }
//     };

//     fetchRelated();
//   }, [artworkId]);

//   return (
//     <div className="pt-10 sm:pt-14 sm:col-[1/4]">
//       <h4 className="text-lg font-semibold">Relaterede kunstværker</h4>
//       <p className="text-sm text-gray-600">
//         Se andre værker fra samme kunstner
//       </p>

//       <div className="flex overflow-x-auto mt-4">
//         <div className="flex gap-4 shrink-0">
//           {related.map((item) => (
//             <Link
//               href={`/artwork/${item.object_number}`}
//               key={item.object_number}
//             >
//               <div className="min-w-[160px]">
//                 <Image
//                   src={item.image_thumbnail || "/imgs/fallback.png"}
//                   alt={item.title || "related art"}
//                   width={160}
//                   height={120}
//                   className="object-cover rounded shadow"
//                 />
//                 <p className="text-xs mt-1">{item.title}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RelatedArt;

//Info fra chatten
//  Husk:
// Billeder fra SMK:
// Brug image_thumbnail eller image fra API'et.

// SMK API understøtter ikke Next.js Image direkte — brug evt. unoptimized prop i <Image /> hvis nødvendigt:

// <Image unoptimized src={...} />

// Fallback-billede:
// Du kan vise et fallback-billede, hvis item.image_thumbnail er null.

// Link til singleview:
// Navigér til /artwork/[object_number].

//Min oprindelige statiske version
// import Image from "next/image";

// const RelatedArt = () => {
//   return (
//     <div className="pt-10 sm:pt-14 sm:col-[1/4]">
//       <h4>Relaterede kunstværker</h4>
//       <p>Se andre værker fra samme kunstner, tidsperiode og kunststil.</p>
//       <div className="flex overflow-scroll">
//         <div className="flex gap-3 shrink-0 pt-6">
//           <Image
//             src="/imgs/index.png"
//             alt="related art"
//             width={160}
//             height={120}
//             className="sm:w-50 sm:h-auto md:w-60 md:h-auto lg:w-70 lg:h-auto"
//           ></Image>
//           <Image
//             src="/imgs/index.png"
//             alt="related art"
//             width={160}
//             height={120}
//             className="sm:w-50 sm:h-auto md:w-60 md:h-auto lg:w-70 lg:h-auto"
//           ></Image>
//           <Image
//             src="/imgs/index.png"
//             alt="related art"
//             width={160}
//             height={120}
//             className="sm:w-50 sm:h-auto md:w-60 md:h-auto lg:w-70 lg:h-auto"
//           ></Image>
//           <Image
//             src="/imgs/index.png"
//             alt="related art"
//             width={160}
//             height={120}
//             className="sm:w-50 sm:h-auto md:w-60 md:h-auto lg:w-70 lg:h-auto"
//           ></Image>
//           <Image
//             src="/imgs/index.png"
//             alt="related art"
//             width={160}
//             height={120}
//             className="sm:w-50 sm:h-auto md:w-60 md:h-auto lg:w-70 lg:h-auto"
//           ></Image>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RelatedArt;
