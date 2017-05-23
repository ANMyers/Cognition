"use strict";

app.factory("kmeansTestingFactory", function(kmeansFactory, ResultsStorage, $q) {

	let centroids = [];
	let dataSet = 100;

	let testArray = [];
	let finalArray = [];
	let benign = 0;
	let malignant = 0;

	let malignantArray = [];
	let benignArray = [];

	let benRightAnswer1 = 0;
	let benRightAnswer2 = 0;

	let benignResults1 = [];
	let benignResults2 = [];

	let malRightAnswer1 = 0;
	let malRightAnswer2 = 0;

	let malignantResults1 = [];
	let malignantResults2 = [];

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

	let setDataSetNumber = (Numbo) => {
		dataSet = Numbo;
		console.log("How Many Sets of Data: ", dataSet);
	};

	let pullFBToTest = () => {
		ResultsStorage.getData().
		then(function(data) {
			console.log("data: ", data);
			let benignSet = turnToNumbers(data[0].benign);
			let malignantSet = turnToNumbers(data[0].malignant);
			benignArray = benignSet;
			malignantArray = malignantSet;
			centroids = data[0].centroids;
		});
	};

	let retrieveData = () => {
		finalArray = [];
		ResultsStorage.getLocalDataSet().
		then(function(unknown){
			var bigDataDump = unknown.split("\n");
			for (var i = 0; i < bigDataDump.length; i++) {
				var tempArray = bigDataDump[i].split(",");
				finalArray.push(tempArray);
			}
		finalArray = turnToNumbers(finalArray);
		console.log("finalArray: ", finalArray);
		});
		console.log("You have your data, Number of sets to test: ", dataSet);
	};

	let retrieveTestData = (startNum, endNum) => {
		return $q((resolve, reject) => {
			finalArray = [];
			ResultsStorage.getLocalDataSet().
			then(function(unknown){
				var bigDataDump = unknown.split("\n");
				for (var i = startNum; i < endNum; i++) {
					var tempArray = bigDataDump[i].split(",");
					finalArray.push(tempArray);
				}
			finalArray = turnToNumbers(finalArray);
			resolve(finalArray);
			});
		});
	};

	let makeCluster = () => {

	testArray = [];
	for (var i = 0; i < dataSet; i++) {
		let newSet = finalArray[i].slice();
		newSet.shift();
		newSet.shift();
		testArray.push(newSet);
	}

		//number of clusters, defaults to undefined
	kmeansFactory.clusterMaker.k(2);

	//number of iterations (higher number gives more time to converge), defaults to 1000
	kmeansFactory.clusterMaker.iterations(5000);

	//data from which to identify clusters, defaults to []
	kmeansFactory.clusterMaker.data(testArray);
	let numberOfDataSets = testArray.length;
	centroids = kmeansFactory.clusterMaker.clusters();
	console.log("centroids: ", centroids);
	let centroid1 = centroids[0].centroid;
	let centroid2 = centroids[1].centroid;

	};

	let sendDataToFirebase = () => {
		let results = {
			centroids: centroids,
			malignantResults1: malignantResults1,
			malignantResults2: malignantResults2,
			benignResults1: benignResults1,
			benignResults2: benignResults2,
			NumberOfSets: dataSet
		};
		ResultsStorage.postCompletedResult(results, dataSet);
		console.log("results: ", results, dataSet);
	};

	let seperateArrays = () => {
		malignantArray = [];
		benignArray = [];
		for (var i = 0; i < dataSet; i++) {
			let currentSet = finalArray[i];
			if (currentSet[1] === "M") {
				malignantArray.push(currentSet);
			} else if (currentSet[1] === "B") {
				benignArray.push(currentSet);
			}
		}

		console.log("You seperated the arrays", malignantArray.length, benignArray.length);
	};

	let benignAccuracy = () => {

		benRightAnswer1 = 0;
		benRightAnswer2 = 0;
		benignResults1 = [];
		benignResults2= [];

		for (var i = 0; i < centroids[0].points.length; i++) {
			for (var k = 0; k < benignArray.length; k++) {
				if (centroids[0].points[i][0] == benignArray[k][2] &&
						centroids[0].points[i][1] == benignArray[k][3] &&
						centroids[0].points[i][2] == benignArray[k][4] &&
						centroids[0].points[i][3] == benignArray[k][5] &&
						centroids[0].points[i][4] == benignArray[k][6] &&
						centroids[0].points[i][5] == benignArray[k][7] &&
						centroids[0].points[i][6] == benignArray[k][8] &&
						centroids[0].points[i][7] == benignArray[k][9] &&
						centroids[0].points[i][8] == benignArray[k][10] &&
						centroids[0].points[i][9] == benignArray[k][11] &&
						centroids[0].points[i][10] == benignArray[k][12] &&
						centroids[0].points[i][11] == benignArray[k][13] &&
						centroids[0].points[i][12] == benignArray[k][14] &&
						centroids[0].points[i][13] == benignArray[k][15] &&
						centroids[0].points[i][14] == benignArray[k][16] &&
						centroids[0].points[i][15] == benignArray[k][17] &&
						centroids[0].points[i][16] == benignArray[k][18] &&
						centroids[0].points[i][17] == benignArray[k][19] &&
						centroids[0].points[i][18] == benignArray[k][20] &&
						centroids[0].points[i][19] == benignArray[k][21] &&
						centroids[0].points[i][20] == benignArray[k][22] &&
						centroids[0].points[i][21] == benignArray[k][23] &&
						centroids[0].points[i][22] == benignArray[k][24] &&
						centroids[0].points[i][23] == benignArray[k][25] &&
						centroids[0].points[i][24] == benignArray[k][26] &&
						centroids[0].points[i][25] == benignArray[k][27] &&
						centroids[0].points[i][26] == benignArray[k][28] &&
						centroids[0].points[i][27] == benignArray[k][29] &&
						centroids[0].points[i][28] == benignArray[k][30] &&
						centroids[0].points[i][29] == benignArray[k][31]) {

						let benignSet = benignArray[k].slice();
						benignSet.push("Centroid 1");
						benignResults1.push(benignSet);
						benRightAnswer1++;
				}
			}
		}
		console.log("Datasets: " + dataSet + ", Centroid 1 for Benign", benRightAnswer1);

		for (var q = 0; q < centroids[1].points.length; q++) {
			for (var s = 0; s < benignArray.length; s++) {
				if (centroids[1].points[q][0] == benignArray[s][2] &&
						centroids[1].points[q][1] == benignArray[s][3] &&
						centroids[1].points[q][2] == benignArray[s][4] &&
						centroids[1].points[q][3] == benignArray[s][5] &&
						centroids[1].points[q][4] == benignArray[s][6] &&
						centroids[1].points[q][5] == benignArray[s][7] &&
						centroids[1].points[q][6] == benignArray[s][8] &&
						centroids[1].points[q][7] == benignArray[s][9] &&
						centroids[1].points[q][8] == benignArray[s][10] &&
						centroids[1].points[q][9] == benignArray[s][11] &&
						centroids[1].points[q][10] == benignArray[s][12] &&
						centroids[1].points[q][11] == benignArray[s][13] &&
						centroids[1].points[q][12] == benignArray[s][14] &&
						centroids[1].points[q][13] == benignArray[s][15] &&
						centroids[1].points[q][14] == benignArray[s][16] &&
						centroids[1].points[q][15] == benignArray[s][17] &&
						centroids[1].points[q][16] == benignArray[s][18] &&
						centroids[1].points[q][17] == benignArray[s][19] &&
						centroids[1].points[q][18] == benignArray[s][20] &&
						centroids[1].points[q][19] == benignArray[s][21] &&
						centroids[1].points[q][20] == benignArray[s][22] &&
						centroids[1].points[q][21] == benignArray[s][23] &&
						centroids[1].points[q][22] == benignArray[s][24] &&
						centroids[1].points[q][23] == benignArray[s][25] &&
						centroids[1].points[q][24] == benignArray[s][26] &&
						centroids[1].points[q][25] == benignArray[s][27] &&
						centroids[1].points[q][26] == benignArray[s][28] &&
						centroids[1].points[q][27] == benignArray[s][29] &&
						centroids[1].points[q][28] == benignArray[s][30] &&
						centroids[1].points[q][29] == benignArray[s][31]) {

						let benignSet = benignArray[s].slice();
						benignSet.push("Centroid 2");
						benignResults2.push(benignSet);
						benRightAnswer2++;
				}
			}
		}
		console.log( "Datasets: " + dataSet + ", Centroid 2 for Benign", benRightAnswer2);


	};

	let malignantAccuracy = () => {

		malRightAnswer1 = 0;
		malRightAnswer2 = 0;
		malignantResults1 = [];
		malignantResults2 = [];
		
		for (var i = 0; i < centroids[0].points.length; i++) {
			for (var k = 0; k < malignantArray.length; k++) {
				if (centroids[0].points[i][0] == malignantArray[k][2] &&
						centroids[0].points[i][1] == malignantArray[k][3] &&
						centroids[0].points[i][2] == malignantArray[k][4] &&
						centroids[0].points[i][3] == malignantArray[k][5] &&
						centroids[0].points[i][4] == malignantArray[k][6] &&
						centroids[0].points[i][5] == malignantArray[k][7] &&
						centroids[0].points[i][6] == malignantArray[k][8] &&
						centroids[0].points[i][7] == malignantArray[k][9] &&
						centroids[0].points[i][8] == malignantArray[k][10] &&
						centroids[0].points[i][9] == malignantArray[k][11] &&
						centroids[0].points[i][10] == malignantArray[k][12] &&
						centroids[0].points[i][11] == malignantArray[k][13] &&
						centroids[0].points[i][12] == malignantArray[k][14] &&
						centroids[0].points[i][13] == malignantArray[k][15] &&
						centroids[0].points[i][14] == malignantArray[k][16] &&
						centroids[0].points[i][15] == malignantArray[k][17] &&
						centroids[0].points[i][16] == malignantArray[k][18] &&
						centroids[0].points[i][17] == malignantArray[k][19] &&
						centroids[0].points[i][18] == malignantArray[k][20] &&
						centroids[0].points[i][19] == malignantArray[k][21] &&
						centroids[0].points[i][20] == malignantArray[k][22] &&
						centroids[0].points[i][21] == malignantArray[k][23] &&
						centroids[0].points[i][22] == malignantArray[k][24] &&
						centroids[0].points[i][23] == malignantArray[k][25] &&
						centroids[0].points[i][24] == malignantArray[k][26] &&
						centroids[0].points[i][25] == malignantArray[k][27] &&
						centroids[0].points[i][26] == malignantArray[k][28] &&
						centroids[0].points[i][27] == malignantArray[k][29] &&
						centroids[0].points[i][28] == malignantArray[k][30] &&
						centroids[0].points[i][29] == malignantArray[k][31]) {

						let malignantSet = malignantArray[k].slice();
						malignantSet.push("Centroid 1");
						malignantResults1.push(malignantSet);
						malRightAnswer1++;
				}
			}
		}
		console.log("Datasets: " + dataSet + ", Centroid 1 for Malignant", malRightAnswer1);

		for (var l = 0; l < centroids[1].points.length; l++) {
			for (var p = 0; p < malignantArray.length; p++) {
				if (centroids[1].points[l][0] == malignantArray[p][2] &&
						centroids[1].points[l][1] == malignantArray[p][3] &&
						centroids[1].points[l][2] == malignantArray[p][4] &&
						centroids[1].points[l][3] == malignantArray[p][5] &&
						centroids[1].points[l][4] == malignantArray[p][6] &&
						centroids[1].points[l][5] == malignantArray[p][7] &&
						centroids[1].points[l][6] == malignantArray[p][8] &&
						centroids[1].points[l][7] == malignantArray[p][9] &&
						centroids[1].points[l][8] == malignantArray[p][10] &&
						centroids[1].points[l][9] == malignantArray[p][11] &&
						centroids[1].points[l][10] == malignantArray[p][12] &&
						centroids[1].points[l][11] == malignantArray[p][13] &&
						centroids[1].points[l][12] == malignantArray[p][14] &&
						centroids[1].points[l][13] == malignantArray[p][15] &&
						centroids[1].points[l][14] == malignantArray[p][16] &&
						centroids[1].points[l][15] == malignantArray[p][17] &&
						centroids[1].points[l][16] == malignantArray[p][18] &&
						centroids[1].points[l][17] == malignantArray[p][19] &&
						centroids[1].points[l][18] == malignantArray[p][20] &&
						centroids[1].points[l][19] == malignantArray[p][21] &&
						centroids[1].points[l][20] == malignantArray[p][22] &&
						centroids[1].points[l][21] == malignantArray[p][23] &&
						centroids[1].points[l][22] == malignantArray[p][24] &&
						centroids[1].points[l][23] == malignantArray[p][25] &&
						centroids[1].points[l][24] == malignantArray[p][26] &&
						centroids[1].points[l][25] == malignantArray[p][27] &&
						centroids[1].points[l][26] == malignantArray[p][28] &&
						centroids[1].points[l][27] == malignantArray[p][29] &&
						centroids[1].points[l][28] == malignantArray[p][30] &&
						centroids[1].points[l][29] == malignantArray[p][31]) {

						let malignantSet = malignantArray[p].slice();
						malignantSet.push("Centroid 2");
						malignantResults2.push(malignantSet);
						malRightAnswer2++;
				}
			}
		}
		console.log("Datasets: " + dataSet + ", Centroid 2 for Malignant", malRightAnswer2);

	};

	let count = () => {

		let answerArray = [];
		malignant = [];
		benign = [];
		for (var i = 0; i < dataSet; i++) {
			let newSet = finalArray[i];
			let answer = newSet[1];
			answerArray.push(answer);
		}

		for (var d = 0; d < answerArray.length; d++) {
			if (answerArray[d] === "M") {
				malignant++;
			} else if (answerArray[d] === "B") {
				benign++;
			}
		}
		console.log("Malignant Count: ", malignant);
		console.log("Benign Count: ", benign);
	};

return {setDataSetNumber, pullFBToTest, retrieveData, makeCluster,
	seperateArrays, sendDataToFirebase, benignAccuracy, malignantAccuracy, count, retrieveTestData};
});