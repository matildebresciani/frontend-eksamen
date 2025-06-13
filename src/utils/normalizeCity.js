//Matilde
//Udarbejdet med hjælp fra AI til at kunne samle de to københavn adresser under en samlet "København" checkbox
//Prompt: "Hvordan kan jeg samle "kbh" og "københavn" til den samme mulighed/checkbox når man vælger by"

const normalizeCity = (address) => {
  //Splitter adressen ved komma og tag den anden del (for at få postnr og bynavn)
  //Trim for at fjerne mellemrum i starten og slutningen
  //Split (" ") deler strengen ved mellemrum (for at dele postrummer og by op) og laver det til et array
  //Slice tager alt i arrayet efter postnummeret (altså fra indeks 1 til slutningen)
  //Join samler det til en streng igen
  const city = address.split(",")[1]?.trim().split(" ").slice(1).join(" ");
  if (!city) return ""; //Hvis der ikke er en by, returnerer den tom streng
  if (
    //Laver bynavnene til lowercase og hvis de inkluderer kbh eller københavn, returnerer "København"
    city.toLowerCase().includes("kbh") ||
    city.toLowerCase().includes("københavn")
  )
    return "København";

  //Eller returner det normale bynavn
  return city;
};

export default normalizeCity;
