export const CapitalizeFirstLetter = (inputString: string): string => {
  if (!inputString) {
    return inputString;
  }

  if (inputString?.length === 0) {
    return inputString;
  }

  const firstLetter = inputString[0].toUpperCase();
  const restOfTheString = inputString.slice(1);

  return firstLetter + restOfTheString;
};

export const convertRomanToNumber = (roman: string) => {
  switch (roman) {
    case "I":
      return 1;
    case "II":
      return 2;
    case "III":
      return 3;
    case "IV":
      return 4;
    case "V":
      return 5;
    case "VI":
      return 6;
    case "VII":
      return 7;
    case "VIII":
      return 8;
    case "IX":
      return 9;
    default:
      return 10;
  }
};
