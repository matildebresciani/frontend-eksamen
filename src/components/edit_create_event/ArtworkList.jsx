//Katinka
import Image from "next/image";
//import FilterBtn from "./FilterBtn";
import SearchBar from "./SearchBar";
import { IoCheckmark } from "react-icons/io5";

const ArtworkList = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h5>Vælg værker:</h5>
        <p>Vælg op til (x) værker:</p>
        <p>Du kan vælge (x) værker mere</p>
      </div>
      <div className="sm:flex sm:justify-between">
        {/* <FilterBtn></FilterBtn> */}
        <div>Filterbutton</div>
        <SearchBar></SearchBar>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5">
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
        <div className="flex relative justify-end">
          <div className="absolute pr-2 pt-2">check-box</div>
          <Image src="/dummy4.jpg" alt="dummy" width={200} height={200}></Image>
        </div>
      </div>
    </div>
  );
};

export default ArtworkList;
