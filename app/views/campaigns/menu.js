/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').controller('campaignsMenuCtrl', function($scope, $state, $timeout, CampaignService,
                                                                        Campaigns, MenuService) {

    MenuService.currentTitle = 'Campaigns';
    $scope.canDelete = false;

    $scope.campaigns = null;
    $scope.loadCampaigns = function () {
        CampaignService.userCampaigns().then(function (success) {
            $scope.campaigns = Campaigns.json_to_objects(success);
            console.log($scope.campaigns);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.loadCampaigns();

    $scope.goToNew = function () {
        $state.go('app.campaigns.new');
    };
    $scope.goToProfile = function (campaign) {
        $state.go('app.campaigns.profile', {'campaignId': campaign._id});
    };

    $scope.deleteCampaign = function (campaign) {
        CampaignService.remove(campaign._id).then(function (resp) {
            $scope.loadCampaigns();
        });
    };


});