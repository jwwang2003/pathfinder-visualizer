import React, { Component } from 'react';
import styles from './Visualizer.module.css';

import Node from '../Node/Node'
import Nodedemo from '../Node/Nodedemo'

import Controls from '../Controls/Controls';
import { astar, getNodesInShortestPathOrder as astarPath } from '../../Algorithms/Astar';
import { dijkstra, getNodesInShortestPathOrder as dijkstraPath } from '../../Algorithms/Dijkstra’s';
import { bfs, getNodesInShortestPathOrder as bfsPath } from '../../Algorithms/BFS';
import { dfs, getNodesInPathOrder as dfsPath } from '../../Algorithms/DFS';

class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      speed: `Normal`,
      algo: `Dijkstra’s`,
      startRow: 10,
      startCol: 5,
      endRow: 10,
      endCol: 35,
      working: false,
    };
  }

  updateAlgo(algo) {
    this.setState({algo: algo});
  }

  updateSpeed(speed) {
    this.setState({speed: speed});
  }

  componentDidMount() { 
    this.setState({grid: this.initializeGrid()});
  }

  handleMouseDown(row, col) {
    if (this.state.working) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed || this.state.working) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    if (this.state.working) return;
    this.setState({mouseIsPressed: false});
  }

  initializeGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const temp = [];
      for (let col = 0; col < 40; col++) {
        temp.push(this.newNode(col, row));
      }
      grid.push(temp);
    }
    return grid;
  };
  
  newNode(col, row) {
    return {
      col,
      row,
      isStart: row === this.state.startRow && col === this.state.startCol,
      isEnd: row === this.state.endRow && col === this.state.endCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  
   getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  //【开始】动画算法methods
  animate(graphHistory, shortestPath) {
    let i = 0;
    const { speed } = this.state;
    let S = 0;
    if (speed === "Normal") {
      S = 0.5;
    } 
    else if (speed === "Fast") {
      S = 0.25;
    } 
    else {
      S = 7;
    }
    document.getElementById("select1").setAttribute('disabled', '');
    document.getElementById("select2").setAttribute('disabled', '');
    document.getElementById("btn1").setAttribute('disabled', '');
    document.getElementById("btn2").setAttribute('disabled', '');
    document.getElementById("btn3").setAttribute('disabled', '');
    this.setState({working: true});
    let promises = [];
    graphHistory.forEach((node) => {
      if (this.checkNode(node)) return;
      promises.push(new Promise(
        (resolve, object) => {
          setTimeout(() => {
            this.updateVisitedNode(node.row, node.col);
            resolve();
          }, 30 * i * S);
        }
      ))
      ++i;
    })
    shortestPath.forEach((node) => {
      if (this.checkNode(node)) return;
      promises.push(new Promise(
        (resolve, object) => {
          setTimeout(() => {
            this.updatePathNode(node.row, node.col);
            resolve();
          }, 30 * i * S);
        }
      ))
      ++i;
    });
    Promise.all(promises).then(() => {
      document.getElementById("select1").removeAttribute('disabled');
      document.getElementById("select2").removeAttribute('disabled');
      document.getElementById("btn1").removeAttribute('disabled');
      document.getElementById("btn2").removeAttribute('disabled');
      document.getElementById("btn3").removeAttribute('disabled');
      this.setState({working: false});
    });
  }

  // helper methods
  checkNode(node) {
    return (node.isStart || node.isEnd);
  }

  updateVisitedNode(row, col) {
    document.getElementById(`node-${row}-${col}`).className = 'node node-visited';
  }

  updatePathNode(row, col) {
    document.getElementById(`node-${row}-${col}`).className = 'node node-shortest-path';
  }
  //【结束】

  //【开始】处理按钮的methods
  handleVisualize() {
    this.resetGrid();
    const {grid} = this.state;
    const startNode = grid[this.state.startRow][this.state.startCol];
    const finishNode = grid[this.state.endRow][this.state.endCol];
    let visitedNodesInOrder = [];
    let nodesInShortestPathOrder = [];
    if (this.state.algo === `A*`) {
      visitedNodesInOrder = astar(grid, startNode, finishNode);
      nodesInShortestPathOrder = astarPath(finishNode);
    }
    else if (this.state.algo === `Dijkstra’s`) {
      const results = dijkstra(grid, startNode, finishNode);
      if (results[1]) nodesInShortestPathOrder = dijkstraPath(finishNode);
      visitedNodesInOrder = results[0];
    }
    else if (this.state.algo === `BFS`) {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
      nodesInShortestPathOrder = bfsPath(finishNode);
    }
    else if (this.state.algo === `DFS`) {
      visitedNodesInOrder = dfs(grid, startNode, finishNode);
      nodesInShortestPathOrder = dfsPath(finishNode);
    }
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  //重设grid，全部visited过的和path都洗掉除了walls和开始点和结束点
  resetGrid() {
    const { grid } = this.state;
    grid.forEach((row) => {
      row.forEach((node) => {
        if (node.isVisited && !(node.isStart || node.isEnd || node.isWall)) {
          grid[node.row][node.col].isVisited = false;
          this.resetNode(node.row, node.col);
        }
        else if (node.isVisited) {
          grid[node.row][node.col].isVisited = false;
        }
        grid[node.row][node.col].distance = Infinity;
      })
    })
    this.setState({grid: grid});
  }

  //全部grid上面都洗掉除了开始点和结束点
  clearGrid() {
    const { grid } = this.state;
    grid.forEach((row) => {
      row.forEach((node) => {
        if ((node.isVisited || node.isWall) && !(node.isStart || node.isEnd)) {
          grid[node.row][node.col].isVisited = false;
          grid[node.row][node.col].isWall = false;
          this.resetNode(node.row, node.col);
        }
        grid[node.row][node.col].distance = Infinity;
      })
    })
    this.setState({grid: grid});
  }

  // helper method
  resetNode(row, col) {
    document.getElementById(`node-${row}-${col}`).className = 'node';
  }
  //【结束】

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div className={styles.container}>
        <Controls handleVisualize={() => this.handleVisualize()} resetGrid={() => this.resetGrid()} clearGrid={() => this.clearGrid()} algo={this.state.algo} updateAlgo={(algo) => this.updateAlgo(algo)} speed={this.state.speed} updateSpeed={(speed) => this.updateSpeed(speed)} updateTemp={(temp) => {this.updateTemp(temp)}}/>
        <div className={styles.legend}>
          <div className={styles.legend_item}>
            <Nodedemo identifier={"node-start"}></Nodedemo>
            <p>Start</p>
          </div>
          <div className={styles.legend_item}>
            <Nodedemo identifier={"node-end"}></Nodedemo>
            <p>End</p>
          </div>
          <div className={styles.legend_item}>
            <Nodedemo identifier={"node-wall"}></Nodedemo>
            <p>Wall</p>
          </div>
          <div className={styles.legend_item}>
            <Nodedemo identifier={"node-visited"}></Nodedemo>
            <p>Visited</p>
          </div>
          <div className={styles.legend_item}>
            <Nodedemo identifier={"node-shortest-path"}></Nodedemo>
            <p>Path</p>
          </div>
        </div>
        <div className={styles.visualizer}>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className={styles.grid_row}>
                {row.map((node, nodeIdx) => {
                const {row, col, isEnd, isStart, isWall} = node;
                return (
                  <Node key={nodeIdx} col={col} isEnd={isEnd} isStart={isStart} isWall={isWall}
                      mouseIsPressed={mouseIsPressed} onMouseDown={(row, col)=> this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                      this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                );
                })}
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default Visualizer;