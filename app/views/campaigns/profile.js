/**
 * Created by lelabo on 02/05/17.
 */
angular.module('gurps-online').controller('campaignsProfileCtrl', function($scope, $state, $stateParams,
                                                                           CampaignService, Campaigns,
                                                                           CharactersService, Characters,
                                                                           MenuService) {
    function loadCampaign() {
        CampaignService.get($stateParams.campaignId).then(function (campaign) {
            $scope.campaign = Campaigns.build(campaign);
            $scope.players = [];
            for (index in $scope.campaign.players) {
                CharactersService.get($scope.campaign.players[index]._id).then(function (character) {
                    $scope.players.push(Characters.build(character));
                });
            }
            MenuService.currentTitle = 'Campaign : ' + $scope.campaign.name;
        }, function (err) {
            console.log(err);
        });
    }

    loadCampaign();

    $scope.ban = function (character) {
        console.log(character);
        CharactersService.leaveCampaign(character._id).then(function () {
            loadCampaign();
        });
    };

});