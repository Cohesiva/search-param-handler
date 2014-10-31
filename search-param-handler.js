'use strict';

angular.module('cohesiva.searchParamHandler', [])
    .factory('SearchParamHandler', ['$window', '$location',
        function($window, $location) {
            function SearchParamHandler(params) {
                var that = this;
                var hasDefinedState = false;
                this.params = params;

                function execCallback(value) {
                    params.callback(value);
                    hasDefinedState = true;
                }

                this.params.scope.$watch(function() {
                    return $location.search()[that.params.name];
                }, function(newSearchParamValue, oldSearchParamValue) {

                    if ($window.angular.isDefined(newSearchParamValue) &&
                        that.params.allowedValues.indexOf(newSearchParamValue) === -1) {
                        if (hasDefinedState) {
                            $location.search(that.params.name, $window.angular.isUndefined(oldSearchParamValue) ? null : oldSearchParamValue);
                            return;
                        }
                        $location.search(that.params.name, null);
                        return;
                    }

                    execCallback(newSearchParamValue);

                });

            }

            SearchParamHandler.prototype.setSearchParam = function(searchParamValue) {

                if (searchParamValue !== null &&
                    this.params.allowedValues.indexOf(searchParamValue) === -1) {
                    return;
                }

                $location.search(this.params.name, searchParamValue);

            };

            return SearchParamHandler;
        }
    ]);
