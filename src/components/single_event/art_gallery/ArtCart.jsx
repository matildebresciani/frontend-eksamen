//Maja
//når den skal aættes til dynamisk skal man "npm install react-router-dom" og så "import { Link } from 'react-router-dom';" og derefter vil den være link til singleview således: "  <Link to={`/artwork/${id}`}>"

import Image from "next/image";

const ArtCart = ({ src, alt }) => {
  return (
    <div className="relative group flex items-center justify-center flex-shrink-0 snap-start overflow-hidden rounded-xl shadow-lg">
      <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="h-auto w-auto max-h-[80vh] object-contain transition-transform duration-500 group-hover:scale-105" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white  opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      {/* Tekst + Pil */}
      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
        <h3 className="text-lg font-bold tracking-wide">TITEL PÅ BILLEDE</h3>
        <div className="flex items-center space-x-2 mt-1 group-hover:translate-x-1 transition-transform duration-300 text-red-500 font-semibold">
          <span>LÆS MERE</span>
          <span className="animate-bounce-x">→</span>
        </div>
      </div>
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
