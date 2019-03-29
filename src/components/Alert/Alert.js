import React, { Component } from "react";

const Alert = props => {
  return (
    <div style={{ margin: "20px" }}>
      {props.alertMessage !== "" && props.alertOpen ? (
        <div className="animated fadeIn alert alert-success alert-dismissible fade show" role="alert">
          {props.alertMessage}
          <button type="button" className="close" onClick={props.closeAlert} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Alert;
