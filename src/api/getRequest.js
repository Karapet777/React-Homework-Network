const requestData = (method, url, data = null) => {
  return fetch(url, {
    method,
    headers: data ? { "Contenet-Type": "applicatin/json" } : {},
    body: data ? JSON.stringify(data) : null,
  }).then((res) => {
    if (res.status < 400) {
      return res.json();
    } else {
      throw new Error("Network Error");
    }
  });
};

const getAllCocktails = () => {
  return requestData(
    "GET",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
  );
};
const getCocktails = () => {
  return requestData(
    "GET",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute"
  );
};
export { getAllCocktails, getCocktails };
