//Formaterring af dato så det står skrevet pænere

export const formatDate = (date) => {
  const d = new Date(date);
  const weekday = d.toLocaleDateString("da-DK", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleDateString("da-DK", { month: "long" });

  return `${weekday} d. ${day}. ${month}`;
};
