//Katinka
//Filtrere imellem kunstnere fra API?
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import Button from "../Button";
import { GoTrash } from "react-icons/go";

const FilterDropdown = ({ title, options, selected, onToggle, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-3">
      <Button
        onClick={() => setOpen(!open)}
        type="button"
        variant="black"
        className="flex items-center"
      >
        {Icon && <IoFilter />}
        <span>{title}</span>
      </Button>
      {open && (
        <div className="absolute z-10 bg-white border mt-1 rounded shadow max-h-60 overflow-auto w-full">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-1 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterBtn = ({
  artists = [],
  techniques = [],
  materials = [],
  selectedArtists = [],
  selectedTechniques = [],
  selectedMaterials = [],
  onSelectArtist,
  onSelectTechnique,
  onSelectMaterial,
  onClearFilters,
}) => {
  return (
    <div className="grid grid-cols-3 w-full gap-3">
      <FilterDropdown
        title="Kunstnere"
        options={artists}
        selected={selectedArtists}
        onToggle={onSelectArtist}
        icon={IoFilter}
      />
      <FilterDropdown
        title="Teknikker"
        options={techniques}
        selected={selectedTechniques}
        onToggle={onSelectTechnique}
        icon={IoFilter}
      />
      <FilterDropdown
        title="Materialer"
        options={materials}
        selected={selectedMaterials}
        onToggle={onSelectMaterial}
        icon={IoFilter}
      />

      <Button variant="transparent_w_icon" onClick={onClearFilters}>
        <GoTrash />
        Ryd filtre
      </Button>
    </div>
  );
};

export default FilterBtn;

// const FilterBtn = ({
//   artists,
//   techniques,
//   materials,
//   selectedArtists,
//   selectedTechniques,
//   selectedMaterials,
//   onSelectArtist,
//   onSelectTechnique,
//   onSelectMaterial,
// }) => {
//   return (
//     // <div className="flex flex-col sm:flex-row gap-2">
//     //   {/* Vælg kunstner */}
//     //   <select
//     //     value={selectedArtist}
//     //     onChange={(e) => onSelectArtist(e.target.value)}
//     //     className="border rounded px-2 py-1"
//     //   >
//     //     <option value="">Alle kunstnere</option>
//     //     {artists.map((artist) => (
//     //       <option key={artist} value={artist}>
//     //         {artist}
//     //       </option>
//     //     ))}
//     //   </select>

//     //   {/* Vælg teknik */}
//     //   <select
//     //     value={selectedTechnique}
//     //     onChange={(e) => onSelectTechnique(e.target.value)}
//     //     className="border rounded px-2 py-1"
//     //   >
//     //     <option value="">Alle teknikker</option>
//     //     {techniques.map((tech) => (
//     //       <option key={tech} value={tech}>
//     //         {tech}
//     //       </option>
//     //     ))}
//     //   </select>

//     //   {/* Vælg materiale */}
//     //   <select
//     //     value={selectedMaterial}
//     //     onChange={(e) => onSelectMaterial(e.target.value)}
//     //     className="border rounded px-2 py-1"
//     //   >
//     //     <option value="">Alle materialer</option>
//     //     {materials.map((mat) => (
//     //       <option key={mat} value={mat}>
//     //         {mat}
//     //       </option>
//     //     ))}
//     //   </select>
//     // </div>
//     <div>
//       <h4>Kunstnere</h4>
//       {artists.map((artist) => (
//         <label key={artist} className="block">
//           <input
//             type="checkbox"
//             checked={selectedArtists.includes(artist)}
//             onChange={() => onSelectArtist(artist)}
//           />
//           <span className="ml-2">{artist}</span>
//         </label>
//       ))}

//       <h4 className="mt-4">Teknikker</h4>
//       {techniques.map((tech) => (
//         <label key={tech} className="block">
//           <input
//             type="checkbox"
//             checked={selectedTechniques.includes(tech)}
//             onChange={() => onSelectTechnique(tech)}
//           />
//           <span className="ml-2">{tech}</span>
//         </label>
//       ))}

//       <h4 className="mt-4">Materialer</h4>
//       {materials.map((mat) => (
//         <label key={mat} className="block">
//           <input
//             type="checkbox"
//             checked={selectedMaterials.includes(mat)}
//             onChange={() => onSelectMaterial(mat)}
//           />
//           <span className="ml-2">{mat}</span>
//         </label>
//       ))}
//       <button
//         className="mt-3 px-3 py-1 border rounded text-sm text-primary-red hover:bg-[var(--color-primary-red-hover2)] hover:text-white"
//         onClick={() => {
//           setSelectedArtists([]);
//           setSelectedTechniques([]);
//           setSelectedMaterials([]);
//           applyFilters([], [], []);
//         }}
//       >
//         Ryd filtre
//       </button>
//     </div>
//   );
// };

// export default FilterBtn;

// import { IoFilter } from "react-icons/io5";

// const FilterBtn = ({
//   artists,
//   techniques,
//   materials,
//   selectedArtist,
//   selectedTechnique,
//   selectedMaterial,
//   onSelectArtist,
//   onSelectTechnique,
//   onSelectMaterial,
// }) => {
//   return (
//     <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
//       <div className="flex items-center gap-2">
//         <IoFilter />
//         <select
//           value={selectedArtist}
//           onChange={(e) => onSelectArtist(e.target.value)}
//           className="bg-black border rounded text-white px-3 py-2 cursor-pointer hover:bg-[var(--color-text-header)]"
//         >
//           <option value="">Alle kunstnere</option>
//           {artists.map((artist, index) => (
//             <option key={index} value={artist}>
//               {artist}
//             </option>
//           ))}
//         </select>
//       </div>

//       <select
//         value={selectedTechnique}
//         onChange={(e) => onSelectTechnique(e.target.value)}
//         className="bg-black border rounded text-white px-3 py-2 cursor-pointer hover:bg-[var(--color-text-header)]"
//       >
//         <option value="">Alle teknikker</option>
//         {techniques.map((technique, index) => (
//           <option key={index} value={technique}>
//             {technique}
//           </option>
//         ))}
//       </select>

//       <select
//         value={selectedMaterial}
//         onChange={(e) => onSelectMaterial(e.target.value)}
//         className="bg-black border rounded text-white px-3 py-2 cursor-pointer hover:bg-[var(--color-text-header)]"
//       >
//         <option value="">Alle materialer</option>
//         {materials.map((material, index) => (
//           <option key={index} value={material}>
//             {material}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default FilterBtn;

// Hjælp af chatGPT
// import { IoFilter } from "react-icons/io5";

// const FilterBtn = ({ artists, selectedArtist, onSelectArtist }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <IoFilter />
//       <select
//         value={selectedArtist}
//         onChange={(e) => onSelectArtist(e.target.value)}
//         className="bg-black border rounded text-white px-3 py-2 cursor-pointer hover:bg-[var(--color-text-header)]"
//       >
//         <option value="">Alle kunstnere</option>
//         {artists.map((artist, index) => (
//           <option key={index} value={artist}>
//             {artist}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default FilterBtn;

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
