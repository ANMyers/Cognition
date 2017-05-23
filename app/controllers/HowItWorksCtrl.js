"use strict";

app.controller("HowItWorksCtrl", function($scope, kmeansFactory) {

	let dataArrayPlotted = [];
	let dataArrayForAlgo = [];
	let examplePoints = [];
	let answer = [];
	let centers = [];
	let resetPoints = false;
	$scope.distanceToCent1 = 0;
 	$scope.distanceToCent2 = 0;
  $scope.groupedWith = "Plot a point to see.";
	// let dataArrayClustered = [];
	// let dataArrayCentroided = [];


	for (var i = 0; i < 50; i++) {
		let plot = {};
		plot.x = Math.floor((Math.random() * 100));
		plot.y = Math.floor((Math.random() * 100));
		let thisArray = [];
		thisArray.push(plot.x);
		thisArray.push(plot.y);
		dataArrayForAlgo.push(thisArray);
		let results = "Benign";
		if ((plot.x / plot.y) > 1) {
			results = "Malignant";
		} else {
			results = "Benign";
		}
		plot.tumor = results;
		dataArrayPlotted.push(plot);
	}

	let colorCoded = (plot) => {
		if (plot.tumor === "Benign") {
			return "blue";
		} else {
			return "red";
		}
	};

	let calculateCentroids = () => {
	//number of clusters, defaults to undefined
	kmeansFactory.clusterMaker.k(2);

	//number of iterations (higher number gives more time to converge), defaults to 1000
	kmeansFactory.clusterMaker.iterations(1000);

	//data from which to identify clusters, defaults to []
	kmeansFactory.clusterMaker.data(dataArrayForAlgo);
	answer = kmeansFactory.clusterMaker.clusters();

	console.log("answer: ", answer);

	for (var h = 0; h < answer.length; h++) {
		let center = {};
		center.x = answer[h].centroid[0];
		center.y = answer[h].centroid[1];
		centers.push(center);
	}
	console.log("centers: ", centers);
	};

	calculateCentroids();

	$scope.displayPlotted = () => {

	let width = 325;
	let height = 325;

	let padding = 50;

	let color1 = d3.scaleLinear()
							.domain([0, 100])
							.range(["red", "blue"]);


	let canvas1 = d3.select("#plottedGraph")
							.append("svg")
							.attr("width", width + padding + 15)
							.attr("height", height + padding * 2)
							.append('g')
							// .attr("id", "canvas")
							.attr("transform",
								"translate(" + padding + "," + padding + ")");
					
	let bars1 = canvas1.selectAll("dot")
							.data(dataArrayPlotted)
							.enter()
								.append("circle")
								.attr("r", 3.5)
								.attr("cx", function(d) { return ((d.x * 3.25)); })
								.attr("cy", function(d) { return (height - (d.y * 3.25)); })
								.attr("transform", "translate(2.5, 0)");

	let x = d3.scaleLinear()
						.range([0, width]);

	let y = d3.scaleLinear()
						.range([height, 0]);

	let widthAxis = d3.axisBottom()
							.scale(x)
							.ticks(10);
							// .ticks(dataArray.length);

	let heightAxis = d3.axisLeft()
							.scale(y)
							.ticks(10);

	let yDomain = d3.extent([0, 100]);

	let xDomain = d3.extent([0, 100]);
	//var xDomain = d3.extent([0.5, dataArray.length + 0.5]);


	canvas1.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width)
	        .attr("y", height + 35)
	        .text("Second Dimension (Length)");

	canvas1.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
	        .attr("y", - 40)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("First Dimension (Height)");

	y.domain(yDomain);
	x.domain(xDomain);

	canvas1.append("g")
				.attr("class", "x axis")
				.call(widthAxis)
				.attr("transform", "translate(0," + height + ")");

	canvas1.append("g")
				.attr("class", "y axis")
				.call(heightAxis);

   };

  $scope.displayClustered = () => {

	let width = 325;
	let height = 325;

	let padding = 50;

	let canvas2 = d3.select("#clusteredGraph")
							.append("svg")
							.attr("width", width + padding + 15)
							.attr("height", height + padding * 2)
							.append('g')
							// .attr("id", "canvas")
							.attr("transform",
								"translate(" + padding + "," + padding + ")");
					
	let malDots2 = canvas2.selectAll("dot")
							.data(answer[0].points)
							.enter()
								.append("circle")
								.attr("r", 3.5)
								.attr("cx", function(d) { return ((d[0] * 3.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 3.25)); })
								.style("fill", "blue")
								.attr("transform", "translate(2.5, 0)");

	let benDots2 = canvas2.selectAll("dot")
							.data(answer[1].points)
							.enter()
								.append("circle")
								.attr("r", 3.5)
								.attr("cx", function(d) { return ((d[0] * 3.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 3.25)); })
								.style("fill", "red")
								.attr("transform", "translate(2.5, 0)");

	let x = d3.scaleLinear()
						.range([0, width]);

	let y = d3.scaleLinear()
						.range([height, 0]);

	let widthAxis = d3.axisBottom()
							.scale(x)
							.ticks(10);
							// .ticks(dataArray.length);

	let heightAxis = d3.axisLeft()
							.scale(y)
							.ticks(10);

	let yDomain = d3.extent([0, 100]);

	let xDomain = d3.extent([0, 100]);
	//var xDomain = d3.extent([0.5, dataArray.length + 0.5]);


	canvas2.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width)
	        .attr("y", height + 35)
	        .text("Second Dimension (Length)");

	canvas2.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
	        .attr("y", - 40)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("First Dimension (Height)");

	y.domain(yDomain);
	x.domain(xDomain);

	canvas2.append("g")
				.attr("class", "x axis")
				.call(widthAxis)
				.attr("transform", "translate(0," + height + ")");

	canvas2.append("g")
				.attr("class", "y axis")
				.call(heightAxis);

   };

  $scope.displayCentroided = () => {

	let width = 325;
	let height = 325;

	let padding = 50;

	let canvas3 = d3.select("#centroidGraph")
							.append("svg")
							.attr("width", width + padding + 15)
							.attr("height", height + padding * 2)
							.append('g')
							// .attr("id", "canvas")
							.attr("transform",
								"translate(" + padding + "," + padding + ")");
					
	let benDots = canvas3.selectAll("dot")
							.data(answer[0].points)
							.enter()
								.append("circle")
								.attr("r", 3.5)
								.attr("cx", function(d) { return ((d[0] * 3.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 3.25)); })
								.style("fill", "blue")
								.attr("transform", "translate(2.5, 0)");

	let malDots = canvas3.selectAll("dot")
							.data(answer[1].points)
							.enter()
								.append("circle")
								.attr("r", 3.5)
								.attr("cx", function(d) { return ((d[0] * 3.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 3.25)); })
								.style("fill", "red")
								.attr("transform", "translate(2.5, 0)");

	let centroids = canvas3.selectAll("dot")
							.data(centers)
							.enter()
								.append("circle")
								.attr("r", 2)
								.attr("cx", function(d) { return ((d.x * 3.25)); })
								.attr("cy", function(d) { return (height - (d.y * 3.25)); })
								.style("fill", "black")
								.attr("transform", "translate(2.5, 0)");

	let centroidsrings = canvas3.selectAll("dot")
							.data(centers)
							.enter()
								.append("circle")
								.attr('fill-opacity', 0.1)
								.attr("r", 80)
								.attr("cx", function(d) { return ((d.x * 3.25)); })
								.attr("cy", function(d) { return (height - (d.y * 3.25)); })
								.attr("transform", "translate(2.5, 0)");

	let x = d3.scaleLinear()
						.range([0, width]);

	let y = d3.scaleLinear()
						.range([height, 0]);

	let widthAxis = d3.axisBottom()
							.scale(x)
							.ticks(10);
							// .ticks(dataArray.length);

	let heightAxis = d3.axisLeft()
							.scale(y)
							.ticks(10);

	let yDomain = d3.extent([0, 100]);

	let xDomain = d3.extent([0, 100]);
	//var xDomain = d3.extent([0.5, dataArray.length + 0.5]);


	canvas3.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width)
	        .attr("y", height + 35)
	        .text("Second Dimension (Length)");

	canvas3.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
	        .attr("y", - 40)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("First Dimension (Height)");

	y.domain(yDomain);
	x.domain(xDomain);

	canvas3.append("g")
				.attr("class", "x axis")
				.call(widthAxis)
				.attr("transform", "translate(0," + height + ")");

	canvas3.append("g")
				.attr("class", "y axis")
				.call(heightAxis);

  };

  $scope.displayTryItYourselfGraph = () => {

	let width = 525;
	let height = 525;

	let padding = 50;

	let canvas4 = d3.select("#tryItYourselfGraph")
							.append("svg")
							.attr("width", width + padding + 15)
							.attr("height", height + padding * 2)
							.append('g')
							// .attr("id", "canvas")
							.attr("transform",
								"translate(" + padding + "," + padding + ")");
					
	let benDots = canvas4.selectAll("dot")
							.data(answer[0].points)
							.enter()
								.append("circle")
								.attr("r", 4)
								.attr("cx", function(d) { return ((d[0] * 5.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 5.25)); })
								.style("fill", "blue")
								.attr("transform", "translate(2.5, 0)");

	let malDots = canvas4.selectAll("dot")
							.data(answer[1].points)
							.enter()
								.append("circle")
								.attr("r", 4)
								.attr("cx", function(d) { return ((d[0] * 5.25)); })
								.attr("cy", function(d) { return (height - (d[1] * 5.25)); })
								.style("fill", "red")
								.attr("transform", "translate(2.5, 0)");

	let centroids = canvas4.selectAll("dot")
							.data(centers)
							.enter()
								.append("circle")
								.attr("r", 3)
								.attr("cx", function(d) { return ((d.x * 5.25)); })
								.attr("cy", function(d) { return (height - (d.y * 5.25)); })
								.style("fill", "black")
								.attr("transform", "translate(2.5, 0)");

	let centroidsrings = canvas4.selectAll("dot")
							.data(centers)
							.enter()
								.append("circle")
								.attr('fill-opacity', 0.1)
								.attr("r", 120)
								.attr("cx", function(d) { return ((d.x * 5.25)); })
								.attr("cy", function(d) { return (height - (d.y * 5.25)); })
								.attr("transform", "translate(2.5, 0)");


	if ($scope.testX !== 0 && $scope.testY !== 0) {
		if (resetPoints === true) {

		} else {
		let examplePoints = [];
		let examplePoint = {};
		examplePoint.x = $scope.testX;
		examplePoint.y = $scope.testY;
		examplePoints.push(examplePoint);

		let examples = canvas4.selectAll("dot")
							.data(examplePoints)
							.enter()
								.append("circle")
								.attr("r", 5)
								.attr("cx", function(d) { return ((d.x * 5.25)); })
								.attr("cy", function(d) { return (height - (d.y * 5.25)); })
								.style("fill", "green")
								.attr("transform", "translate(2.5, 0)");

		let lineData = [];
		lineData.push(centers[0]);
		lineData.push(examplePoint);
		lineData.push(centers[1]);

		let lineFunction = d3.line()
												.x(function(d) { return ((d.x * 5.25) + 2); })
												.y(function(d) { return (height - (d.y * 5.25)); });

		let lineGraph = canvas4.append("path")
													.attr("d", lineFunction(lineData))
													.attr("stroke", "black")
													.attr("stroke-width", 2)
													.attr("fill", "none");

		}
	}
	resetPoints = false;

	let x = d3.scaleLinear()
						.range([0, width]);

	let y = d3.scaleLinear()
						.range([height, 0]);

	let widthAxis = d3.axisBottom()
							.scale(x)
							.ticks(10);
							// .ticks(dataArray.length);

	let heightAxis = d3.axisLeft()
							.scale(y)
							.ticks(10);

	let yDomain = d3.extent([0, 100]);

	let xDomain = d3.extent([0, 100]);
	//var xDomain = d3.extent([0.5, dataArray.length + 0.5]);


	canvas4.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width)
	        .attr("y", height + 35)
	        .text("Second Dimension (Length)");

	canvas4.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
	        .attr("y", - 40)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("First Dimension (Height)");

	y.domain(yDomain);
	x.domain(xDomain);

	canvas4.append("g")
				.attr("class", "x axis")
				.call(widthAxis)
				.attr("transform", "translate(0," + height + ")");

	canvas4.append("g")
				.attr("class", "y axis")
				.call(heightAxis);

  };

  $scope.testX = 0;
  $scope.testY = 0;

  $scope.plotTestPoints = () => {
		d3.select("#tryItYourselfGraph").select("svg").remove();
		$scope.displayTryItYourselfGraph();
		let testDistanceArray = [];
		testDistanceArray.push($scope.testX);
		testDistanceArray.push($scope.testY);
		$scope.distanceToCent1 = Math.floor(kmeansFactory.sumOfSquareDiffs(testDistanceArray, answer[0].centroid) / 50);
		$scope.distanceToCent2 = Math.floor(kmeansFactory.sumOfSquareDiffs(testDistanceArray, answer[1].centroid) / 50);
		if ($scope.distanceToCent1 < $scope.distanceToCent2) {
			$scope.groupedWith = "Blue";
		} else {
			$scope.groupedWith = "Red";
		}
  };

  $scope.resetTestPoints = () => {
  	examplePoints = [];
  	d3.select("#tryItYourselfGraph").select("svg").remove();
  	resetPoints = true;
  	$scope.testX = 0;
  	$scope.testY = 0;
  	$scope.displayTryItYourselfGraph();
  	$scope.distanceToCent1 = 0;
  	$scope.distanceToCent2 = 0;
  	$scope.groupedWith = "Plot a point to see.";
  };


   $scope.displayPlotted();
   $scope.displayClustered();
   $scope.displayCentroided();
   $scope.displayTryItYourselfGraph();

});