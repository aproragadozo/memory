var app = angular.module('plunker', []);

app.service('icons', function() {
    this.pairs = [];

    this.items = [{
            src: "pics/james.jpg",
            id: "d",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/bela.jpg",
            id: "a",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/greta.jpg",
            id: "c",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/cary.jpg",
            id: "b",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }

        }, {
            src: "pics/bela.jpg",
            id: "a",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }

        }, {
            src: "pics/cary.jpg",
            id: "b",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/greta.jpg",
            id: "c",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/james.jpg",
            id: "d",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        },
        {
            src: "pics/jimmie.jpg",
            id: "e",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        },
        {
            src: "pics/jimmie.jpg",
            id: "e",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/marlene.jpg",
            id: "f",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }, {
            src: "pics/marlene.jpg",
            id: "f",
            notinplay: true,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                /*this.src = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSCVG2tzbuMpLg1c8rRVu3Xb8kfhTvcqHF4YvV7mLaJEBH3kTSWYQ';*/
                this.found = true;
            }
        }
    ];

    /*this.pairFound = function() {
      // a tárolt pár mindkét tagjának togglézd át az src-jét, és nullázd a pártárat
      for(var b = 0; b<this.pairs.length; b++) {
        this.pairs[b].change();
      }
      this.pairs = [];
      
      // ez nagyon primitív
      // kéne egy init a controller scope-on,
      // és azt kéne hívni!
      if(this.items.every(function(x) {return x.found === true;})){
        
        angular.forEach(this.items, function(current) {
          current.reset();
          // az egyes itemek src-jét is vissza kell adni!
          // tán angular.copy-val?
        });
        }
        $scope.init();
      };*/

    this.dropPair = function() {
        for (var c = 0; c < this.pairs.length; c++) {
            this.pairs[c].notinplay = true;
        }
        this.pairs = [];
    };
});

app.controller('MainCtrl', ['$scope', '$timeout', 'icons', function($scope, $timeout, icons) {
    // the Fisher-Yates shuffle
    $scope.shuffle = function(array) {
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
    };

    $scope.init = function() {
        for (var f = 0; f < icons.items.length; f++) {
            icons.items[f].reset();
        }
        $scope.items = $scope.shuffle(icons.items);
    };
    $scope.items = [];

    $scope.pairFound = function() {
        // a tárolt pár mindkét tagjának togglézd át az src-jét, és nullázd a pártárat
        for (var b = 0; b < icons.pairs.length; b++) {
            icons.pairs[b].change();
        }
        icons.pairs = [];

        // ez nagyon primitív
        // kéne egy init a controller scope-on,
        // és azt kéne hívni!
        if (icons.items.every(function(x) { return x.found === true; })) {

            angular.forEach(icons.items, function(current) {
                current.reset();
                // az egyes itemek src-jét is vissza kell adni!
                // tán angular.copy-val?
            });
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
                elem.notinplay = false;
                icons.pairs.push(elem);

                if (icons.pairs.length === 2) {

                    if (elem.id === icons.pairs[0].id) {
                        $scope.pairFound();
                    } else {
                        $timeout(function() {
                            icons.dropPair();
                        }, 1000);
                    }

                }
            };
        }
    };
});