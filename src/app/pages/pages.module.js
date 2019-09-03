/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('swarovski.pages', [
        'ui.router',
        'swarovski.pages.home'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }

})();
