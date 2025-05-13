//Katinka

import Image from "next/image";
import RelatedArt from "@/components/art_singleview/RelatedArt";
import SingleArtTextContent from "@/componentart_singleview/SingleArtTextContent";

export default async function SingleArtwork({ params }) {
  const { id } = params;
  const res = await fetch(`https://api.smk.dk/api/v1/art?object_number=${id}`);
  const artwork = await res.json();

  return (
    <div>
      <Image
        src={artwork.imageUrl}
        alt={artwork.title}
        width={1500}
        height={1000}
      ></Image>
      <SingleArtTextContent data={artwork}></SingleArtTextContent>
      <RelatedArt artworkId={id}></RelatedArt>
    </div>
  );
}

//Min oprindelige statiske version:
// import Image from "next/image";
// import RelatedArt from "@/components/art_singleview/RelatedArt";
// import SingleArtTextContent from "@/components/art_singleview/SingleArtTextContent";

// const SingleArtwork = () => {
//   return (
//     <div>
//       <Image
//         src="/imgs/index.png"
//         alt="single artwork"
//         width={1500}
//         height={1000}
//       ></Image>
//       <SingleArtTextContent></SingleArtTextContent>
//       <RelatedArt></RelatedArt>
//     </div>
//   );
// };

// export default SingleArtwork;
