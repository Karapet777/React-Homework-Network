import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "components/layout/Layout";
import ProductList from "containers/ProductList";
import Header from "components/header/Header";
import Home from "pages/home/Home";
import Todos from "pages/todos/Todos";
import ProductInfo from "components/productInfo/ProductInfo";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Layout>
          <Route exact path="/product" component={ProductList} />
          <Route exact path="/posts/:productId" component={ProductInfo} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/" component={Home} />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
