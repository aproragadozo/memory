var app = angular.module('plunker', []);

// session storage to act as cache for image urls
app.service('store', ['$http', '$q', function($http, $q){
    const CACHE_KEY = 'imageUrlCache';
    const SIZE = 104;
    const API_KEY = '160f672f62d2f429e0f06fe9eb8cb555';
    const API_ENDPOINT = 'https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=' + API_KEY + '&group_id=52242140489@N01&extras=url_q,url_o&per_page=100&format=json&nojsoncallback=1';

    this.init = function(){
        var storage = sessionStorage.getItem(CACHE_KEY);

        if(!storage) {
            return this.prefetch();
        }
        return $q.resolve();
    };
    // populate cache with 104 images (enough for 13 rounds of play) with a single API call
    this.prefetch = function() {
        var self = this;
        
        
        return $http({
            method: 'POST',
            url: API_ENDPOINT
        })
        .then(function(response){
            var photos = response.data.photos.photo;
            var pictures = [];
            
            for (var i = 0; i < Math.min(SIZE, photos.length); i++) {
                var url = unescape(photos[i].url_q);

                //don't allow duplicates in the cache
                if(pictures.indexOf(url) === -1) {
                    pictures.push(url);
                }
            }
            // save the pictures to sessionStorage
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(pictures));
            console.log(`Cached ${pictures.length} images`);
        })
    }

    // we don't need to get a single image from cache, we need to get 8 random non-duplicate ones
    this.getGamePicsFromCache = function() {
        var indices = [];

        // non-duplicate numbers from the available indices between 1 and 104
        while (indices.length < 8) {
            var randomnumber = Math.floor(Math.random() * SIZE);
            if (indices.indexOf(randomnumber) > -1) continue;
            indices[indices.length] = randomnumber;
        }

        var storage = sessionStorage.getItem(CACHE_KEY);

        var pictures = JSON.parse(storage);
        // for each index, remove the corresponding image from the cache
        // and add it to the pics that the game round will use
        var gamePics = [];
        // SORT IN DESCENDING ORDER - splice from end to beginning
        indices.sort(function(a, b) { return b - a; });
        indices.forEach(function(current, index, array) {
            // make sure index is valid before splicing
            if (current < pictures.length) {
                gamePics.push(pictures.splice(current, 1)[0]);
           }
        })
        // store the remaining pictures back into the cache
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(pictures));

        // trigger replenishment of cache
        // filling the indices that were used
        var replenishmentPromise = this.replenishCache(indices.length);

        return $q.resolve(gamePics);
    }

    this.replenishCache = function(count) {
        var storage = sessionStorage.getItem(CACHE_KEY);
        var pictures = storage ? JSON.parse(storage) : [];
        var self = this;

        return $http({
            method: 'POST',
            url: API_ENDPOINT
        })
        .then(function(response) {
            var photos = response.data.photos.photo;
            var added = 0;
            for (var i = 0; i < photos.length && added < count; i++) {
                var url = unescape(photos[i].url_q);
                
                // Check for duplicates
                if (pictures.indexOf(url) === -1) {
                    pictures.push(url);
                    added++;
                }
            }
            // store the replenished cache back
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(pictures))
            console.log(`Replenished cache with ${added} pix`)
        })
    }

}])

app.service('icons', ['$http', '$rootScope', '$q', 'store', function($http, $rootScope, $q, store) {
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
        // getGamePicsFromCache now returns a promise
        return store.getGamePicsFromCache() 
            .then(function(gamePics) {
                var pictures = [];
                console.log('Got URLs from cache:', gamePics);
                var deferred = $q.defer();
    
                // Create Item objects for the game
                gamePics.forEach(function(url, index) {
                    // Check for undefined URL before creating item
                    if (url) { 
                        pictures.push(new Item(url, index));
                        pictures.push(new Item(url, index + 8));
                    }
                });
                
                // Image preloading
                var loadedCount = 0;
                var totalImages = gamePics.length;
                
                if (totalImages === 0) {
                    deferred.resolve(pictures);
                    return deferred.promise;
                }
                
                gamePics.forEach(function(url) {
                    var img = new Image();
                    img.onload = img.onerror = function() {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            deferred.resolve(pictures);
                        }
                    };
                    img.src = url;
                });
                
                return deferred.promise;
            });
    };

    // moved dropPair from the service into the controller
}]);

app.controller('MainCtrl', ['$scope', '$timeout', 'icons', 'store', function($scope, $timeout, icons, store) {
    // show the splash or not
    $scope.splash = true;
    // set up the replay screen
    $scope.replay = false;

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
    // newm várta meg az init, hogy populálódhon a store :(
    $scope.startGame = function() {
        // First, ensure the cache is initialized (prefetch will run if needed)
        store.init()
            .then(function() {
                // Now the cache is guaranteed to be populated (or was already present).
                // We can safely call getPics.
                return icons.getPics();
            })
            .then(function(response) {
                $scope.items = $scope.shuffle(response);
                // neither of the non-game screens should be displayed
                $scope.splash = false;
                $scope.replay = false;
            })
            .catch(function(error) {
                console.error('Failed to start game:', error);
            });
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
           /* replacing this for now with just toggling the replay param on
           when all the pairs are found
            $scope.init(replay=true);
            */
           // make them 'un-found' again so they don't show up over the replay screen
           $scope.items.forEach((item) => {
            item.found = !item.found;
           });
           $scope.replay = true;
        }
    };
}]);

// init the cache
app.run(['store', function(store) {
    store.init().then(function() {
        console.log(`Cache initialized with ${store.SIZE} images`);
    }).catch(function(error) {
        console.error('Cache initialization failed:', error);
    });
}]);

// itt az ideje a direktivának
app.directive('gomboc', function(icons) {
    return {
        restrict: 'E',
        templateUrl: '/gomboc.html',
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
