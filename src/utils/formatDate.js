//Formaterring af dato så det står skrevet pænere
//Med hjælp fra AI for at sætte det korrekt funktionelt op
//Prompt: Hvordan får jeg den til at skrive ugedagen, d. og datoen, og så det starter med stort bogstav, så der fx står "Torsdag d. 5. maj"

export const formatDate = (date) => {
  const d = new Date(date);
  const weekday = d.toLocaleDateString("da-DK", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleDateString("da-DK", { month: "long" });

  const formatted = `${weekday} d. ${day}. ${month}`;

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

// export const formatDate = (date) =>
//   new Date(date).toLocaleDateString("da-DK", {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
