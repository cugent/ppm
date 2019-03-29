import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="margin card card-body">
        <h1 className="card-title">Hello Page</h1>
        <p>Welcome to the Project Product Management. Here we can manage a set of products. You are able to create new products, remove old products, and edit products.</p>
      </div>
    );
  }
}

export default Home;
