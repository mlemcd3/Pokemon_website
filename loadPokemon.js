var frontImage = document.createElement("img");
var backImage = document.createElement("img");
var shinyFrontImage = document.createElement("img");
var shinyBackImage = document.createElement("img");

function onClick(e) {
  e.preventDefault();
  // get form values
  let pokemon = document.getElementById('search').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;
  // check if number is empty
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
      // update DOM with response
      let pageInfo = "<ul>";
      pageInfo += "<p id='images'></p>";

      frontImage.src = json.sprites.front_default;
      backImage.src = json.sprites.back_default;
      shinyFrontImage.src = json.sprites.front_shiny;
      shinyBackImage.src = json.sprites.back_shiny;

      pageInfo += "<img src='" + frontImage.src + "' onmouseover='rolloverDefault(this)' onmouseout='mouseawayDefault(this)'>";
      pageInfo += "<img src='" + shinyFrontImage.src + "' onmouseover='rolloverShiny(this)' onmouseout='mouseawayShiny(this)'>";;
      pageInfo += "<li>" + json.name + "</li>";
      pageInfo += "</ul>";
      pageInfo += "<ul> Stats";
      for(var i = 0; i < json.stats.length; i++){
        pageInfo += "<li>" + json.stats[i].base_stat + " " +json.stats[i].stat.name + "</li>";
      }
      pageInfo += "</ul>";
      updateRightSideBar(pageInfo);

      pageInfo = "<div class='subParent'>";


      if(type === "moves"){
        let moveSet = json.moves;
        for(var i = 0; i < moveSet.length; i++) {
          pageInfo += "<div class='section yellow'>" + moveSet[i].move.name + "</div>";

          pageInfo += "<div class='section purple'>" + moveSet[i].version_group_details[0].level_learned_at;
          pageInfo += "<span class='tab'></span>";
          pageInfo +=  moveSet[i].version_group_details[0].move_learn_method.name + "</div>";
        }
      }


      if(type === "info"){
        pageInfo += "<div class='section yellow'>" + json.base_experience + "</div>";
        pageInfo += "<div class='section purple'></div>";

        pageInfo += "<div class='section yellow'>" + json.types[0].type.name + "</div>";
        if(json.types.length == 2){
            pageInfo += "<div class='section purple'>" + json.types[1].type.name + "</div>";
        }
        else{
          pageInfo += "<div class='section purple'></div>";
        }
        for(var i = 0; i < json.abilities.length; i++) {
          pageInfo += "<div class='section yellow'>" + json.abilities[i].ability.name + "</div>";
          pageInfo += "<div class='section purple'>" + json.abilities[i].is_hidden + "</div>";
        }
        for(var i = 0; i < json.game_indices.length; i++) {
          pageInfo += "<div class='section yellow'>" + json.game_indices[i].version.name + "</div>";
          pageInfo += "<div class='section purple'>" + "</div>";
        }
      }


      pageInfo += "</div>";
      updateMain(pageInfo);


    });
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


// document.getElementById('searchButton').addEventListener('click', onClick);
document.getElementById('searchButton').addEventListener('click', onClick);
