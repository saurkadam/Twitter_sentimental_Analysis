var app = angular.module('app', ['ngRoute']);


app.config([ '$routeProvider', '$locationProvider','$httpProvider',
    function($routeProvider, $locationProvider,$httpProvider) {

    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
       $routeProvider.when('/dashboard', {
            templateUrl : '../templates/MainPage.html',
            controller : 'HomeController'
        });
        $routeProvider.when('/', {
            templateUrl : '../templates/LoginPage.html',
            controller : 'LoginController'
        }).otherwise({
            redirectTo : '/'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
