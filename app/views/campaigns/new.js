/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').controller('campaignsNewCtrl', function($scope, $state, CampaignService, MenuService) {
    MenuService.currentTitle = 'New';
    $scope.campaign = {
        name: "",
    };


    $scope.goBack = function () {
        $state.go('app.campaigns.menu');
    };

    $scope.newCampaign = function (data) {
        CampaignService.create(data.name)
            .then(function (success) {
                console.log(success);
                $state.go('app.campaigns.menu');
            }, function (err) {
                console.log(err);
            });
    }
});