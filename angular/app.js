
angular.module("cars", ["ngResource", "ui.router"])
  .controller("indexController", ["$state", "Car", "Photo", indexControllerFunction])
  .controller("showController", ["$state", "$stateParams", "Car", "Photo", showControllerFunction])
  .config(["$stateProvider", Router])
  .factory("Car", ["$resource", Callback])
  .factory("Photo", ["$resource", photoFactory])


function indexControllerFunction($state, Car, Photo) {
  this.cars = Car.query()
  this.photos = Photo.query()
  this.destroy = function () {
    console.log(this.car);
    this.car.$delete({id: this.car}).then(function(){
      $state.go("index")
    })
}
}

function showControllerFunction($state, $stateParams, Car, Photo) {
  this.car = Car.get({id: $stateParams.id})
    this.photos = this.car.photos
    // this.photos = this.car.photos.map((photoFromCar) => {
    //   let photo = new Photo()
    //   photo.someProp = photoFromCar.someProp
    //   photo.someProp = photoFromCar.someProp
    //   photo.someProp = photoFromCar.someProp
    //   return photo
    // })
    this.newPhoto = new Photo({car_id: $stateParams.id});
    this.create = function(){
    this.newPhoto.$save().then(function(photo){
      $state.go("show", {id: photo.car_id}, {reload: true})
    })
  }
  //   this.update = function(photo){
  //     this.photo = Photo.get({id: photo.id})
  //     this.photo.$promise.then(() => {
  //     this.photo.$update({id: photo.id}).then(function(photo){
  //     $state.go("show", { id: photo.car_id})
  //   })
  //   })
  // }
    this.update = function(photox){
      console.log(photox);
      let photoToEdit = Photo.get({id: photox.id}, function() {
        photoToEdit.$save({ id: photoToEdit.id})
      })
//{photoUrl: photox.photoUrl, year: photox.year, color: photox.color, id: photox.id}

      //   this.photoToEdit.$save().then(function(photoEditPromise){
      //     console.log("hit the update");
      //     $state.go("show", { id: photoEditPromise.car_id})
      // })



      // this.photo = photo
      //factory get the photo instead of the line above
    }

    this.destroy = function(photo){
      this.photo = Photo.get({id: photo.id})
      this.photo.$promise.then(() => {
        id = this.photo.car_id
        this.photo.$delete({id: photo.id}).then(function(photo){
          $state.go("show", {id: id}, {reload: true})
        })
      })
      }
      this.destroyCar = function(){
        console.log(this.car);
        this.car.$promise.then(() => {
          this.car.$delete({id: this.car.id}).then(function(){
            $state.go("index")
          })
        })
        }
}


function photoFactory($resource){
  return $resource("http://localhost:3000/photos/:id", {}, {
      update: { method: "PUT"}
  })
}

function Callback($resource){
  return $resource("http://localhost:3000/cars/:id", {}, {
      update: { method: "PUT"}
  })
}

function Router($stateProvider) {
  $stateProvider
  .state("welcome", {
    url: "/welcome",
    templateUrl: "./ng-views/welcome.html",
    controller: "indexController",
    controllerAs: "vm"
  })
  .state("index", {
    url: "/cars",
    templateUrl: "./ng-views/index.html",
    controller: "indexController",
    controllerAs: "vm"
  })
  .state("show", {
    url: "/cars/:id",
    templateUrl: "./ng-views/show.html",
    controller: "showController",
    controllerAs: "vm"
  })
}
