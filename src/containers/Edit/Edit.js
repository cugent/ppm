import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cost: "",
      source: ""
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:1337/products/${this.props.match.params.id}`).then(response => {
      let { name, cost, source } = response.data;
      this.setState({ name, cost, source });
    });
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  deleteProduct = () => {
    this.props.deleteProduct(this.props.match.params.id);
    this.props.history.push("/products");
  };
  updateProduct = (source, name, cost) => {
    this.props.updateProduct(source, name, cost, this.props.match.params.id);
    this.props.history.push("/products");
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="margin card card-body">
        <div>
          <h1 className="card-title" style={{ display: "inline-block", width: "inherit" }}>
            Edit Product
          </h1>
          <button style={{ display: "inline-block", float: "right", marginBottom: "20px", marginLeft: "20px", width: "200px" }} onClick={this.goBack} className="btn btn-primary">
            Back
          </button>
        </div>
        <ProductForm
          deleteProduct={this.deleteProduct}
          onClick={this.updateProduct}
          name={this.state.name}
          cost={this.state.cost}
          source={this.state.source}
          onChange={this.onChange}
          buttonText="Update"
        />
      </div>
    );
  }
}

export default withRouter(Edit);
