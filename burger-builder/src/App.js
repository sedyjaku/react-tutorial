import React, {useEffect, useState} from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Burger from "./components/Burger/Burger";
import {Route, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";

function App() {
    return (
        <div className="App">
            <Layout>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/" component={BurgerBuilder}/>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
