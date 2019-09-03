(function () {
    'use strict';

    angular.module('swarovski')
        .factory('URL', URL);

    /** @ngInject */
    function URL($filter) {

        var url = {};

        url.get = function (data) {
            return url.service_url + data;
        };

        url.assemble = function () {
            if (arguments.length === 0) {
                return;
            }
            arguments[0] = url.get(arguments[0]);
            var args = Array.prototype.slice.call(arguments, 1);
            return $filter('stringular').apply(this, [].slice.call(arguments));
        };

        url.SERVER_ADDRESS = 'http://112.74.135.70:21314/';
        url.service_url = url.SERVER_ADDRESS;

        url.ORDERS = 'chaplet';

        return url;
    }

})();