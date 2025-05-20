//Katinka
//Filtrere imellem kunstnere fra API?
import { IoFilter } from "react-icons/io5";
import Button from "../Button";
import { GoTrash } from "react-icons/go";
import { useState, useRef, useEffect } from "react";

const FilterDropdown = ({ title, options, selected, onToggle, icon: Icon }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-3" ref={dropdownRef}>
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
      {(selectedArtists.length > 0 ||
        selectedTechniques.length > 0 ||
        selectedMaterials.length > 0) && (
        <Button variant="transparent_w_icon" onClick={onClearFilters}>
          <GoTrash />
          Ryd filtre
        </Button>
      )}
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
