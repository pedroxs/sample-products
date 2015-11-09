/* globals $ */
'use strict';

angular.module('productsApp')
    .directive('productsAppPagination', function() {
        return {
            templateUrl: 'scripts/components/form/pagination.html'
        };
    });
