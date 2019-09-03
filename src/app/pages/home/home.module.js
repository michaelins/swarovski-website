(function () {
    'use strict';

    angular.module('swarovski.pages.home', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'frame': {
                        templateUrl: 'app/pages/frame.html'
                    },
                    'content@home': {
                        templateUrl: 'app/pages/home/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            });
    }

})();
