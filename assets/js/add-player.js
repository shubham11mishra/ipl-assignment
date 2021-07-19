$(document).ready(function () {
  let teams = JSON.parse(localStorage.getItem("teams"));
  let players = JSON.parse(localStorage.getItem("players"));

  var newvalue = teams.forEach((team) => {
    $("#teamname").append(
      `<option value="${team.key}">${team.fullName}</option>`
    );
  });

  console.log(players, players.length);
  $("#playerform").submit(function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    formJSON["id"] = players.length + 1;

    players.push(formJSON);
    localStorage.setItem("players", JSON.stringify(players));
    $("#playerform").trigger("reset");
    alert("Player Added Successfully");
  });
});
