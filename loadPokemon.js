function onClick(e) {
  e.preventDefault();
  // get form values
  let pokemon = document.getElementById('search').value;
  // let s = document.getElementById('selector');
  // let type = s.options[s.selectedIndex].value;

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
      pageInfo += "<li>" + json.name + "</li>";
      pageInfo += "</ul>";
      updateRightSideBar(pageInfo);

      pageInfo = "<div class='subParent'>";
      let moveSet = json.moves;
      for(var i = 0; i < moveSet.length; i++) {
        pageInfo += "<div class='section yellow'>" + moveSet[i].move.name + "</div>";

        pageInfo += "<div class='section purple'>" + moveSet[i].version_group_details[0].level_learned_at;
        pageInfo += "<span class='tab'></span>";
        pageInfo +=  moveSet[i].version_group_details[0].move_learn_method.name + "</div>";
      }
      pageInfo += "</div>";
      updateMain(pageInfo);

    });
}

function updateRightSideBar(info) {
  document.getElementById('RightSideBar').innerHTML = info;
}

function updateMain(info) {
  document.getElementById('Main').innerHTML = info;
}


// document.getElementById('searchButton').addEventListener('click', onClick);
document.getElementById('searchButton').addEventListener('click', onClick);
