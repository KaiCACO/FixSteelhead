const home = document.getElementById("home");
const appearance = document.getElementById("appearance");
const defaults = document.getElementById("defaults");

const homeButton = document.getElementById("home-button");
const appearanceButton = document.getElementById("appearance-button");
const defaultsButton = document.getElementById("defaults-button");

const themeSwitch = document.getElementById("theme-checkbox");

function messageCJS(message, data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:message, data:data});
	});
}

homeButton.addEventListener("click", function() {openTab("home")});
appearanceButton.addEventListener("click", function() {openTab("appearance")});
defaultsButton.addEventListener("click", function() {openTab("defaults")});

openTab("home");

function openTab(tabName) {
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
        if (chrome.storage.sync.get(['theme'].theme) == "dark") {
            themeSwitch.checked = false;
        }
        else if (chrome.storage.sync.get(['theme'].theme) == "light") {
            themeSwitch.checked = true;
        }
    }
    
    themeSwitch.addEventListener('change', function() {
        if (themeSwitch.checked) {
            messageCJS("theme", "light");
        }
        else {
            messageCJS("theme", "dark");
        }
      })

}