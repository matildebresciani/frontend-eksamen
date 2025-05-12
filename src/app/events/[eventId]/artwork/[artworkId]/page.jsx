//Katinka

import Image from "next/image";
import RelatedArt from "@/components/art_singleview/RelatedArt";
import SingleArtTextContent from "@/components/art_singleview/SingleArtTextContent";

const SingleArtwork = () => {
  return (
    <div>
      <Image
        src="/imgs/index.png"
        alt="single artwork"
        width={1500}
        height={1000}
      ></Image>
      <SingleArtTextContent></SingleArtTextContent>
      <RelatedArt></RelatedArt>
    </div>
  );
};

export default SingleArtwork;

// export default function SingleArtwork() {
//   return (
//     <div>
//     </div>
//   );
// }
