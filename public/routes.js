var route = angular.module("route", ["ngRoute"]).config(($routeProvider, $locationProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/pages/index.html',
            authenticate: true
        })
        .when('/auth/login', {
            templateUrl: 'app/views/pages/auth/signin.html',
            controller: 'authcontroller',
            controllerAs: 'authctrl',
            authenticate: false
        })
        .when('/auth/signup', {
            templateUrl: 'app/views/pages/auth/signup.html',
            controller: 'authcontroller',
            controllerAs: 'authctrl',
            authenticate: false
        })

        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

route.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next, currentEvent) {
        console.log("route data", next.$$route);
    })
}])