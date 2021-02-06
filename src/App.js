import React from "react";

import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import ProductList from "containers/ProductList";

function App() {
  return (
    <div className="App">
      <Header />

      <Layout>
        <ProductList />
      </Layout>
    </div>
  );
}

export default App;
