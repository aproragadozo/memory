var app = angular.module('plunker', []);

app.service('icons', function() {
    this.pairs = [];

    this.items = [{
        // this really shouldn't contain each object TWICE :(
        // can't these things extend from a sort of common item class?
            src: "pics/james.jpg",
            id: "d",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/bela.jpg",
            id: "a",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/greta.jpg",
            id: "c",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/cary.jpg",
            id: "b",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }

        }, {
            src: "pics/bela.jpg",
            id: "a",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }

        }, {
            src: "pics/cary.jpg",
            id: "b",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/greta.jpg",
            id: "c",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/james.jpg",
            id: "d",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        },
        {
            src: "pics/jimmie.jpg",
            id: "e",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        },
        {
            src: "pics/jimmie.jpg",
            id: "e",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/marlene.jpg",
            id: "f",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
                this.found = true;
            }
        }, {
            src: "pics/marlene.jpg",
            id: "f",
            notinplay: true,
            isDisabled: false,
            found: false,
            reset: function() {
                this.notinplay = true;
                this.found = false;
            },
            change: function() {
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
            this.pairs[c].isDisabled = false;
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
            // ez kell-e?
            icons.pairs[b].isDisabled = false;
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
                if(elem.isDisabled !== true) {
                    elem.isDisabled=true;
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
            }
            };
        }
    };
});
