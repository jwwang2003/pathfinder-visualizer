import React, { Component } from 'react';
import './Node.css';

class Node extends Component {
  render() {
    const {col, isEnd, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row} = this.props;
    const identifier = isEnd
      ? 'node-end'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${identifier}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}

export default Node;