'use strict';

angular.module('productsApp')
    .controller('CategoryDetailController', function ($scope, $rootScope, $stateParams, entity, Category, Product) {
        $scope.category = entity;
        $scope.load = function (id) {
            Category.get({id: id}, function(result) {
                $scope.category = result;
            });
        };
        var unsubscribe = $rootScope.$on('productsApp:categoryUpdate', function(event, result) {
            $scope.category = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
