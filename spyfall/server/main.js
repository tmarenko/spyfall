import { Meteor } from 'meteor/meteor';

function cleanUpGamesAndPlayers() {
  var cutOff = moment().subtract(2, 'hours').toDate().getTime();

  var numGamesRemoved = Games.remove({
    createdAt: {$lt: cutOff}
  });

  var numPlayersRemoved = Players.remove({
    createdAt: {$lt: cutOff}
  });
}

function getLocationsByOption(locationOption){
  if(locationOption === "location1") {
	  return locations;
  }

  if(locationOption === "location2") {
	  return locations2;
  }
  // use both locations
  return locations.concat(locations2);
}

function getLocationsByDifficulty(locations, difficulty){
    var numLocations = 4 + difficulty;
    if(numLocations > locations.length)
    	numLocations = locations.length;

    var locationsByDifficulty = locations.slice();
    while(locationsByDifficulty.length > numLocations && locationsByDifficulty.length > 0) {
	    var removeLocationIndex = Math.floor(Random.fraction() * locationsByDifficulty.length);
	    locationsByDifficulty.splice(removeLocationIndex, 1);
    }
    return locationsByDifficulty;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

	randomIndex = Math.floor(Random.fraction() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function assignRoles(players, location){
  var default_role = location.roles[location.roles.length - 1];
  var roles = location.roles.slice();
  var shuffled_roles = shuffleArray(roles);
  var role = null;

  players.forEach(function(player){
    if (!player.isSpy){
      role = shuffled_roles.pop();

      if (role === undefined){
        role = default_role;
      }

      Players.update(player._id, {$set: {role: role}});
    }
  });
}

Meteor.startup(function () {
  // Delete all games and players at startup
  Games.remove({});
  Players.remove({});
});

var MyCron = new Cron(60000);

MyCron.addJob(5, cleanUpGamesAndPlayers);

Meteor.publish('games', function(accessCode) {
  return Games.find({"accessCode": accessCode});
});

Meteor.publish('players', function(gameID) {
  return Players.find({"gameID": gameID});
});

Games.find({"state": 'settingUp'}).observeChanges({
  added: function (id, game) {

    var players = Players.find({gameID: id});
    var gameEndTime = moment().add(game.lengthInMinutes, 'minutes').valueOf();

    var spyIndex = Math.floor(Random.fraction() * players.count());
    var firstPlayerIndex = Math.floor(Random.fraction() * players.count());

    var availableLocations = getLocationsByOption(game.locationOption)
    var locations = getLocationsByDifficulty(availableLocations, game.difficulty * players.count())
	var locationIndex = Math.floor(Random.fraction() * locations.length);
    location = locations[locationIndex];

    players.forEach(function(player, index){
      Players.update(player._id, {$set: {
        isSpy: index === spyIndex,
        isFirstPlayer: index === firstPlayerIndex
      }});
    });

    assignRoles(players, location);

    Games.update(id, {$set: {state: 'inProgress', locations: locations, location: location, endTime: gameEndTime, paused: false, pausedTime: null}});
  }
});