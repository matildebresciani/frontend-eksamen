//Matilde
// En simpel hjælpefunktion, der returnerer en Promise som "venter" i X millisekunder
//Bruges til at få loading effekt på vores knapper til at køre i lang nok tid
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Funktionen laver et nyt(new) Promise som først bliver færdigt (resolved) når setTimeout siger den er klar
//Altså, når vi bruger den på knapperne, så lover funktionen først at udføre knappens funktion, efter X millisekunder
