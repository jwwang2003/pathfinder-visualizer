import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styles from './App.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Visualizer } from './Components';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <div className={styles.navbar}>
          <div className={styles.navbar_main}>
            <h1>Algorithm Visualizer</h1>
          </div>
          <div className={styles.navbar_items}>
            <Link to="/" className="nav-link"><h5>Home</h5></Link>
            <Link to="/learn" className="nav-link"><h5>Learn</h5></Link>
            <Link to="/about" className="nav-link"><h5>About</h5></Link>
          </div>
        </div>
      
        <div className={styles.main}>
          <Switch>
            <Route path="/learn">
              <Learn />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <div className={styles.container_visualizer}>
        <Visualizer></Visualizer>
      </div>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <p>Under development!</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <p>Under development!</p>
    </div>
  )
}

export default App;
