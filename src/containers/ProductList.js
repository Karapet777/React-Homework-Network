import React, { Component } from "react";

import List from "components/list/List";
import Button from "components/button/Button";
import "containers/ProductList.scss";
import { getAllCocktails, getCocktails } from "api/getRequest";
import ColorList from "./colorList/ColorList";
import service from "api/service";

const initialState = {
  isCocktail: false,
  isDrinks: false,
  isColor: false,
  itemCocktail: [],
  itemCocktail1: [],
};

export class ProductList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    getAllCocktails().then((data) => {
      this.setState({
        itemCocktail: data.drinks,
      });
    });

    getCocktails().then((data) => {
      this.setState({
        itemCocktail1: data.drinks,
      });
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
  selectHandlerColor = () => {
    this.setState({
      isDrinks: false,
      isCocktail: false,
      isColor: !false,
    });
  };
  // ______________________________ Post

  // createPost = () => {
  //   service.createPost({
  //     title: 'title',
  //     body: 'body',
  //     userId:1
  //   })
  //   .then(date => {
  //     this.setState({
  //       posts: [...initialState,date]
  //     })
  //   })
  // }

  // ______________________________ Patch

  // ubdatePost = () => {
  //   service
  //     .ubdatePost(1, {
  //       title: "title",
  //       body: "body",
  //       userId: 1,
  //     })
  //     .then((data) => {
  //       const newPost = this.state.posts.map((el) => {
  //         if (el.id === data.id) {
  //           return data;
  //         }
  //         return el;
  //       });

  //       this.setState({
  //         posts: newPost,
  //       });
  //     });
  // };

  render() {
    const {
      isCocktail,
      isDrinks,
      itemCocktail,
      itemCocktail1,
      isColor,
    } = this.state;
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
          <Button
            className="app-product-container__block-btns__btns"
            onClick={this.selectHandlerColor}
          >
            Color
          </Button>
        </div>
        <div>
          {!isCocktail && !isDrinks && !isColor ? (
            <p className="app-product-container__text-request">No Request</p>
          ) : isCocktail ? (
            itemCocktail.map((e) => {
              return (
                <List
                  key={e.idDrink}
                  nameDrink={e.strDrink}
                  imgDrink={e.strDrinkThumb}
                  className="container-list"
                />
              );
            })
          ) : isDrinks ? (
            itemCocktail1.map((e) => {
              return (
                <List
                  key={e.idDrink}
                  nameDrink={e.strDrink}
                  imgDrink={e.strDrinkThumb}
                  className="container-list"
                />
              );
            })
          ) : isColor ? (
            <ColorList />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProductList;
