angular.module('appModule').component(
		'home',
		{
			templateUrl : 'app/appModule/home.component.html',
			controller : function($interval, $location, authService, municipalityService) {
				var vm = this;

				vm.advertisingArray = [ "Report It!", "Get It Fixed!",
						"Keep Track Of Problems!",
						"One Problem, One Text, One Solution!" ];

				vm.checkLogin = function() {
					if (authService.getToken().id) {
						return true;
						console.log("inside of check login: " + vm.showLogin);
					}
					return false;
				}

				var idx = 0;
				vm.selected = "";

				$interval(function() {
					if(vm.checkLogin() === false) {
						vm.selected = vm.advertisingArray[idx];
						idx++;
						
						if(idx == vm.advertisingArray.length) {
							idx = 0;
							
						}
					}
				},

// The below sets the timeout, the first number is the interval, the second
// number is how many times it fires
				1200, 70

				);
				
				// Login Stuff
				vm.loginErrors = [];
				
				vm.showLoginForm = true;
				
				vm.changeLoginFormToFalse = function () {
					vm.showLoginForm = false;
				}
				
				vm.changeLoginFormToTrue = function() {
					vm.showLoginForm = true;
				}
				
				
				vm.login = function(user) {
					vm.loginErrors = [];
					console.log(user);
					authService.login(user)
						.then(function(res) {
							console.log(res.data);
							if(!res.data.municipalityId) {
							$location.path('/user');
							console.log("You are not a municipality");
							return true;
							} else if(res.data.municipalityId) {
								$location.path('/municipality');
								console.log("You are a municipality");
								return true;
							}
				
						})
						.catch();
					     vm.loginErrors.push("Your email and/or password is incorrect. Please Try Again");
						return vm.loginErrors;
				}
				
				vm.invalid = function(user) {
					if (!user) return true;
					if (!user.email || !user.password || !user.confirm) return true;
					return false;
				}
				
// Registration Stuff
				
				vm.showRegistrationForm = true;
				
				vm.changeRegistrationFormToFalse = function () {
					vm.showRegistrationForm = false;
				}
				
				vm.changeRegistrationFormToTrue = function() {
					vm.showRegistrationForm = true;
				}
				
				vm.registerMunicAndCreateUser = function(municipality, user) {
					municipalityService.create(municipality)
						.then(function(res) {
							console.log("Municipality Created HOORAY HOOOORAAAAAYYY	");
							console.log(res.data);
							user.municipalityId = res.data.id;
							vm.errors = [];
							console.log("AFTER MUNICIPALITY CREATED, USER: ");
							console.log(user);
							
							var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
							
							if(!user.firstName) {
								vm.errors.push("You must have a first name");
							}
							
							if(!user.lastName) {
								vm.errors.push("You must have a last name");
							}
							
							
							if (!re.test(user.email)) {
								vm.errors.push("Your email is not an email");
							}
							if (!user.password || user.password.length < 6) {
								vm.errors.push("You must include a password, of at least 6 characters")
							}
							if (user.password !== user.confirm) {
								vm.errors.push("Your passwords do not match");
							}
							
							if (vm.errors.length > 0) {
								return;
							}
							
							delete user.confirm;
							
							authService.register(user)
							.then(function(res) {
								$location.path('/municipality');
								console.log("CREATED USER: vvvvvvv");
								console.log(res.data);
							})
							.catch(console.error)
						})
						.catch(function(err) {
							console.log(err);
						})
				}
				
				vm.register = function(user) {
					vm.errors = [];
					console.log(user);
					
					var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					
					if(!user.firstName) {
						vm.errors.push("You must have a first name");
					}
					
					if(!user.lastName) {
						vm.errors.push("You must have a last name");
					}
					
					
					if (!re.test(user.email)) {
						vm.errors.push("Your email is not an email");
					}
					if (!user.password || user.password.length < 6) {
						vm.errors.push("You must include a password, of at least 6 characters")
					}
					if (user.password !== user.confirm) {
						vm.errors.push("Your passwords do not match");
					}
					
					if (vm.errors.length > 0) {
						return;
					}
					
					delete user.confirm;
					
					authService.register(user)
					.then(function(res) {
						$location.path('/user');
						console.log("CREATED USER: vvvvvvv");
						console.log(res.data);
					})
					.catch(console.error)
				}
				
				
					
				
				vm.cancelButtonPressed = function() {
					vm.errors = null;
				}
				
				console.log("home component");
			},
			controllerAs : 'vm'
		})