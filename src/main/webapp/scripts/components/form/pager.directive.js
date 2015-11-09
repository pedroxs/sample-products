/* globals $ */
'use strict';

angular.module('productsApp')
    .directive('productsAppPager', function() {
        return {
            templateUrl: 'scripts/components/form/pager.html'
        };
    });
