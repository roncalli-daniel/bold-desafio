/***
 * Routes of the application
 */
App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'blockUIConfig',
    function($stateProvider, $urlRouterProvider, $httpProvider, blockUIConfig) {

        blockUIConfig.message = 'Aguarde...';
        blockUIConfig.autoBlock = true;
        // blockUIConfig.delay = 500;

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('start', {
                url: '/',
                templateUrl: './scripts/views/home/index.html',
                controller: "HomeCtrl",
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'app',
                            files: [
                                './scripts/controllers/home.js',
                                './scripts/services/app_api.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('sobre', {
                url: '/sobre',
                templateUrl: './scripts/views/sobre/index.html'
            })
            .state('error', {
                url: '/error',
                controller: "ErrorCtrl",
                controllerAs: 'vm',
                templateUrl: './scripts/views/error/index.html',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                            name: 'app',
                            files: [
                                './scripts/services/app_api.js'
                            ]
                        }]);
                    }]
                }
            });

        $httpProvider.interceptors.push('responseObserver');
    }]);
