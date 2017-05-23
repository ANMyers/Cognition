"use strict";

app.controller("GeneralCtrl", function($scope, $location, ResultsStorage, kmeansFactory) {




	// $scope.sendDataToFirebase = () => {
	// 	ResultsStorage.postCompletedResult(FinalArray);
	// };


// { centroid: [10.5 , 11], points: [[10, 10], [11, 12]] },
// { centroid: [-9.5, 10.5], points: [[-10, 10], [-9, 11]] },
// { centroid: [0.3333333333333333, 0.3333333333333333], points: [[1, 0], [0, 1], [0, 0]] }

//number of clusters, defaults to undefined
//clusterMaker.k(3);

//number of iterations (higher number gives more time to converge), defaults to 1000
//clusterMaker.iterations(750);

//data from which to identify clusters, defaults to []
//clusterMaker.data([[1, 0], [0, 1], [0, 0], [-10, 10], [-9, 11], [10, 10], [11, 12]]);



});