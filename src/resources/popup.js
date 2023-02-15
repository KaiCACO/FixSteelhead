const home = document.getElementById("home");
const appearance = document.getElementById("appearance");
const defaults = document.getElementById("defaults");

const homeButton = document.getElementById("home-button");
const appearanceButton = document.getElementById("appearance-button");
const defaultsButton = document.getElementById("defaults-button");

homeButton.addEventListener("click", function() {openTab("home")});
appearanceButton.addEventListener("click", function() {openTab("appearance")});
defaultsButton.addEventListener("click", function() {openTab("defaults")});

openTab("home");

function openTab(tabName) {
    console.log(tabName);
    var tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++) {
        let s = tabs[i].style;
        s.display = "none";

    }
    if (tabName == "home") {
        home.style.display = "block";
    }
    else if (tabName == "defaults") {
        defaults.style.display = "block";
    }
    else if (tabName == "appearance") {
        appearance.style.display = "block";
    }

}