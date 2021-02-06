import React, { Component } from "react";

import List from "components/list/List";
import Button from "components/button/Button";
import "containers/ProductList.scss";

const initialState = {
  isCocktail: false,
  isDrinks: false,
  itemCocktail: [],
  itemCocktail1: [],
};

export class ProductList extends Component {
  state = {
    ...initialState,
  };
  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          itemCocktail: resJson.drinks,
        });
        console.log(resJson);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute"
    )
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          itemCocktail1: resJson.drinks,
        });
        console.log(resJson);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  selectHandlerCocktail = () => {
    this.setState({
      isCocktail: !this.state.isCocktail,
      isDrinks: false,
    });
  };
  selectHandlerChildrenDrinks = () => {
    this.setState({
      isDrinks: !this.state.isDrinks,
      isCocktail: false,
    });
  };

  componentWillUnmount() {
    this.setState({
      ...initialState,
    });
  }
  render() {
    const { isCocktail, isDrinks, itemCocktail, itemCocktail1 } = this.state;
    return (
      <div className="app-product-container">
        <div className="app-product-container__block-btns">
          <Button
            className="app-product-container__block-btns__btns"
            onClick={this.selectHandlerCocktail}
          >
            Cocktail
          </Button>
          <Button
            className="app-product-container__block-btns__btns"
            onClick={this.selectHandlerChildrenDrinks}
          >
            drinks
          </Button>
        </div>
        <div>
          {isCocktail
            ? itemCocktail.map((e) => {
                return (
                  <List
                    key={e.idDrink}
                    nameDrink={e.strDrink}
                    imgDrink={e.strDrinkThumb}
                    className="container-list"
                  />
                );
              })
            : null}

          {isDrinks
            ? itemCocktail1.map((e) => {
                return (
                  <List
                    key={e.idDrink}
                    nameDrink={e.strDrink}
                    imgDrink={e.strDrinkThumb}
                    className="container-list"
                  />
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default ProductList;
