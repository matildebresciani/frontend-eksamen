//Katinka

const IndexTextContent = ({ children }) => {
  return (
    <div className=" text-center font-medium mb-7 sm:mb-10 bg-[rgba(255,255,255,0.9)] py-4 sm:py-8 px-5 rounded-md">
      <h1>
        Velkommen til <br></br>
        <span className="text-primary-red font-[var(--text-work-sans)] uppercase">
          Modernia Curators
        </span>
      </h1>
      <p>
        Modernia Curators er din digitale platform dedikeret til modernistisk
        kunst og eventskabelse. Vi forbinder passionerede kuratorer med et
        publikum, der elsker nyskabende udtryk og banebrydende æstetik.
      </p>
      <p>
        Som kurator kan du nemt logge ind, oprette og redigere dine events, og
        vi sørger for, at det bliver præsenteret i et tiltalende og
        brugervenligt format.
      </p>
      <p>
        Som gæst får du et klart overblik over kommende events inden for
        modernistisk kunst, og du kan booke billetter direkte via platformen.
      </p>
      <p>
        Vi tror på modernismens vedvarende relevans – og på, at god formidling
        starter med et godt system.
      </p>
      {children}
    </div>
  );
};

export default IndexTextContent;
