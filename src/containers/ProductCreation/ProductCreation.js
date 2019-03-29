import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
class ProductCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cost: "",
      source: ""
    };
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    return (
      <div className="margin card card-body">
        <h1 className="card-title">Create a New Product</h1>
        <ProductForm onClick={this.props.createProduct} name={this.state.name} cost={this.state.cost} source={this.state.source} onChange={this.onChange} buttonText="Create" />
      </div>
    );
  }
}

export default ProductCreation;
