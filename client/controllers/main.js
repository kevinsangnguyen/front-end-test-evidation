app.controller('mainController', function($scope,$location,$routeParams,$timeout,$document,$window) {
  $scope.participant = {};
  $scope.form_status = "Complete the form to continue enrollment";
  $scope.clear = function() {
    $scope.participant = {};
    $scope.form_status = "Complete the form to continue enrollment";
  }
  $scope.submit = function() {
    console.log($scope.participant);
    $location.path('/search')
    // HTTP POST WITH $scope.participant
  }

  $scope.$watch('participant', function(){

    if(!$scope.participant.first || !$scope.participant.last || !$scope.participant.city || !$scope.participant.check){
      $scope.disabled = true;
    }
    else{
      $scope.disabled = false;
      $scope.form_status = "I understand and wish to continue with enrollment";
    }
  }, true);


  $scope.s = {};
  $scope.results = [];

  $scope.$watch('s', function(){
    let current;
    let results = [];
    if($scope.s.input){
      current = $scope.s.input.split(" ")
      if(current.length > 0){
        $scope.providers.forEach(function(provider){
          let name = provider.first_name || provider.organization_name;
          if(name.substring(0,current[0].length).toLowerCase() == current[0].toLowerCase()){
            results.push(provider);
          }
        })
      }

      if(current.length === 2){
        results.forEach(function(provider,index,array){
          let name = provider.last_name || provider.organization_name;
          if(provider.last_name){
            if(name.substring(0,current[0].length).toLowerCase() !== current[1].toLowerCase()){
              array.splice(index,1);
            }
          }

          if(provider.organization_name){
            current = current[0] + " " + current[1];
            if(name.substring(0,current.length).toLowerCase() !== current.toLowerCase()){
              array.splice(index,1);
            }
          }
        })
      }

      $scope.loading = true;
      var timeoutPromise;
      $timeout.cancel(timeoutPromise);  //does nothing, if timeout alrdy done
      timeoutPromise = $timeout(function(){   //Set timeout
           $scope.loading = false;
           $scope.results = results;
      },200);

    }
  }, true);

  $scope.info = function(provider) {
    //send POST with provider
    console.log(provider);
  }




  $scope.providers = [{
   "first_name":"John",
  "last_name":"Doe",
  "zip":"01234",
  "npi":12345
 },{
   "first_name":"Jane",
    "last_name":"Doe",
    "zip":"93110",
    "npi":23456
 },{
   "first_name":"Bran",
    "last_name":"Doe",
    "zip":"93110",
    "npi":54321
 },{
   "first_name":"Jack",
    "last_name":"Dob",
    "zip":"94101",
    "npi":35467
 },{
   "first_name":"John",
    "last_name":"Doe",
    "zip":"54312",
    "npi":99999
 },{
   "first_name":"Jack",
    "last_name":"Dob",
    "zip":"11002",
    "npi":23556
 },{
   "organization_name":"Johns Hopkins",
    "zip":"01234",
    "npi":22222
 },{
   "organization_name":"Mercy Hospital",
    "zip":"93110",
    "npi":33333
 },{
   "organization_name":"General Hospital",
    "zip":"11002",
    "npi":44533
 }]

});
