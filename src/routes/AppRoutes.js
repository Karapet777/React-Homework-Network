import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "components/layout/Layout";
import ProductList from "containers/product/ProductList";
import Header from "components/header/Header";
import Home from "pages/home/Home";
import Todos from "pages/todos/Todos";
import ProductInfo from "components/productInfo/ProductInfo";
import Auth from "containers/auth/Auth";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Layout>
          <Switch>
            <Route exact path="/product" component={ProductList} />
            <Route path="/posts/:productId" component={ProductInfo} />
            <Route path="/todos" component={Todos} />
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={Home} />
            <Route exact path="*">
              <div>404 Error</div>
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
