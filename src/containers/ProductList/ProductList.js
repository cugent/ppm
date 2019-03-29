import React from "react";
import { Link } from "react-router-dom";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="margin">
        <div>
          <h1>Products List</h1>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <span className="page-link">1</span>
              </li>
              <li className="page-item">
                <span className="page-link">2</span>
              </li>
              <li className="page-item">
                <span className="page-link">3</span>
              </li>
            </ul>
          </nav>
        </div>
        {this.props.items.map((item, index) => {
          return (
            <div className="animated fadeIn" key={index} style={{ display: "inline-block", paddingLeft: "75px", paddingBottom: "75px" }}>
              <img alt={item.name} src={item.source} height="220px" width="220px" />
              <br />
              <span id="itemname">{item.name}</span>
              <h4>${item.cost}</h4>
              <Link to={`/products/edit/${item.id}`}>
                <button className="listingbutton orange">Edit</button>
              </Link>
              <br />
              <button onClick={() => this.props.deleteProduct(item.id)} className="listingbutton red">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductList;
