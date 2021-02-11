const GetData = (method, url, data = null) => {
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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(
        GetData(
          "GET",
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        )
      );
    }, 3000);
  });
};
const getCocktails = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(
        GetData(
          "GET",
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute"
        )
      );
    }, 3000);
  });
};
export { getAllCocktails, getCocktails };
