# Pathfinder (Algorithm Visualizer)

Have you ever wondered how it looks like when an algorithm such as Dijkstra's or BFS traverses a grid? Well here is a visual simulation of it! This project was built in two days using React in VS Code with `npm create-react-app`.  Credits to Brian Xue for helping me test and debug.

Last update: October 10, 2020

Any feedback or bug reports please email jwwang.2003@gmail.com

## How to use
[Click here](https://jwwang2003.github.io/pathfinder-visualizer/) to try it in your browser, a minimum resolution of 900px width is required otherwise webpage won't show. Which means this won't work on mobile devices in portrait mode. (I will fix this later)

The UI is very simple to use!
**Drawing Walls** (the most interesting part of this project) simply click, drag (optional), and release on the big white space to activate a wall. Clicking or dragging over walls already activated would revert them into empty spaces.
**Visualize button** basically begins the simulation; when it is pressed, the nodes would start to change state on the grid and you won't be able to draw any walls or change any settings.
**Reset button** Clears everything on the grid except the walls
**Clear button** Clears everything including walls

**Want to download and experiment with it?**
 1. Clone this repo and open the directory in VS  Code
 2. Open the terminal `npm install`, this would install all the required dependencies
 3. `npm start` hosts it locally on your machine
 4. `npm build` compiles code into html (for production & hosting)
 5. `npm deploy` pushes the built website to your github pages 

> **WARNING** the homepage is currently set to my own

These instructions may be a bit vague, please follow official tutorials on how to use these features.

## What works

 - Dijkstra's algorithm
 - Nav & control menu
 - Grid and animations
 - Drawing walls

## What doesn' t work

 - Other algorithms (because I have not written the code for them yet)
 - Learn & about pages are empty
 - Possibility of bugs?

## To-do (Future plans)

2020.10.10 - Currently working on another project and have school work. Once I have time I will come back and finish these ;)

 - Mobile friendly
 - Add some graphics (instead of just colors to represent node states)
 - Make start and end nodes movable
 - Learn page, here I'll post my code for each algorithm and a brief explanation of how it works
 - Possibly add tree graph mode (I think it's going to be a challenge)
 - Wall or maze generator
 - MORE TYPE OF GRAPH AND ALGORITHMS
 - Any suggestions?

## Changelog

 - ## October 10, 2020
	 - Initial build and upload yay!
	 - Discovered two major bugs (fixed)
		 - After the first visualization, adding an extra walls shows on the grid but algorithm passes right through it
			 - It appears in my reset function for each node did not reset the distance value therefore the algorithm did not work properly causing this bug
		 - After the first visualization (with solution), if the next visualization has no solution, the shortest path from the previous successful visualization would be drawn overwriting any wall in its way
			 - Adding another check in the algorithm to see if there was an solution solved this issue. If these were no solution then it returns a empty array.