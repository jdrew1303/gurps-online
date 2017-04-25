/**
 * Created by lelabo on 20/04/17.
 */
angular.module('gurps-online').controller('charactersMenuCtrl', function($scope, $timeout, Characters) {

    var self = this;
        self.isOpen = false;

    $scope.$watch('vm.isOpen', function(isOpen) {
        if (isOpen) {
            $timeout(function() {
                $scope.tooltipVisible = self.isOpen;
            }, 600);
        } else {
            $scope.tooltipVisible = self.isOpen;
        }
    });


    $scope.characters = [
        new Characters(null, "MARC LE LABOURIER", 100),
        new Characters(null, "XAVIER SOMNIER", 50)

    ];
});