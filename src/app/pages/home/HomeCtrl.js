(function () {
    'use strict';

    angular.module('swarovski.pages.home')
        .controller('HomeCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($scope, $q, $interval, $http, URL) {

        $(document).ready(function () {
            $('#distpicker').distpicker();
            $('.comment').marquee({
                //speed in milliseconds of the marquee
                duration: 5000,
                //gap in pixels between the tickers
                gap: 0,
                //time in milliseconds before the marquee will start animating
                delayBeforeStart: 0,
                //'left' or 'right'
                direction: 'up',
                //true or false - should the marquee be duplicated to show an effect of continues flow
                duplicated: true
            });
        });

        $scope.payChannel = 'alipay';
        $scope.saving = true;
        $scope.order = {
            productId: '402880895dcc09df015dcc1108ff0005',
            price: 28800
        };
        $scope.duration = {};

        var addMinutes = 38;
        var addSeconds = 36;
        var deadline = Number(localStorage.getItem('deadline')) || moment().add(addMinutes, 'm').add(addSeconds, 's').format("x");
        var currentTime = moment().format("x");//服务器当前时间
        localStorage.setItem('deadline', deadline);

        // $scope.deadline = moment(deadline).local().format("YYYY.MM.DD HH:mm");
        // $scope.deadline = deadline;

        var diffTime = deadline - currentTime;
        var duration = moment.duration(diffTime, 'milliseconds');
        $scope.duration.days = duration.days();
        $scope.duration.hours = duration.hours();
        $scope.duration.minutes = duration.minutes();
        $scope.duration.seconds = duration.seconds();
        var interval = 1000;

        if (diffTime > 0) {

        } else {
            // $scope.isActivityEnded = true;
            deadline = moment().add(addMinutes, 'm').add(addSeconds, 's').format("x");
            localStorage.setItem('deadline', deadline);
        }

        $interval(function () {
            duration = moment.duration(duration - interval, 'milliseconds');

            $scope.duration.days = duration.days();
            $scope.duration.hours = duration.hours();
            $scope.duration.minutes = duration.minutes();
            $scope.duration.seconds = duration.seconds();
            if (duration.asSeconds() < 1) {
                // $interval.cancel(intervalObj);
                // $scope.isActivityEnded = true;
                deadline = moment().add(addMinutes, 'm').add(addSeconds, 's').format("x");
                localStorage.setItem('deadline', deadline);
                currentTime = moment().format("x");
                duration = moment.duration(deadline - currentTime, 'milliseconds');
                $scope.duration.days = duration.days();
                $scope.duration.hours = duration.hours();
                $scope.duration.minutes = duration.minutes();
                $scope.duration.seconds = duration.seconds();
            }
        }, interval);


        $scope.selectProduct = function (productId, price) {
            $scope.order.productId = productId;
            $scope.order.price = price;
        };

        $scope.formValitate = function (field) {
            return $scope.order[field] !== undefined;
        }

        $scope.updateForm = function () {
            console.log($('#district'));
            $scope.order.province = $('#province').val() || undefined;
            $scope.order.city = $('#city').val() || undefined;
            $scope.order.county = $('#district').val() || undefined;
        };

        $scope.backTop = function () {
            $('html, body').animate({scrollTop: 0}, {duration: 1200});
        };

        $scope.scrollToOrder = function () {
            $('html, body').scrollTo($('#order-section'), {duration: 1200});

        };

        $scope.save = function (form) {

            $scope.order.province = $('#province').val() || undefined;
            $scope.order.city = $('#city').val() || undefined;
            $scope.order.county = $('#district').val() || undefined;

            var hasError = false;
            form.$setSubmitted();
            angular.forEach(form.$error.required, function (field) {
                field.$setDirty();
            });
            if (form.$invalid) {
                hasError = true;
            }

            if (hasError) {
                return $q(function (resolve, reject) {
                    reject();
                });
            }

            $scope.saving = true;

            $scope.order.amount = $scope.order.price;
            $scope.order.numbers = 1;
            $scope.order.payType = 'PayOnDelivery';

            console.log($scope.order);

            $http.post(URL.get(URL.ORDERS), $scope.order).then(function (response) {
                alert('下单成功！')
                $scope.order = {
                    productId: '402880895dcc09df015dcc1108ff0005',
                    price: 28800
                };
                form.$setPristine();
            }, function (response) {
                console.log(response);
                alert('下单失败，请稍后重试')
            });


        };
    }

})();
