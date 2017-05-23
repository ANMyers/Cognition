"use strict";

app.factory("ResultsStorage", function(FBCredentials, $q, $http) {

	let postCompletedResult = (completedResult, sets) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCredentials.databaseURL}/results/${sets}.json`,
			angular.toJson(completedResult))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let pullWholeSet = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCredentials.databaseURL}/results/all.json`)
			.then((ObjectFromFirebase) => {
				let results = ObjectFromFirebase.data;
				let keys = Object.keys(results);
				let returnMe = [];
				keys.forEach(function(index){
					results[index].id = index;
					returnMe.push(results[index]);
				});
				resolve(returnMe);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getLocalDataSet = () => {
		return $q((resolve, reject) => {
			$.ajax({url: "app/values/wdbc.data"})
			.then(function(data){
				resolve(data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	let getData = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCredentials.databaseURL}/results.json`)
			.then((ObjectFromFirebase) => {
				let results = ObjectFromFirebase.data;
				let keys = Object.keys(results);
				let returnMe = [];
				keys.forEach(function(index){
					results[index].id = index;
					returnMe.push(results[index]);
				});
				resolve(returnMe);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let getOneSetBack = (NumberOfSets) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCredentials.databaseURL}/results/${NumberOfSets}.json`)
			.then((ObjectFromFirebase) => {
				let results = ObjectFromFirebase.data;
				let keys = Object.keys(results);
				let returnMe = [];
				keys.forEach(function(index){
					results[index].id = index;
					returnMe.push(results[index]);
				});
				resolve(returnMe);
			})
			.catch((error) => {
				console.log("Error from ResultsStorage", error);
				reject(error);
			});
		});
	};

	let altGetResults = () => {
		return $q((resolve, reject) => {
			$.ajax({url: "app/values/results/results.json"})
			.then(function(data){
				resolve(data);
			})
			.catch(function(error){
				reject(error);
			});
		});
	};

	return {postCompletedResult, getLocalDataSet, getData, getOneSetBack, altGetResults, pullWholeSet};

});