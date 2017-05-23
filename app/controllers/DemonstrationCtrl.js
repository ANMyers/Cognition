"use strict";

app.controller("DemonstrationCtrl", function($scope, ResultsStorage, kmeansTestingFactory, kmeansFactory) {

	let userDataSet = [];
	var randomSetArray = [];
	var dataArray = [];
	//var yDisplayArray = [];
	let malignantResults1 = [];
	let malignantResults2 = [];
	let benignResults1 = [];
	let benignResults2 = [];
	let centroids = [];
	let displayed = false;
	let testObj = {};

	//displays for tables
	$scope.correctMalignant = 0;
	$scope.incorrectMalignant = 0;
	$scope.totalPredictedMalignant = 0;
	$scope.incorrectBenign = 0;
	$scope.correctBenign = 0;
	$scope.totalPredictedBenign = 0;
	$scope.totalTrueMalignant = 0;
	$scope.totalTrueBenign = 0;
	$scope.overallTotal = 0;
	$scope.malignantAccuracy = 0;
	$scope.benignAccuracy = 0;
	$scope.trueAccuracy = 0;

	//user data set
	$scope.userDataSet = null;
	//let allObject = {};

	// $scope.calculatePlz = () => {
	// 	let testMePlz = [];
	// 	for (var i = 0; i < randomSetArray.length - 1; i++) {
	// 		let newSet = randomSetArray[i].slice();
	// 		newSet.shift();
	// 		newSet.shift();
	// 		testMePlz.push(newSet);
	// 	}

	// 		//number of clusters, defaults to undefined
	// 	kmeansFactory.clusterMaker.k(2);

	// 	//number of iterations (higher number gives more time to converge), defaults to 1000
	// 	kmeansFactory.clusterMaker.iterations(10000);

	// 	//data from which to identify clusters, defaults to []
	// 	kmeansFactory.clusterMaker.data(testMePlz);
	// 	allObject = kmeansFactory.clusterMaker.clusters();
	// 	console.log("allObject: ", allObject);

	// };

	// $scope.sendAllToFB = () => {
	// 	ResultsStorage.postCompletedResult(allObject, "all");
	// };

let turnToNumbers = (set) => {
		for (var k = 0; k < set.length; k++) {
			let thisSet = set[k];
			for (var i = 0; i < thisSet.length; i++) {
				if (i === 1) {

				} else {
					thisSet[i] = Number(thisSet[i]);
				}
			}
		}
		return set;
	};

	let pullEntireSet = () => {
		randomSetArray = [];
		ResultsStorage.getLocalDataSet().
		then(function(unknown){
			var bigDataDump = unknown.split("\n");
			for (var i = 0; i < bigDataDump.length; i++) {
				var tempArray = bigDataDump[i].split(",");
				randomSetArray.push(tempArray);
			}
		randomSetArray = turnToNumbers(randomSetArray);
		console.log("randomSetArray: ", randomSetArray);
		});

		ResultsStorage.pullWholeSet().
		then(function(results) {
			console.log("resultsfromFB: ", results);
			$scope.realTestCentroid1 = [];
			$scope.realTestCentroid2 = [];
			Object.values(results[0][0].centroid).forEach(function(index){
				$scope.realTestCentroid1.push(index);
			});
			Object.values(results[0][1].centroid).forEach(function(index){
				$scope.realTestCentroid2.push(index);
			});
			
			console.log("results from whole set: ", $scope.realTestCentroid1.length);
		});
	};

	pullEntireSet();

	let concatUserDataSet = () => {
		let userArray = [];
	
		userArray.push($scope.input1);
		userArray.push($scope.input2);
		userArray.push($scope.input3);
		userArray.push($scope.input4);
		userArray.push($scope.input5);
		userArray.push($scope.input6);
		userArray.push($scope.input7);
		userArray.push($scope.input8);
		userArray.push($scope.input9);
		userArray.push($scope.input10);
		userArray.push($scope.input11);
		userArray.push($scope.input12);
		userArray.push($scope.input13);
		userArray.push($scope.input14);
		userArray.push($scope.input15);
		userArray.push($scope.input16);
		userArray.push($scope.input17);
		userArray.push($scope.input18);
		userArray.push($scope.input19);
		userArray.push($scope.input20);
		userArray.push($scope.input21);
		userArray.push($scope.input22);
		userArray.push($scope.input23);
		userArray.push($scope.input24);
		userArray.push($scope.input25);
		userArray.push($scope.input26);
		userArray.push($scope.input27);
		userArray.push($scope.input28);
		userArray.push($scope.input29);
		userArray.push($scope.input30);

		return userArray;
	
	};

	let setValuesForView = () => {
		$scope.input1 = userDataSet[0];
		$scope.input2 = userDataSet[1];
		$scope.input3 = userDataSet[2];
		$scope.input4 = userDataSet[3];
		$scope.input5 = userDataSet[4];
		$scope.input6 = userDataSet[5];
		$scope.input7 = userDataSet[6];
		$scope.input8 = userDataSet[7];
		$scope.input9 = userDataSet[8];
		$scope.input10 = userDataSet[9];
		$scope.input11 = userDataSet[10];
		$scope.input12 = userDataSet[11];
		$scope.input13 = userDataSet[12];
		$scope.input14 = userDataSet[13];
		$scope.input15 = userDataSet[14];
		$scope.input16 = userDataSet[15];
		$scope.input17 = userDataSet[16];
		$scope.input18 = userDataSet[17];
		$scope.input19 = userDataSet[18];
		$scope.input20 = userDataSet[19];
		$scope.input21 = userDataSet[20];
		$scope.input22 = userDataSet[21];
		$scope.input23 = userDataSet[22];
		$scope.input24 = userDataSet[23];
		$scope.input25 = userDataSet[24];
		$scope.input26 = userDataSet[25];
		$scope.input27 = userDataSet[26];
		$scope.input28 = userDataSet[27];
		$scope.input29 = userDataSet[28];
		$scope.input30 = userDataSet[29];
	};

	$scope.generateRandom = () => {
		let rando = Math.floor(Math.random() * 500);
		userDataSet = randomSetArray[rando];
		userDataSet.shift();
		userDataSet.shift();
		setValuesForView();
	};

	$scope.testUserDataSet = (potato) => {
		$('#DataModal').modal('hide');
		if (potato == 5) {
			let rando = Math.floor(Math.random() * 500);
			userDataSet = randomSetArray[rando];
			userDataSet.shift();
			userDataSet.shift();
		} else {
			userDataSet = concatUserDataSet();
		}
		setValuesForView();
		$scope.userAccuracy = "82.64%";
		$scope.userDataSet = userDataSet;
		let disCentroid1 = kmeansFactory.sumOfSquareDiffs($scope.realTestCentroid1, userDataSet);
		let disCentroid2 = kmeansFactory.sumOfSquareDiffs($scope.realTestCentroid2, userDataSet);
		if (disCentroid1 < disCentroid2) {
			$scope.userResults = "Benign";
			console.log("Grouped with Centroid 1");
		} else if (disCentroid2 < disCentroid1) {
			$scope.userResults = "Malignant";
			console.log("Grouped with Centroid 2");
		}
	};

	$scope.pullSetToDisplay = (setNumber) => {
		ResultsStorage.getOneSetBack(setNumber).
		then(function(data) {
			console.log("data for " + data[0].NumberOfSets + ": ", data);
			benignResults1 = data[0].benignResults1;
			benignResults2 = data[0].benignResults2;
			malignantResults1 = data[0].malignantResults1;
			malignantResults2 = data[0].malignantResults2;
			centroids = data[0].centroids;

			$scope.numberOfDataSets = data[0].NumberOfSets;
			$scope.centroid1 = centroids[0].centroid;
			$scope.centroid2 = centroids[1].centroid;

		}).catch(function(error){
			console.log("FireBase hates you! no results sorry :(", error);
			getAltData(setNumber);
		});
	};

	$scope.grabDataSet = () => {
		let startNum = Math.floor(Math.random() * 250);
		let endNum = Math.floor(Math.random() * 250) + 250;
		$scope.numberofTestDataSets = endNum - startNum;
		kmeansTestingFactory.retrieveTestData(startNum, endNum).
		then(function(results){
			testObj.testSet = results.slice();
			console.log("Ready to Test, testSet: ", testObj, testObj.testSet.length);
		});
	};

// not completed, should fire if FB fails
	let getAltData = (setNumber) => {
		ResultsStorage.altGetResults(setNumber).
		then(function(altResults) {
				console.log("Results?: ", altResults, setNumber);
		}).catch(function(error){
			console.log("Error: ", error);
		});
	};

	$scope.accuracyTest = () => {
		$scope.predicted = true;
		let disCen1 = 0;
		let disCen2 = 0;
		$scope.correctMalignant = 0;
		$scope.incorrectMalignant = 0;
		$scope.totalPredictedMalignant = 0;
		$scope.incorrectBenign = 0;
		$scope.correctBenign = 0;
		$scope.totalPredictedBenign = 0;
		$scope.totalTrueMalignant = 0;
		$scope.totalTrueBenign = 0;
		$scope.overallTotal = 0;
		$scope.malignantAccuracy = 0;
		$scope.benignAccuracy = 0;
		$scope.trueAccuracy = 0;

		for (var i = 0; i < testObj.testSet.length; i++){
			disCen1 = kmeansFactory.sumOfSquareDiffs($scope.centroid1, testObj.testSet[i].slice(2, testObj.testSet[i].length));
			disCen2 = kmeansFactory.sumOfSquareDiffs($scope.centroid2, testObj.testSet[i].slice(2, testObj.testSet[i].length));
			if (disCen1 < disCen2) {
				if (testObj.testSet[i][1] === "B"){
					$scope.correctBenign++;
				} else {
					$scope.incorrectBenign++;
				}
			} else if (disCen2 < disCen1) {
				if (testObj.testSet[i][1] === "M"){
					$scope.correctMalignant++;
				} else {
					$scope.incorrectMalignant++;
				}
			}
		}
		$scope.totalPredictedBenign = $scope.incorrectBenign + $scope.correctBenign;
		$scope.totalPredictedMalignant = $scope.incorrectMalignant + $scope.correctMalignant;
		$scope.totalTrueMalignant = $scope.correctMalignant + $scope.incorrectBenign;
		$scope.totalTrueBenign = $scope.incorrectMalignant + $scope.correctBenign;
		$scope.overallTotal = $scope.totalTrueBenign + $scope.totalTrueMalignant;
		$scope.malignantAccuracy = (($scope.correctMalignant / $scope.totalTrueMalignant) * 100).toFixed(2);
		$scope.benignAccuracy = (($scope.correctBenign / $scope.totalTrueBenign) * 100).toFixed(2);
		$scope.trueAccuracy = ((Number($scope.malignantAccuracy) + Number($scope.benignAccuracy)) / 2).toFixed(2);

		console.log("Accuracy ", $scope.trueAccuracy + "%");
		dataArray.push(Number($scope.trueAccuracy));
		$scope.display();
		console.log("dataArray: ", dataArray);
	};

	$scope.display = () => {

		if (dataArray.length > 6) {
			dataArray.shift();
		}

		if (displayed === true) {
			d3.select("svg").remove();
		}
	displayed = true;

	var width = 500;
	var height = 250;

	var padding = 50;

	var xDomain = [0, dataArray.length];

	var yDomain = [50, 100];

	var x = d3.scaleLinear()
						.domain(xDomain)
						.range([0, width]);

	var y = d3.scaleLinear()
						.domain(yDomain)
						.range([height, 0]);


	var canvas = d3.select("#test")
							.append("svg")
							.attr("width", width + padding + 15)
							.attr("height", height + padding * 2)
							.append('g')
							.attr("id", "canvas")
							.attr("transform",
								"translate(" + padding + "," + padding + ")");
					

	var dots = canvas.selectAll("dot")
							.data(dataArray)
							.enter()
								.append("circle")
								.attr("r", 3)
								.attr("cx", function(d, i) { return (i * 100); })
								.attr("cy", function(d) { return y(d); })
								.style("fill", "blue")
								.attr("transform", "translate(2.5, 0)");

	let lineData = [];
for (var i = 0; i < dataArray.length; i++) {
	let newObj = {};
	newObj.x = i * 100;
	newObj.y = dataArray[i];
	lineData.push(newObj);
}


	var lineFunction = d3.line()
											.x(function(d) { return (d.x + 2); })
											.y(function(d) { return y(d.y); });

	var lineGraph = canvas.append("path")
												.attr("d", lineFunction(lineData))
												.attr("stroke", "black")
												.attr("stroke-width", 1)
												.attr("fill", "none");


	var widthAxis = d3.axisBottom()
							.scale(x)
							.ticks(0);
							// .ticks(dataArray.length);

	var heightAxis = d3.axisLeft()
							.scale(y)
							.ticks(5);

	var yDomain = d3.extent([50, 100]);

	var xDomain = d3.extent([(1), (dataArray.length)]);
	//var xDomain = d3.extent([0.5, dataArray.length + 0.5]);


	canvas.append("text")
	        .attr("class", "x label")
	        .attr("text-anchor", "end")
	        .attr("x", width)
	        .attr("y", height + 35)
	        .text("Predictions");

	canvas.append("text")
	        .attr("class", "y label")
	        .attr("text-anchor", "end")
	        .attr("y", - 40)
	        .attr("dy", ".75em")
	        .attr("transform", "rotate(-90)")
	        .text("Accuracy Percentage");

	y.domain(yDomain);
	x.domain(xDomain);

	canvas.append("g")
				.attr("class", "x axis")
				.call(widthAxis)
				.attr("transform", "translate(0," + height + ")");

	canvas.append("g")
				.attr("class", "y axis")
				.call(heightAxis);



   };

  $scope.display();

  $scope.showDataTrained = () => {
  	$scope.dataTrained = true;
  };
  $scope.hideDataTrained = () => {
  	$scope.dataTrained = false;
  };
  $scope.showTestAgainst = () => {
  	$scope.testAgainst = true;
  };
  $scope.hideTestAgainst = () => {
  	$scope.testAgainst = false;
  };
  $scope.showTestAccurracy = () => {
  	$scope.testAccuracy = true;
  };
  $scope.hideTestAccuracy = () => {
  	$scope.testAccuracy = false;
  };
  $scope.showOwnDataSet = () => {
  	$scope.ownDataSet = true;
  };
  $scope.hideOwnDataSet = () => {
  	$scope.ownDataSet = false;
  };
  $scope.showYourDataSet = () => {
  	$scope.yourDataSet = true;
  };
  $scope.hideYourDataSet = () => {
  	$scope.yourDataSet = false;
  };
  $scope.showTestFeatures = () => {
  	$scope.testFeatures = true;
  };
  $scope.hideTestFeatures = () => {
  	$scope.testFeatures = false;
  };

});

