//Katinka
//Filtrere imellem kunstnere fra API?

// Hjælp af chatGPT
import { IoFilter } from "react-icons/io5";

const FilterBtn = ({ artists, selectedArtist, onSelectArtist }) => {
  return (
    <div className="flex items-center gap-2">
      <IoFilter />
      <select
        value={selectedArtist}
        onChange={(e) => onSelectArtist(e.target.value)}
        className="bg-black border rounded text-white px-3 py-2"
      >
        <option value="">Alle kunstnere</option>
        {artists.map((artist, index) => (
          <option key={index} value={artist}>
            {artist}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBtn;

//Statisk version
// import { IoFilter } from "react-icons/io5";

// const FilterBtn = () => {
//   return (
//     <div className="flex justify-between bg-black hover:bg-[var(--color-text-header)] text-white items-center gap-5 px-3 py-2 rounded-xs">
//       Filter
//       <IoFilter />
//     </div>
//   );
// };

// export default FilterBtn;
