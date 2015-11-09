'use strict';

angular.module('productsApp')
    .controller('ProductController', function ($scope, Product, ProductSearch, ParseLinks) {
        $scope.sort = {
            attribute: '',
            direction: '',
            build: function () {
                return this.attribute === ''
                    ? ''
                    : this.attribute + ',' + this.direction;
            }
        };
        $scope.products = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Product.query({page: $scope.page, size: 20, sort: $scope.sort.build()}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.products = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Product.get({id: id}, function(result) {
                $scope.product = result;
                $('#deleteProductConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Product.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteProductConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            ProductSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.products = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.product = {
                name: null,
                description: null,
                price: null,
                available: null,
                id: null
            };
        };

        $scope.sortBy = function (attribute, direction) {
            $scope.sort.attribute = attribute;
            $scope.sort.direction = direction;
            $scope.loadAll();
        };
    });
