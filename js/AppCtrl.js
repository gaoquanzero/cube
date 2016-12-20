var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', function($scope, $mdDialog) {
        $scope.myVar=false;
        $scope.volume = "ic_volume_up_black_24px.svg";
        $scope.toggle=function(){
            $scope.myVar=!$scope.myVar;
            if (!$scope.myVar) {
                $scope.volume = "ic_volume_up_black_24px.svg";
            } else {
                $scope.volume = "ic_volume_off_black_24px.svg";
            }
        };

        $scope.showAdvanced = function(ev) {
            /*
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './v2.html',
                targetEvent: ev
            });
            */
        };
    });
function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
};
