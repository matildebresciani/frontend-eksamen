//Katinka
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FilterBtn from "./FilterBtn";
import SearchBar from "./SearchBar";
import { IoCheckmark } from "react-icons/io5";

const ITEMS_PER_PAGE = 12;
const MAX_SELECTION = 10;

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100"
        );
        const data = await res.json();
        const items = data.items || [];

        setArtworks(items);
        setFilteredArtworks(items);
      } catch (error) {
        console.error("Fejl ved hentning af billeder:", error);
      }
    };

    fetchArtworks();
  }, []);

  // Udtræk unikke kunstnere
  const artists = Array.from(
    new Set(
      artworks
        .map((item) => item.artist)
        .filter((name) => typeof name === "string" && name.length > 0)
    )
  );

  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setCurrentPage(1);

    if (artist === "") {
      setFilteredArtworks(artworks);
    } else {
      const filtered = artworks.filter((art) => art.artist === artist);
      setFilteredArtworks(filtered);
    }
  };

  const toggleSelect = (id) => {
    if (selectedArtworks.includes(id)) {
      setSelectedArtworks(selectedArtworks.filter((aid) => aid !== id));
    } else if (selectedArtworks.length < MAX_SELECTION) {
      setSelectedArtworks([...selectedArtworks, id]);
    }
  };

  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const displayedArtworks = filteredArtworks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col max-w-[350px] sm:max-w-[500px]">
      <div>
        <h5>Vælg op til {MAX_SELECTION} værker:</h5>
        <p>
          Du kan vælge {MAX_SELECTION - selectedArtworks.length} værker mere
        </p>
      </div>

      <div className="sm:flex sm:justify-between sm:items-center mr-5 mt-5">
        <FilterBtn
          artists={artists}
          selectedArtist={selectedArtist}
          onSelectArtist={handleSelectArtist}
          artworks={artworks}
        />
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5">
        {displayedArtworks.map((artwork) => {
          const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
          const title = artwork.titles?.[0]?.title || "Uden titel";
          const isSelected = selectedArtworks.includes(artwork.id);

          return (
            <div key={artwork.id}>
              <div
                className="relative cursor-pointer group"
                onClick={() => toggleSelect(artwork.id)}
              >
                {isSelected && (
                  <div
                    className="absolute inset-0 z-10 pointer-events-none rounded"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                  >
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-sm flex items-center justify-center border border-red-600">
                      <IoCheckmark className="text-red-600 text-sm" />
                    </div>
                  </div>
                )}

                {!isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-transparent rounded-sm border border-gray-300 z-10" />
                )}

                <Image
                  src={imageUrl}
                  alt={title}
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
              <p>{title}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 my-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-primary-red text-white border-primary-red"
                : "border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedArtworks.length > 0 && (
        <button
          onClick={() => setSelectedArtworks([])}
          className="self-end mb-4 px-3 py-1 border border-primary-red text-primary-red text-sm rounded hover:bg-primary-red hover:text-white"
        >
          Ryd alle valg
        </button>
      )}

      <button className="self-end mb-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
        Læg til valgte værker
      </button>
    </div>
  );
};

export default ArtworkList;

// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import FilterBtn from "./FilterBtn";
// import SearchBar from "./SearchBar";
// import { IoCheckmark } from "react-icons/io5";

// const ITEMS_PER_PAGE = 12;
// const MAX_SELECTION = 10;

// const ArtworkList = () => {
//   const [artworks, setArtworks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedArtworks, setSelectedArtworks] = useState([]);

//   useEffect(() => {
//     const fetchArtworks = async () => {
//       try {
//         const res = await fetch(
//           "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100"
//         );
//         const data = await res.json();
//         setArtworks(data.items || []);
//       } catch (error) {
//         console.error("Fejl ved hentning af billeder:", error);
//       }
//     };

//     fetchArtworks();
//   }, []);

//   const totalPages = Math.ceil(artworks.length / ITEMS_PER_PAGE);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const toggleSelect = (id) => {
//     const alreadySelected = selectedArtworks.includes(id);
//     if (alreadySelected) {
//       setSelectedArtworks(selectedArtworks.filter((artId) => artId !== id));
//     } else if (selectedArtworks.length < MAX_SELECTION) {
//       setSelectedArtworks([...selectedArtworks, id]); //Sørger for at man ikke kan vælge mere end max selection
//     }
//   };

