import React, { Component } from "react";
import io from "socket.io-client";
import { Switch, Route } from "react-router";
import { BrowserRouter, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./containers/Home/Home";
import ProductCreation from "./containers/ProductCreation/ProductCreation";
import ProductList from "./containers/ProductList/ProductList";
import Edit from "./containers/Edit/Edit";
import Alert from "./components/Alert/Alert";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      alertMessage: "",
      alertOpen: false,
      loggedInUsers: 0
    };
    this.socket = io("http://localhost:1337");
  }

  componentDidMount = () => {
    this.socket.on("greeting", data => {
      //4
      console.log("CLIENT > socket.on greeting");
      console.log(data.msg); //5
      this.socket.emit("thankyou", { msg: "Thank you for connecting me! -Client" });
    });

    this.socket.on("itemchanged", data => {
      //4
      console.log("itemchanged");
      this.setState({ items: data.items });
    });

    this.socket.on("usercountchanged", data => {
      //4
      console.log("usercountchanged");
      this.setState({ loggedInUsers: data.count });
    });

    this.getProducts();
  };
  updateAlert = msg => {
    this.setState({ alertOpen: false }, () => {
      this.setState({ alertMessage: msg, alertOpen: true });
    });
  };
  closeAlert = () => {
    this.setState({ alertOpen: false });
  };

  createProduct = (source, name, cost) => {
    let object = {
      source,
      name,
      cost
    };
    axios.post("http://localhost:1337/products", object).then(response => {
      this.updateAlert("You have successfully created a new product");
    });
  };

  deleteProduct = id => {
    axios.delete(`http://localhost:1337/products/${id}`).then(response => {
      this.updateAlert(`You have successfully deleted product with id ${id}`);
    });
  };

  getProducts = () => {
    axios.get("http://localhost:1337/products").then(response => {
      this.setState({ items: response.data });
    });
  };

  updateProduct = (source, name, cost, id) => {
    let object = {
      source,
      name,
      cost
    };
    axios.put(`http://localhost:1337/products/${id}`, object).then(response => {
      this.updateAlert(`You have successfully updated product with id ${id}`);
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navigation onlineUsers={this.state.loggedInUsers} />
          <Alert alertMessage={this.state.alertMessage} closeAlert={this.closeAlert} alertOpen={this.state.alertOpen} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={props => {
                return <Home {...props} />;
              }}
            />
            <Route
              exact
              path="/products"
              render={props => {
                return <ProductList items={this.state.items} {...props} deleteProduct={this.deleteProduct} />;
              }}
            />
            <Route
              exact
              path="/products/new"
              render={props => {
                return <ProductCreation {...props} createProduct={this.createProduct} />;
              }}
            />
            <Route
              exact
              path="/products/edit/:id"
              render={props => {
                return <Edit {...props} deleteProduct={this.deleteProduct} updateProduct={this.updateProduct} />;
              }}
            />
            {/* <Route path="/sell" />
            <Route path="/ledger" />
            <Route path="/transaction/:id" /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
