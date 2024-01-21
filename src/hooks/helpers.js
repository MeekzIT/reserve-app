export const getLang = (lang) => {
  if (lang == 0) {
    return "Russian";
  } else if (lang == 1) {
    return "Armenian";
  } else if (lang == 2) {
    return "Georgian";
  } else if (lang == 3) {
    return "Azerbaijani";
  } else if (lang == 4) {
    return "Kazak";
  } else if (lang == 5) {
    return "Kirgiz";
  } else return null;
};

export const getCurrency = (roll) => {
  if (roll == 1) {
    return "֏";
  } else if (roll == 0) {
    return "₽";
  } else if (roll == 4) {
    return "₸";
  } else if (roll == 2) {
    return "₾";
  } else if (roll == 5) {
    return "Br";
  } else if (roll == 6) {
    return "₺";
  } else if (roll == 3) {
    return "₼";
  } else return null;
};
