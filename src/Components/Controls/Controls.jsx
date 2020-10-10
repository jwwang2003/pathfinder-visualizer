import React from 'react';
import { Component } from 'react';

import styles from './Controls.module.css';

class Controls extends Component {
  render() {
    return (
      <div id="controls" className={styles.container}>
        <div className={styles.item}>
          <div className="form-group">
            <label htmlFor="exampleSelect2">Select algorithm</label>
            <select id="select1" className="form-control" value={this.props.algo} onChange={(e) => {this.props.updateAlgo(e.target.value)}}>
              <option>A*</option>
              <option>Dijkstra’s</option>
              <option>BFS</option>
              <option>DFS</option>
            </select>
          </div>
        </div>
        <div className={styles.item}>
          <div className="form-group">
            <label htmlFor="exampleSelect2">Simulation speed</label>
            <select id="select2" className="form-control" value={this.props.speed} onChange={(e) => {this.props.updateSpeed(e.target.value)}}>
              <option>Normal</option>
              <option>Fast</option>
              <option>Slow</option>
            </select>
          </div>
        </div>
        
        <div className={styles.item}>
          <button id="btn1" className="btn btn-info" onClick={() => this.props.handleVisualize()}>Visualize</button>
        </div>
        <div className={styles.item}>
          <button id="btn2" className="btn btn-danger" onClick={() => this.props.resetGrid()}>Reset Grid</button>
        </div>
        <div className={styles.item}>
          <button id="btn3" className="btn btn-danger" onClick={() => this.props.clearGrid()}>Clear Grid</button>
        </div>
      </div>
    )
  }
}

export default Controls;