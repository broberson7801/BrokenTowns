angular.module('appModule')
	.component('search', {
		templateUrl  :  "app/appModule/search.component.html",
		controller   : function(caseItemService, authService, NgMap, $scope) {
			var vm = this;
			
			vm.map = null;
			
			var userId = authService.getToken().id;
			
			vm.searchResults = [];
			
			vm.loadAllCases = function() {
				caseItemService.index()
					.then(function(res) {
						vm.searchResults = res.data;
					});
			}
			vm.loadAllCases();
			
			vm.selected = null;
			
			vm.create = function(newCase) {
				newCase.userId = userId;
				console.log(newCase.userId);
				caseItemService.create(newCase)
					.then(function() {
						vm.loadAllCases();
					})
			}
			
			vm.setSeverityColor = function() {
				if (vm.selected !=null) {
					var severe = vm.selected.severity;
					if (severe == 5) {
						return "red";
					} else if (severe == 4) {
						return "orange";
					} else if (severe == 3) {
						return "yellow";
					} else if (severe == 2) {
						return "yellow-green";
					} else if (severe == 1) {
						return "green";
					}
				}
			}
			
			vm.mapKey = "AIzaSyAM7sMRVwpJLTHY4KScoaPnpnjlZDRH3xg";

			vm.applySelected = function(caseItem) {
				vm.selected = caseItem;
				NgMap.getMap("map").then(
						function(map) {
							vm.map = map;
							google.maps.event.trigger(vm.map, "resize");
							vm.map.setCenter(new google.maps.LatLng(
									vm.selected.latitude,vm.selected.longitude
//									20.68177501,-103.3514794
									));
							vm.map.setZoom(15);
						});
				// .then(function(map){
				// google.maps.event.trigger(map, "resize");
				// map.setCenter(new google.maps.LatLng(20.68177501,
				// -103.3514794))
				// console.log(map.getCenter());
				//					
				// })
				// .catch(console.error);
				console.log("BANANANANAANANA")
			}
			
			vm.getLocation = function() {
				NgMap.getMap("createMap").then(
						function(map) {
							vm.map = map;
							google.maps.event.trigger(vm.map, "resize");
							vm.map.setCenter(navigator.geolocation.getCurrentPosition(function(position){
								console.log(position);
								position.latitude,position.longitude;
									}
									));
							vm.map.setZoom(15);
						});
			}
			
			vm.addMarker = function() {
				google.maps.event.addListener(vm.map, 'click', function(event) {
					placeMarker(event.latLng);
				});
				var marker;
				function placeMarker(location) {
					if (marker) {
						marker.setPosition(location);
					} else {
					
						marker = new google.maps.Marker({
						position: location,
						map: vm.map,
						animation: google.maps.Animation.DROP
					});
					}
					vm.map.setCenter(location);
			}

			}

			
			
		},
		controllerAs : "vm"
	})