'use strict';

angular.module('productsApp')
    .controller('ProductDetailController', function ($scope, $rootScope, $stateParams, entity, Product, Category) {
        $scope.product = entity;
        $scope.load = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
            });
        };
        var unsubscribe = $rootScope.$on('productsApp:productUpdate', function(event, result) {
            $scope.product = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
