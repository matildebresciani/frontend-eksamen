//Katinka
//Finde filtreringsvarianter
import { IoFilter } from "react-icons/io5";

const FilterBtn = () => {
  return (
    <div className="flex justify-between bg-black hover:bg-[var(--color-text-header)] text-white items-center gap-5 px-3 py-2 rounded-xs">
      Filter
      <IoFilter />
    </div>
  );
};

export default FilterBtn;
