//Katinka
import Image from "next/image";

const RelatedArt = () => {
  return (
    <div className="pt-10 sm:pt-14 sm:col-[1/4]">
      <h4>Relaterede kunstværker</h4>
      <p>Se andre værker fra samme kunstner, tidsperiode og kunststil.</p>
      <div className="flex overflow-scroll">
        <div className="flex gap-3 shrink-0 pt-6">
          <Image
            src="/imgs/index.png"
            alt="related art"
            width={160}
            height={120}
          ></Image>
          <Image
            src="/imgs/index.png"
            alt="related art"
            width={160}
            height={120}
          ></Image>
          <Image
            src="/imgs/index.png"
            alt="related art"
            width={160}
            height={120}
          ></Image>
          <Image
            src="/imgs/index.png"
            alt="related art"
            width={160}
            height={120}
          ></Image>
          <Image
            src="/imgs/index.png"
            alt="related art"
            width={160}
            height={120}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default RelatedArt;
