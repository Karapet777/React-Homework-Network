import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "components/layout/Layout";
import ProductList from "containers/product/ProductList";
import Header from "components/header/Header";
import Home from "pages/home/Home";
import Todos from "pages/todos/Todos";
import ProductInfo from "components/productInfo/ProductInfo";
import Auth from "containers/auth/Auth";
import Profile from "pages/profile/Profile";
import ErrorPage from "pages/errorPage/ErrorPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout>
        <Switch>
          <Route exact path="/product" component={ProductList} />
          <Route path="/posts/:productId" component={ProductInfo} />
          <Route path="/todos" component={Todos} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route exact path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRoutes;
