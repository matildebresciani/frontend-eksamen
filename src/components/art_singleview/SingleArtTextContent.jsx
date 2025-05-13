//Katinka

//Lavet dynamisk med hjælp fra ChatGPT
const SingleArtTextContent = ({ data }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
      <div className="pt-6 sm:pt-8 md:pt-12 sm:col-[1/2]">
        <h3>{data.title}</h3>
        <p>{data.artist}</p>
      </div>
      <p className="pt-5 sm:pt-8 md:pt-12 sm:col-[2/4]">{data.description}</p>
    </div>
  );
};

//Min oprindelige statiske kode
// const SingleArtTextContent = () => {
//   return (
//     <div className="sm:grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
//       <div className="pt-6 sm:pt-8 md:pt-12 sm:col-[1/2]">
//         <h3>Claude Monet</h3>
//         <p>“Indtryk, solopgang”</p>
//         <p>1872</p>
//         <p>Se værket her:</p>
//         <p>“Monets højde og dybder"</p>
//         <p>Lokation: EtSejtGalleri, Engade 1, 1111 København</p>
//         <p>Dato: 08. Maj 2025</p>
//         <p>Kollektion: “Monets ungdom”</p>
//         <p>Originale titel: “Impression, soleil levant”</p>
//         <p>Sprog: Frankrig (fransk)</p>
//         <p>Teknik: Olie på lærred</p>
//         <p>Anskaffelsesdato: 1940</p>
//       </div>
//       <p className="pt-5 sm:pt-8 md:pt-12 sm:col-[2/4]">
//         Claude Monet var en fransk maler og en af hovedfigurerne i den
//         impressionistiske bevægelse, som opstod i Frankrig i slutningen af
//         1800-tallet. Han er kendt for sine landskaber og særlige brug af lys og
//         farver, og hans værker har haft stor betydning for udviklingen af
//         moderne kunst. Et af hans mest berømte malerier er "Impression, soleil
//         levant" (på dansk: "Indtryk, solopgang"), malet i 1872 og udstillet
//         første gang i 1874. Det er netop dette maleri, der har givet navn til
//         hele impressionismen. "Impression, soleil levant" forestiller havnen i
//         Le Havre ved solopgang. Billedet viser skibe, havvand og den orange sol,
//         der langsomt stiger op over horisonten. Det er malet med hurtige
//         penselstrøg og uden skarpe detaljer – noget, som på daværende tidspunkt
//         virkede ufuldendt og chokerende for mange. Men netop denne stil var
//         Monets hensigt: han ønskede ikke at gengive virkeligheden præcist, men
//         snarere give et øjebliksbillede af, hvordan lyset og stemningen føltes i
//         det øjeblik. Monet malede billedet som en reaktion på den akademiske
//         kunst, der dominerede kunstscenen. Han ønskede at vise, at et maleri
//         ikke nødvendigvis behøvede at være perfekt og detaljeret for at være
//         smukt. Han eksperimenterede med lys og skygge og fangede øjeblikkets
//         stemning i stedet for nøjagtige former. Netop dette har gjort maleriet
//         banebrydende, og det regnes i dag som et af de vigtigste værker i
//         kunsthistorien. Gennem "Impression, soleil levant" formåede Monet at
//         sætte ord og billeder på en ny måde at tænke kunst på. Det var ikke
//         længere blot et spørgsmål om teknik, men om følelse, sansning og
//         øjeblikket. Maleriet er derfor både et kunstværk og et manifest for
//         impressionismen.
//       </p>
//     </div>
//   );
// };

export default SingleArtTextContent;
