/**
 * Created by lelabo on 15/06/17.
 */
angular.module('gurps-online').directive('attributesCatalog', function ($timeout, $mdDialog) {
    return {
        scope: {
            placeholder: "@",
            index: "=",
            variables: "=",
            path: "@",
            edit: "=",
            add: "=",
        },
        templateUrl: "directives/attributes-catalog/attributes-catalog.html",
        restrict: 'E',
        transclude: true,
        link: function($scope) {
            $scope.showInfo = function (template, ev) {
                $mdDialog.show({
                    controller: InfoController,
                    templateUrl: template,
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    targetEvent: ev
                });
            };
            if ($scope.variables === undefined) {
                $scope.$watch('variables', function (data) {
                    if (data !== undefined) {
                        $scope.catalogs = loadAll(data);
                    }
                });
            } else {
                $scope.catalogs = loadAll($scope.variables);
            }

            $scope.Search = function(query) {
                var results = query ? $scope.catalogs.filter( createFilterFor(query) ) : $scope.catalogs, deferred;
                return results;
            };
            $scope.selectedChange = function(item) {
                $scope.itemChanging = true;
                if (item == undefined) {
                    document.getElementsByTagName('md-virtual-repeat-container')[$scope.index].style.cssText  = $scope.style ;
                } else {
                    $scope.style = document.getElementsByTagName('md-virtual-repeat-container')[$scope.index].style.cssText ;
                    document.getElementsByTagName('md-virtual-repeat-container')[$scope.index].removeAttribute("style");
                }
            };
            $scope.exitInput = function() {
                $scope.itemChanging = false;
                $timeout(function () {
                    if (!$scope.itemChanging) {
                        document.getElementsByTagName('md-virtual-repeat-container')[$scope.index].removeAttribute("style");
                    }
                }, 150);
            };


            function loadAll(content) {
                var objs = content;
                return objs.map( function (objs) {
                    objs.value = objs.name.toLowerCase();
                    return objs;
                });
            }

            function createFilterFor (query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                    return (item.value.indexOf(lowercaseQuery) === 0);
                };
            }

            $scope.addFunction = function (text) {
                if (text) {
                    $scope.add(text);
                }
            }
        }
    };
});

function InfoController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}