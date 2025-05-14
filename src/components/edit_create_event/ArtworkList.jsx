//Katinka
//Statisk version
import Image from "next/image";
import FilterBtn from "./FilterBtn";
import SearchBar from "./SearchBar";
import { IoCheckmark } from "react-icons/io5";

const ArtworkList = () => {
  return (
    <div className="flex flex-col max-w-[350px] sm:max-w-[500px]">
      <div>
        <h5>Vælg værker:</h5>
        <p>Vælg op til (x) værker:</p>
        <p>Du kan vælge (x) værker mere</p>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center mr-5 mt-5">
        <FilterBtn></FilterBtn>
        <SearchBar></SearchBar>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5 ">
        <div>
          <div className="flex relative justify-end ">
            <div className="absolute mr-2 mt-2 w-4 h-4 border-1 text-white border-white bg-transparent rounded-xs cursor-pointer">
              <IoCheckmark />
            </div>
            <Image
              src="/dummy4.jpg"
              alt="dummy"
              width={200}
              height={200}
            ></Image>
          </div>
          <p>Titel på værk</p>
        </div>
        <div>
          <div className="flex relative justify-end ">
            <div className="absolute mr-2 mt-2 w-4 h-4 border-1 border-white bg-transparent rounded-xs cursor-pointer">
              {/* <IoCheckmark /> */}
            </div>
            <Image
              src="/dummy4.jpg"
              alt="dummy"
              width={200}
              height={200}
            ></Image>
          </div>
          <p>Titel på værk</p>
        </div>
        <div>
          <div className="flex relative justify-end ">
            <div className="absolute mr-2 mt-2 w-4 h-4 border-1 border-white bg-transparent rounded-xs cursor-pointer">
              {/* <IoCheckmark /> */}
            </div>
            <Image
              src="/dummy4.jpg"
              alt="dummy"
              width={200}
              height={200}
            ></Image>
          </div>
          <p>Titel på værk</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkList;
