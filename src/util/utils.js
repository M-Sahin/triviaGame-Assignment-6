// a helper method for decoding html encoded API-data 
export const htmlDecode = (string) => {
  const htmlElement = document.createElement("textarea");
  htmlElement.innerHTML = string;
  return htmlElement.value;
};
