import React, { Component } from 'react';
import './Node.css';

class Nodedemo extends Component {
  render() {
    const { identifier } = this.props;

    return (
      <div className={`node ${identifier}`}></div>
    );
  }
}

export default Nodedemo;