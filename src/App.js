import React from "react";

import Layout from "./components/layout/Layout";
import ProductList from "containers/ProductList";

function App() {
  return (
    <div className="App">
      <Layout>
        <ProductList />
      </Layout>
    </div>
  );
}

export default App;
