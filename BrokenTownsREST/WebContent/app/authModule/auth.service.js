angular.module('authModule')
  .factory('authService', function($http, $cookies, $rootScope) {
    var service = {};

    var saveToken = function(user) {
    		$cookies.put('uid', user.id)
    		$cookies.put('email', user.email)
    }

    service.getToken = function() {
    		return {
    			id : $cookies.get("uid"),
    			email : $cookies.get("email")
    		}
    }

    var removeToken = function() {
    		$cookies.remove('uid');
		$cookies.remove('email');
    }

    service.login = function(user) {
    		return $http({
    			method : 'POST',
    			url : 'api/auth/login',
    			headers : {
    				'Content-Type' : 'application/json'
    			},
    			data : user
    		})
    		.then(function(res) {
    			saveToken(res.data);
    			$rootScope.$broadcast('loggedIn', {
    				user : res.data
    			})
    			return res;
    		})
    		.catch(console.error);
    }

    service.register = function(user) {
		return $http({
			method : 'POST',
			url : 'api/auth/register',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : user
		})
		.then(function(res) {
			saveToken(res.data);
			return res;
		})
		.catch(console.error);
    }

    service.logout = function() {
    		return $http({
    			method : 'POST',
    			url : 'api/auth/logout'
    		})
    		.then(function(res) {
    			removeToken();
    			return res;
    		})
    		.catch(console.error);
    }

    return service;
})