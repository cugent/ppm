import React from "react";

const ProductForm = props => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Title</label>
        <input onChange={props.onChange} type="text" value={props.name} className="form-control" id="name" aria-describedby="emailHelp" placeholder="Title" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Price</label>
        <input onChange={props.onChange} type="number" value={props.cost} className="form-control" id="cost" placeholder="Price" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Image URL</label>
        <input onChange={props.onChange} value={props.source} type="text" className="form-control" id="source" placeholder="Image URL" />
      </div>
      <div style={{ float: "right" }}>
        {props.buttonText === "Update" && (
          <button onClick={props.deleteProduct} style={{ width: "200px" }} className="btn btn-primary">
            Delete
          </button>
        )}
        <button style={{ marginLeft: "20px", width: "200px" }} onClick={() => props.onClick(props.source, props.name, props.cost)} className="btn btn-primary">
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
