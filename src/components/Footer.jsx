//Katinka
//Footer

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-between  gap-4 mt-20 sm:mt-25 py-10 px-8 sm:py-12 sm:px-12 md:py-14 md:px-20 lg:py-16 lg:px-30 bg-primary-red ">
      <Image
        src="/imgs/logo_footer.svg"
        alt="footer logo"
        width={100}
        height={100}
        className="sm:w-[120px] sm:h-[120px]"
      />
      <div>
        <h5 className=" mb-2  uppercase">Modernia Curators</h5>
        <p>Sølvgade 48-50</p>
        <p className="mb-2">1307 København K</p>
        <p>Telefon: 33 74 84 94</p>
        <p>Telefontid: Tirsdag - Fredag 10.00-12.00</p>
        <p>Email: modernia_curators@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
