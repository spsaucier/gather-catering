import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Menu } from "antd";
import "./App.css";
// import EditableTable from "./components/EditableTable";
import IngredientsTable from "./components/IngredientsTable";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import PacklistTable from "./components/PacklistTable";

import IngredientsStore from "./store/Ingredients";
import ProductsStore from "./store/Products";
import OrdersStore from "./store/Orders";
import AggregatesStore from "./store/Aggregates";

@observer class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Menu mode="horizontal" theme="dark">
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/ingredients">Ingredients</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/aggregate">Packlist</Link>
              </Menu.Item>
            </Menu>
          </header>
          <Route exact path="/" component={Home} />
          <Route path="/ingredients" component={IngredientsList} />
          <Route path="/products" component={ProductsList} />
          <Route path="/orders" component={OrdersList} />
          <Route path="/aggregate" component={AggregateList} />
        </div>
      </Router>
    );
  }
}

export default App;

const Home = () => (
  <div>
    <h2 style={{marginTop: "20px"}}>Demo: Ingredients -> Products -> Orders</h2>
  </div>
);

var ingredients = new IngredientsStore();
var products = new ProductsStore();
var orders = new OrdersStore();
var aggregates = new AggregatesStore();

const IngredientsList = () => (
  <div className="Main">
    <IngredientsTable ingredients={ingredients}/>
  </div>
);

const ProductsList = () => (
  <div className="Main">
    <ProductsTable products={products} ingredients={ingredients}/>
  </div>
);

const OrdersList = () => (
  <div className="Main">
    <OrdersTable orders={orders} products={products}/>
  </div>
);

const AggregateList = () => (
  <div className="Main">
    <PacklistTable aggregates={aggregates}/>
  </div>
);
