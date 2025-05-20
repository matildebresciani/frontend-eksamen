//Katinka
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className="relative left-0 mt-8 sm:mt-3 pb-3 w-full ">
      <input
        type="text"
        placeholder="Søg"
        className="w-full pr-10 pl-3 py-2  bg-white border text-[var(--color-text-light)] border-gray-300 rounded-xs shadow-md focus:outline-none focus:border-secondary-cherry-light focus:ring-1 focus:ring-secondary-cherry-light"
      />
      <div className="absolute top-3 right-3 flex items-center text-[var(--color-text-light)] cursor-pointer">
        <CiSearch className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;

// import { CiSearch } from "react-icons/ci";

// const SearchBar = () => {
//   return (
//     <div className="relative mt-8 sm:mt-3 pb-3 w-full max-w-md">
//       <input
//         type="text"
//         placeholder="Søg"
//         className="w-full pr-10 pl-3 py-2 bg-white border text-[var(--color-text-light)] border-gray-300 rounded-xs shadow-md focus:outline-none focus:border-secondary-cherry-light focus:ring-1 focus:ring-secondary-cherry-light"
//       />
//       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-light)] cursor-pointer">
//         <CiSearch className="w-5 h-5" />
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

// import { CiSearch } from "react-icons/ci";

// const SearchBar = () => {
//   return (
//     <div className="flex items-center relative mt-8 sm:mt-3 pb-3">
//       <input
//         type="text"
//         placeholder="Søg"
//         className="bg-white rounded-xs"
//         // className="absolute top-[-12px] left-0 transform sm:-translate-x-55 -translate-y-1 w-47 sm:w-60 p-1 sm:p-2 border border-gray-300 rounded-md shadow-md transition-all duration-300 z-10 bg-white text-sm focus:outline-none focus:border-secondary-cherry-light focus:ring-1 focus:ring-secondary-cherry-light"
//       />
//       <div className="absolute">
//         <CiSearch />
//         {/* <CiSearch className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer z-20 absolute  top-[-14px] -[-2px] sm:left-[-14px]" /> */}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
