function LightenDarkenColor(col, amt) {
  col = parseInt(col, 16);
  return (
    ((col & 0x0000ff) + amt) |
    ((((col >> 8) & 0x00ff) + amt) << 8) |
    (((col >> 16) + amt) << 16)
  ).toString(16);
}

$(document).ready(() => {
  //jquery smooth scroll
  $(".navbar a, footer a[href='#myPage']").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        900,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
  // tilt effect

  // fetching team data from team.json
  $.getJSON("./assets/team.json", (data) => {
    //console.log(JSON.stringify(data))
    if (!localStorage.getItem("teams")) {
      localStorage.setItem("teams", JSON.stringify(data));
    }
    var items_json = localStorage.getItem("teams");
    teams = JSON.parse(items_json);

    teams.forEach((team) => {
      $("#teamlist").append(`
        <div class="col-xs-6 col-sm-12 col-md-6 col-lg-3">
        <a href="./team-details.html?id=${team.key}">
        <div class="box" id="team${team.id}">
          <h2 class="name">${team.fullName}</h2>
          <a href="./team-details.html?id=${team.key}" class="team-detail">View Detail</a>
          <div class="circle"></div>
          <img class="team-img" src="${team.teamIcon}" alt="" />
        </div>
        </a>
      </div>
        `);
      $("#team" + team.id).attr("data-content", team.key);
      $("#team" + team.id).css(
        "background",
        `linear-gradient(134deg,${team.color} ,${team.color} )`
      );
    });
    VanillaTilt.init(document.querySelectorAll(".box"), {
      max: 25,
      speed: 400,
    });

    // fetching Player data from player.json
    $.getJSON("./assets/player.json", (data) => {
      //console.log(JSON.stringify(data))
      if (!localStorage.getItem("players")) {
        localStorage.setItem("players", JSON.stringify(data));
      }
      var items_json = localStorage.getItem("players");
      players = JSON.parse(items_json);


    // sort player according to run
    teams = JSON.parse(localStorage.getItem("teams"));
    players = JSON.parse(localStorage.getItem("players"));
    topbat = players.sort(function (b, a) {
      var keyA = a.runScore,
        keyB = b.runScore;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    var getTeamDetail = (teamid) => {
      return teams.filter((team) => team.key == teamid);
    };
    let batcount = 1;
    topbat.forEach((player) => {
      if (batcount > 4) {
        return false;
      }
      batcount++;
      let teamD = getTeamDetail(player.from);
      $("#topbat").append(`
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <a href="./player-details.html?id=${player.id}">
          <div class="cardcus" id="player${player.id}">
           <div class="imgbox">
               <img src="${player.img}" alt="">
           </div>
           <div class="contentbox">
               <h2 class="name">${player.playerName}</h2>
               <div class="summery">
                   <div>
                      <h3>${player.runScore}</h3>
                      <span>RUNS</span>
                   </div>
                   <div>
                      <h3>${player.Wicket}</h3>
                      <span>WICKETS</span>
                   </div>

               </div>
               
           </div>
           <a href="./player-details.html?id=${player.id}" class="player-detail">View Profile</a>
          </div>
          </a>
        </div>
  
    `);
      $("body").append(
        `<style>#player${player.id}::before{background:linear-gradient(134deg,${teamD[0].color} ,${teamD[0].color})}</style>`
      );
    });

    //sort player according to wicket
    topbowl = players.sort(function (b, a) {
      var keyA = a.Wicket,
        keyB = b.Wicket;

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    var getTeamDetail = (teamid) => {
      return teams.filter((team) => team.key == teamid);
    };

    let bowlercount = 1;
    topbowl.forEach((player) => {
      if (bowlercount > 4) {
        return false;
      }

      bowlercount++;

      let teamD = getTeamDetail(player.from);
      $("#topbowler").append(`
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3">
          <a href="./player-details.html?id=${player.id}">
          <div class="cardcus" id="player${player.id}">
           <div class="imgbox">
               <img src="${player.img}" alt="">
           </div>
           <div class="contentbox">
               <h2 class="name">${player.playerName}</h2>
               <div class="summery">
                   <div>
                      <h3>${player.runScore}</h3>
                      <span>RUNS</span>
                   </div>
                   <div>
                      <h3>${player.Wicket}</h3>
                      <span>WICKETS</span>
                   </div>

               </div>
               
           </div>
           <a href="./player-details.html?id=${player.id}" class="player-detail">View Profile</a>
          </div>
          </a>
        </div>
  
    `);
      $("body").append(
        `<style>#player${player.id}::before{background:linear-gradient(134deg,${teamD[0].color} ,${teamD[0].color})}</style>`
      );
    });

    VanillaTilt.init(document.querySelectorAll(".cardcus"), {
      max: 25,
      speed: 400,
    });
  });
});
});
