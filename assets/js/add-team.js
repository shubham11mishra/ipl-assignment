$(document).ready(function () {
  let teams = JSON.parse(localStorage.getItem("teams"));
  $("#teamform").submit(function (e) {
    e.preventDefault();
    const data = new FormData(this);
    const formJSON = Object.fromEntries(data.entries());
    formJSON['id']=(teams.length+1);
    teams.push(formJSON);
    localStorage.setItem("teams", JSON.stringify(teams));
    console.log(teams);
  });
});
