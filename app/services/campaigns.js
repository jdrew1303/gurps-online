/**
 * Created by lelabo on 28/04/17.
 */
angular.module('gurps-online').factory('CampaignService', function ($http, $q, $resource, global, UserService) {
    var self = this;
    var serviceUri = global.api_dev + "/campaigns";
    var CampaignsResource = $resource(serviceUri, {}, {
        campaignId: '@id',
        create: {
            method: "POST",
            url: serviceUri + "/",
            headers: {
                'Content-Type': 'application/json'
            }
        },
        all: {
            method: "GET",
            url: serviceUri + "/all",
            isArray: true
        },
        owned: {
            method: "GET",
            url: serviceUri + "/",
            isArray: true
        },
        remove: {
            method: "DELETE",
            url: serviceUri + "/:campaignId"
        }
    });

    this.create = function (name) {
        var deferred = $q.defer();
        UserService.me().then(function (user) {
            CampaignsResource.create({_owner: user._id, name: name}).$promise
                .then(deferred.resolve, deferred.reject);
        }, function (error) {
            console.log(error);
        });
        return deferred.promise;
    };
    this.all = function () {
        var deferred = $q.defer();
        CampaignsResource.all().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    this.userCampaigns = function () {
        var deferred = $q.defer();
        CampaignsResource.owned().$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };

    this.remove = function (id) {
        var deferred = $q.defer();
        CampaignsResource.remove({campaignId: id}).$promise.then(deferred.resolve, deferred.reject);
        return deferred.promise;
    };
    return this;

});