export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const getDay = () => {
  const date = new Date().getDay();
  let day;
  if (date === 0) {
    day = days[0];
  } else if (date === 1) {
    day = days[1];
  } else if (date === 2) {
    day = days[2];
  } else if (date === 3) {
    day = days[3];
  } else if (date === 4) {
    day = days[4];
  } else if (date === 5) {
    day = days[5];
  } else if (date === 6) {
    day = days[6];
  }
  return day;
};
const day = getDay();
export const translateDay = () => {
  let newDay;

  if (day === "Sunday") {
    newDay = "ראשון";
  } else if (day === "Monday") {
    newDay = "שני";
  } else if (day === "Tuesday") {
    newDay = "שלישי";
  } else if (day === "Wednesday") {
    newDay = "רביעי";
  } else if (day === "Thursday") {
    newDay = "חמישי";
  } else if (day === "Friday") {
    newDay = "שישי";
  }

  return newDay;
};
