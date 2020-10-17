var frontImage = document.createElement("img");
var backImage = document.createElement("img");
var shinyFrontImage = document.createElement("img");
var shinyBackImage = document.createElement("img");


function getAPI(path){
  let pokemon = document.getElementById('search').value;
  if (pokemon === "") {
    return;
  }
  // setup URL
let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      main(json);
      if(path == "info"){
        mainInfo(json);
        loadInfo(json);
      }
      if(path == "moves"){
        mainMoves(json);
        loadMoves(json);
      }
    });
}
function main(json) {
}

function mainInfo(json) {
      // update DOM with response
      let pageInfo = "<p id='images'></p>";

      pageInfo += "<p id='images'></p>";

      frontImage.src = json.sprites.front_default;
      backImage.src = json.sprites.back_default;
      shinyFrontImage.src = json.sprites.front_shiny;
      shinyBackImage.src = json.sprites.back_shiny;

      pageInfo += "<img src='" + frontImage.src + "' onmouseover='rolloverDefault(this)' onmouseout='mouseawayDefault(this)' class='pokesprite'>";
      pageInfo += "<img src='" + shinyFrontImage.src + "' onmouseover='rolloverShiny(this)' onmouseout='mouseawayShiny(this)' class='pokesprite'>";

      pageInfo += "<ul>";
      pageInfo += "<li>" + json.name + "</li>";

      pageInfo += "<div>" + json.types[0].type.name;
      if(json.types.length == 2){
          pageInfo += " " + json.types[1].type.name;
      }
      pageInfo += "</div>";

      var idLength = json.id.toString().length;
      idLength = 5 - idLength;
      var id = json.id.toString();
      for(var i = 0; i < idLength; i++){
        id = id.replace (/^/,'0');
      }
      pageInfo += "<li> ID: " + id + "</li>";
      pageInfo += "<li> Height: " + json.height + " Weight: " + json.weight + "</li>";
      pageInfo += "<li> Base exp: " + json.base_experience+ "</li>";
      pageInfo += "</ul>";

      pageInfo += "<div class='abilities'> Abilities: </div>";
      for(var i = 0; i < json.abilities.length; i++) {
        pageInfo += "<div class='abilities'>" + json.abilities[i].ability.name;
        if(json.abilities[i].is_hidden){
          pageInfo += " - Hidden";
        }
        pageInfo += "</div>";
      }

      updateRightSideBar(pageInfo);
}

function mainMoves(json) {
      // update DOM with response
      let pageInfo = "<p id='images'></p>";

      pageInfo += "<p id='images'></p>";

      frontImage.src = json.sprites.front_default;
      backImage.src = json.sprites.back_default;
      shinyFrontImage.src = json.sprites.front_shiny;
      shinyBackImage.src = json.sprites.back_shiny;

      pageInfo += "<img src='" + frontImage.src + "' onmouseover='rolloverDefault(this)' onmouseout='mouseawayDefault(this)' class='pokesprite'>";
      pageInfo += "<img src='" + shinyFrontImage.src + "' onmouseover='rolloverShiny(this)' onmouseout='mouseawayShiny(this)' class='pokesprite'>";

      pageInfo += "<ul>";
      pageInfo += "<li>" + json.name + "</li>";
      pageInfo += "</ul>";
      pageInfo += "<ul> Stats:";
      for(var i = 0; i < json.stats.length; i++){
        pageInfo += "<li>" + json.stats[i].base_stat + " " +json.stats[i].stat.name + "</li>";
      }
      pageInfo += "</ul>";
      updateRightSideBar(pageInfo);
}

function loadMoves(json){
  var pageInfo = "<div class='subParent'>";
  pageInfo += "<div class='headerLeft'>Moves:</div>" + "<div class='headerRight'>Learn method:</div>";
  let moveSet = json.moves;
  for(var i = 0; i < moveSet.length; i++) {
    pageInfo += "<div class='section red'>" + moveSet[i].move.name + "</div>";

    pageInfo +=  "<div class='section purple'>" + moveSet[i].version_group_details[0].move_learn_method.name;
    if(moveSet[i].version_group_details[0].move_learn_method.name == "level-up"){
      pageInfo += " at  " + moveSet[i].version_group_details[0].level_learned_at;
    }
    pageInfo += "</div>";

  }
  pageInfo += "</div>";
  updateMain(pageInfo);
}

function loadInfo(json){
  var pageInfo = "<p class='header'> Games that have " + json.name + "</p>";
  pageInfo += "<div class='subParent'>";
  for(var i = 0; i < (json.game_indices.length - 1); i+=2) {
    pageInfo += "<div class='section red'>" + json.game_indices[i].version.name + "</div>";
    pageInfo += "<div class='section purple'>" + json.game_indices[i + 1].version.name + "</div>";
  }
  if(json.game_indices.length%2 == 1){ //if odd then the last one will be left off (9/2=4)
    pageInfo += "<div class='section red'>" + json.game_indices[json.game_indices.length - 1].version.name + "</div>";
  }

  pageInfo += "</div>";
  updateMain(pageInfo);
}

function mouseawayDefault(my_image){
    my_image.src = frontImage.src;
}

function mouseawayShiny(my_image){
    my_image.src = shinyFrontImage.src;
}

function rolloverDefault(my_image){
    my_image.src = backImage.src;
}
function rolloverShiny(my_image){
    my_image.src = shinyBackImage.src;

}


function updateRightSideBar(info) {
  document.getElementById('RightSideBar').innerHTML = info;
}

function updateMain(info) {
  document.getElementById('Main').innerHTML = info;
}


// // // document.getElementById('searchButton').addEventListener('click', onClick);

document.getElementById('searchButton').addEventListener('click', function(event){
    event.preventDefault();
    getAPI(this.getAttribute("value"));
});
document.getElementById('infoButton').addEventListener('click', function(event){
    event.preventDefault();
    getAPI(this.getAttribute("value"));
});
document.getElementById('moveButton').addEventListener('click', function(event){
    event.preventDefault();
    getAPI(this.getAttribute("value"));
});
