import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { Menu } from "antd";
// import EditableTable from "./components/EditableTable";
import IngredientsTable from "./components/IngredientsTable";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import PacklistTable from "./components/PacklistTable";
import './App.css';

class App extends Component {
  render() {
    return <Router>
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
          <Route path="/ingredients" component={Ingredients} />
          <Route path="/products" component={Products} />
          <Route path="/orders" component={Orders} />
          <Route path="/aggregate" component={Aggregate} />
          <DevTools />
        </div>
      </Router>;
  }
}

export default observer(App);

const Home = () => (
  <div>
    <h2 style={{marginTop: "20px"}}>Demo: Ingredients -> Products -> Orders</h2>
  </div>
);

const Ingredients = () => (
  <div className="Main">
    <IngredientsTable />
  </div>
);

const Products = () => (
  <div className="Main">
    <ProductsTable />
  </div>
);

const Orders = () => (
  <div className="Main">
    <OrdersTable />
  </div>
);

const Aggregate = () => (
  <div className="Main">
    <PacklistTable />
  </div>
);
