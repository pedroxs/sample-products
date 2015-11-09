'use strict';

angular.module('productsApp').controller('ProductDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Product', 'Category',
        function($scope, $stateParams, $modalInstance, entity, Product, Category) {

        $scope.product = entity;
        $scope.categories = Category.query();
        $scope.load = function(id) {
            Product.get({id : id}, function(result) {
                $scope.product = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('productsApp:productUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.product.id != null) {
                Product.update($scope.product, onSaveFinished);
            } else {
                Product.save($scope.product, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
