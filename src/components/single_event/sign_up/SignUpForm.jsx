//Maja
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";

const SignUpForm = () => {
  return (
    <div className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-xl px-8 py-6 m-8 max-w-sm w-full mx-auto">
      <h3 className="font-semibold text-center text-lg mb-6">Tilmeld dig</h3>

      <div className="mb-4">
        <label htmlFor="billetter" className="block text-sm mb-1">
          Antal billetter:
        </label>
        <input type="number" id="billetter" placeholder="Dine billetter..." className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-red-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="navn" className="block text-sm mb-1">
          Navn på reservation:
        </label>
        <input type="text" id="navn" placeholder="Dit navn..." className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-red-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm mb-1">
          Din mail:
        </label>
        <input type="email" id="email" placeholder="Din mail..." className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-red-500" />
      </div>

      <div className="text-center text-sm text-gray-600 mb-4">39/50 billetter er allerede booket</div>

      <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">Bekræft reservation</button>
    </div>
  );
};

export const NoTicketsPopUp = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
        {/* Scream illustration */}
        <div className="mb-4 flex justify-center">
          <Image src="/screamLineart.png" alt="Skrigende figur" width={100} height={100} />
        </div>

        <h2 className="text-lg font-semibold mb-2 text-gray-800">Øv… det ser ud til at der ikke er nok billetter</h2>

        <p className="text-sm text-gray-600 mb-6">
          Du kan tjekke nogle af vores andre events,
          <br />
          eller tilmelde dig med mail så får du en besked hvis der kommer flere billetter tilgængelige.
        </p>

        {/* mangler lige hurtig den knap som fortæller at mail er blevet godtaget + et kryds til at lukke siden ned hvis man bare vil lukke pop up.*/}
        <div className="relative mb-6">
          <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="email" placeholder="Din mail..." className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        {/* bare lige placeholder knap indtil jeg har pull så den rigtige kn indsættes */}
        <button className="border border-red-600 text-red-600 px-6 py-2 rounded-md hover:bg-red-50 hover:border-red-700 transition flex items-center justify-center mx-auto">
          Se andre events
          <span className="ml-2 animate-pulse">→</span>
        </button>
      </div>
    </div>
  );
};

// export default SignUpForm;
export default NoTicketsPopUp;
