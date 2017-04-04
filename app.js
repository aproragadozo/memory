var app = angular.module('plunker', []);

app.service('icons', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    this.pairs = [];
    // squared circle flickr group id is 52242140489@N01
    this.pics = [];
    // item constructor
    // we'll call this with each url that the ajax request returns
    function Item(src, counter) {
        this.src = src;
        this.id = counter; // we'd like these to be 1-12, though the main thing is that the id-s are unique
        this.notinplay = true;
        this.isDisabled = false;
        this.found = false;
        this.reset = function() {
            this.notinplay = true;
            this.isDisabled = false;
            this.found = false;
        };
        this.change = function() {
            this.found = true;
            this.isDisabled = true;
        }
    }
    // function for the ajax call that we'll stick into the promise-maker
    this.getPics = function() {
        var key = '160f672f62d2f429e0f06fe9eb8cb555';
        var api = 'https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=' + key + '&group_id=52242140489@N01&extras=url_q,url_o&per_page=100&format=json&nojsoncallback=1';

        var indices = [];
        // non-duplicate numbers
        while (indices.length < 6) {
            var randomnumber = Math.ceil(Math.random() * 99);
            if (indices.indexOf(randomnumber) > -1) continue;
            indices[indices.length] = randomnumber;
        }

        return $http({
                method: 'POST',
                url: api
            })
            .then(function successCallback(response) {
                var pictures = [];
                // 
                indices.forEach(function(current, index, array) {
                    pictures.push(new Item(unescape(response.data.photos.photo[current].url_q), index));
                    pictures.push(new Item(unescape(response.data.photos.photo[current].url_q), (index + 1)));
                })
                this.pics = pictures;
                return pictures;
            })
    };

    // moved dropPair from the service into the controller
}]);

app.controller('MainCtrl', ['$scope', '$timeout', 'icons', function($scope, $timeout, icons) {
    // show the splash or not
    $scope.splash = true;

    // the Fisher-Yates shuffle
    $scope.shuffle = function(array) {
        if (array) {
            var m = array.length,
                t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    };

    $scope.items = [];
    $scope.init = function() {
        icons.getPics()
            .then(function(response) {
                $scope.items = $scope.shuffle(response);
                $scope.splash = false;
            })
            .catch(function(error) {
                console.error('Failed!', error)
            })
    };
    $scope.dropPair = function() {
        for (var c = 0; c < icons.pairs.length; c++) {
            icons.pairs[c].isDisabled = false;
            icons.pairs[c].notinplay = true;
        }
        // re-enable the items that haven't yet been found
        $scope.items.forEach(function(current, index, array) {
            if (!current.found) {
                current.isDisabled = false;
            }
        });
        icons.pairs = [];
    };

    $scope.pairFound = function() {
        // a tárolt pár mindkét tagjának togglézd át az src-jét, és nullázd a pártárat
        for (var b = 0; b < icons.pairs.length; b++) {
            // and we're not enabling the cards here!
            icons.pairs[b].change();
        }
        icons.pairs = [];

        // re-enable the items that haven't yet been found
        $scope.items.forEach(function(current, index, array) {
            if (!current.found) {
                current.isDisabled = false;
            }
        });
        if ($scope.items.every(function(x) { return x.found === true; })) {
            /* this might also not be needed
            angular.forEach(icons.items, function(current) {
                current.reset();
                // az egyes itemek src-jét is vissza kell adni!
                // tán angular.copy-val?
            });
            */
            $scope.init();
        }
    };
}]);

// itt az ideje a direktivának
app.directive('gomboc', function(icons) {
    return {
        restrict: 'E',
        templateUrl: 'gomboc.html',
        controller: function($scope, $timeout) {
            $scope.katt = function(elem) {
                if (elem.isDisabled !== true) {
                    elem.isDisabled = true;
                    elem.notinplay = false;
                    icons.pairs.push(elem);
                    if (icons.pairs.length === 2) {
                        $scope.items.forEach(function(current, index, array) {
                            current.isDisabled = true;
                        })
                        if (elem.src === icons.pairs[0].src) {
                            $scope.pairFound();
                        } else {
                            $timeout(function() {
                                $scope.dropPair();
                            }, 1200);
                        }

                    }
                }
            };
        }
    };
});
