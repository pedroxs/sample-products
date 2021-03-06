'use strict';

angular.module('productsApp')
    .controller('CategoryController', function ($scope, Category, CategorySearch, ParseLinks) {
        $scope.categories = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Category.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.categories = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Category.get({id: id}, function(result) {
                $scope.category = result;
                $('#deleteCategoryConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Category.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCategoryConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            CategorySearch.query({query: $scope.searchQuery}, function(result) {
                $scope.categories = result;
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
            $scope.category = {
                name: null,
                id: null
            };
        };
    });