//   const displayedArtworks = artworks.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="flex flex-col max-w-[350px] sm:max-w-[500px]">
//       <div>
//         <h5>Vælg op til {MAX_SELECTION} værker:</h5>
//         <p>
//           Du kan vælge {MAX_SELECTION - selectedArtworks.length} værker mere
//         </p>
//       </div>

//       <div className="sm:flex sm:justify-between sm:items-center mr-5 mt-5">
//         <FilterBtn />
//         <SearchBar />
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5">
//         {displayedArtworks.map((artwork) => {
//           const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
//           const title = artwork.titles?.[0]?.title || "Uden titel";
//           const isSelected = selectedArtworks.includes(artwork.id);

//           return (
//             <div key={artwork.id}>
//               <div
//                 className="relative cursor-pointer group"
//                 onClick={() => toggleSelect(artwork.id)}
//               >
//                 {/* Overlay + checkmark (kun når valgt) */}
//                 {isSelected && (
//                   <div
//                     className="absolute inset-0 z-10 pointer-events-none rounded"
//                     style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
//                   >
//                     <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-sm flex items-center justify-center border border-primary-red">
//                       <IoCheckmark className="text-primary-red text-sm" />
//                     </div>
//                   </div>
//                 )}

//                 {/* Tom hvid checkbox (når ikke valgt) */}
//                 {!isSelected && (
//                   <div className="absolute top-1 right-1 w-5 h-5 bg-transparent rounded-sm border border-gray-300 z-10" />
//                 )}

//                 <Image
//                   src={imageUrl}
//                   alt={title}
//                   width={200}
//                   height={200}
//                   className="rounded"
//                 />
//               </div>
//               <p>{title}</p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center gap-2 my-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-2 py-1 border rounded ${
//               //   currentPage === i + 1 ? "bg-gray-300" : "bg-white"
//               currentPage === i + 1
//                 ? "bg-primary-red text-white border-primary-red"
//                 : "border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       {selectedArtworks.length > 0 && (
//         <button
//           onClick={() => setSelectedArtworks([])}
//           className="self-end mb-4 px-3 py-1 border border-primary-red text-primary-red text-sm rounded hover:bg-primary-red hover:text-white"
//         >
//           Ryd alle valg
//         </button>
//       )}
//       <button className="self-end mb-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
//         Læg til valgte værker
//       </button>
//     </div>
//   );
// };

// export default ArtworkList;

//Statisk version
// import Image from "next/image";
// import FilterBtn from "./FilterBtn";
// import SearchBar from "./SearchBar";
// import { IoCheckmark } from "react-icons/io5";

// const ArtworkList = () => {
//   return (
//     <div className="flex flex-col max-w-[350px] sm:max-w-[500px]">
//       <div>
//         <h5>Vælg værker:</h5>
//         <p>Vælg op til (x) værker:</p>
//         <p>Du kan vælge (x) værker mere</p>
//       </div>
//       <div className="sm:flex sm:justify-between sm:items-center mr-5 mt-5">
//         <FilterBtn></FilterBtn>
//         <SearchBar></SearchBar>
//       </div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5 ">
//         <div>
//           <div className="flex relative justify-end ">
//             <div className="absolute mr-2 mt-2 w-4 h-4 border-1 text-white border-white bg-transparent rounded-xs cursor-pointer">
//               <IoCheckmark />
//             </div>
//             <Image
//               src="/dummy4.jpg"
//               alt="dummy"
//               width={200}
//               height={200}
//             ></Image>
//           </div>
//           <p>Titel på værk</p>
//         </div>
//         <div>
//           <div className="flex relative justify-end ">
//             <div className="absolute mr-2 mt-2 w-4 h-4 border-1 border-white bg-transparent rounded-xs cursor-pointer">
//               {/* <IoCheckmark /> */}
//             </div>
//             <Image
//               src="/dummy4.jpg"
//               alt="dummy"
//               width={200}
//               height={200}
//             ></Image>
//           </div>
//           <p>Titel på værk</p>
//         </div>
//         <div>
//           <div className="flex relative justify-end ">
//             <div className="absolute mr-2 mt-2 w-4 h-4 border-1 border-white bg-transparent rounded-xs cursor-pointer">
//               {/* <IoCheckmark /> */}
//             </div>
//             <Image
//               src="/dummy4.jpg"
//               alt="dummy"
//               width={200}
//               height={200}
//             ></Image>
//           </div>
//           <p>Titel på værk</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkList;
