//export const serverUrl = `http://localhost:3001`;

export const serverUrl = `https://madigital-b.herokuapp.com`;

//export const hostname = `http://localhost:5173`;
export const hostname = `https://madigital.co.il`;

export const headers = {
  headers: { Authorization: localStorage.getItem("token") },
};
export const emailRegexValidationMsg = `Invalid email address. Please enter a valid email address`;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^05\d{8}$/;
export const phoneRegexValidationMsg = `Invalid phone number. Please enter a valid phone number starting with '05' and followed by 8 digits.`;
export const webSiteRegex =
  /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.(co\.il|com|net|org|edu|gov|mil|info|biz|me|io|tv|cc)$/;
export const user = {
  _id: 1,
  name: `Hen`,
  phone: `0542339739`,
  email: `mirimadanim1@gmail.com`,
  isAdressSet: true,
  website: `MiriCatering.co.il`,

  address: {
    city: `Beer Sheva`,
    street: `Dafna 11`,
  },
  picture: `../../assets/miri/logo.png`,
};
