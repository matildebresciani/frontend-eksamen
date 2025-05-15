import { FiEdit3 } from "react-icons/fi";

const EditIcon = () => {
    return ( <button
        className="bg-primary-red hover:bg-[#F04F4F] text-white rounded-full p-2 ease-in-out duration-200 w-10 h-10">
        <FiEdit3 size={24}></FiEdit3>
    </button> );
}
 
export default EditIcon;