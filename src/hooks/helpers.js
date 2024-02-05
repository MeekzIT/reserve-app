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

export const getPaymentStatus = (payment) => {
  if (payment == "start") {
    return "start";
  } else if (payment == "succes") {
    return "succes";
  } else if (payment == "faild") {
    return "faild";
  } else if (payment == "in_progres") {
    return "in_progres";
  } else if (payment == "finish") {
    return "finish";
  } else if (payment == "canacel") {
    return "canacel";
  } else return null;
};

export function formatDateToWords(inputDate) {
  let language = localStorage.getItem("language");
  const monthNames = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    am: [
      "Հունվար",
      "Փետրվար",
      "Մարտ",
      "Ապրիլ",
      "Մայիս",
      "Հունիս",
      "Հուլիս",
      "Օգոստոս",
      "Սեպտեմբեր",
      "Հոկտեմբեր",
      "Նոյեմբեր",
      "Դեկտեմբեր",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    ge: [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ],
    az: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avqust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
  };

  const [year, month, day] = inputDate.split("-").map(Number);

  const monthWord = monthNames[language][month - 1];

  switch (language) {
    case "am":
      return `${day} ${monthWord} ${year} թ.`;
    case "ru":
      return `${day} ${monthWord} ${year} г.`;
    case "ge":
      return `${year} წლის ${day} ${monthWord}`;
    case "az":
      return `${day} ${monthWord} ${year} il`;
    default:
      return `${monthWord} ${day}, ${year}`;
  }
}
