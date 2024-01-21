const darkTheme = ['#293b72', '#262935', '#414a72', '#9bb4ff', '#3f4869', '#2b2b3a', '#323a56', '#ffffff', '#000000', '#1e2d59', '#1e2d59'];
const lightTheme = ['#ffffff', "#bbc6f2", "#e4e7f0", '#5579e6', "#f0f4ff", "#ffffff", "#6c77a1", '#000000', '#ffffff', "#d7e0fc", '#1e2d59'];
let userScheme = darkTheme;

const raleway = new FontFace("raleway", "url(" + file('Raleway.ttf') + ")");
const ralewayThin = new FontFace("ralewayThin", "url(" + file('RalewayThin.ttf') + ")");
const nunito = new FontFace("nunito", "url(" + file('Nunito.ttf') + ")");

let injectedStyles = {};

function updateInjectedStyles() {
    injectedStyles = {
        "body": ["background-color: " + userScheme[5]],
        "#site-header-container": ["background-color: " + userScheme[10]],
        "#site-nav-container": ["background-color: " + userScheme[0]],
        //"h5": ["color: " + userScheme[8], "margin: none"],
        ".title": ["color: white"],
        ".pri-100-fgc": ["color: " + userScheme[7], "font-family: nunito"],
        ".caret": ["color: " + userScheme[7]],
        ".for-search": ["color: white"],
        ".desc": ["color: " + userScheme[7], "font-family: ralewayThin"],
        ".assignment-detail-link": ["color: " + userScheme[3], "font-family: raleway"],
        ".bb-tile-title": ["border-top-left-radius: 35px", "border-top-right-radius: 35px", "border: 2px solid black", "background-color: " + userScheme[10]],
        ".bb-tile-header": ["color: white", "font-family: nunito"],
        "td": ["font-family: ralewayThin", "color: " + userScheme[7]],
        ".bb-tile-content": ["border-bottom-left-radius: 35px", "border-bottom-right-radius: 35px", "border: 2px solid black", "border-top: none", "background-color: " + userScheme[2]],
        "#courses .row": ["background-color: " + userScheme[2]],
        "#courses .row:nth-child(odd)": ["background-color: " + userScheme[4], "border-radius: 25px"],
        ".table-striped>tbody>tr:nth-of-type(odd)": ["background-color: " + userScheme[4]],
        "#courses .row:nth-child(odd)": ["background-color: " + userScheme[4], "border-radius: 25px"],
        ".topnav-icon": ["color: white"],
        ".bb-action-bar": ["background-color: " + userScheme[0], "border: none", "padding: 10px"],
        ".btn-default": ["background-color: " + userScheme[9], "color: " + userScheme[7], "border: none", "box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7)"],
        ".chCal-button-inner": ["background-color: " + userScheme[9], "color: " + userScheme[7], "border: none", "box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7)", "border: none"],
        ".chCal-button": ["background-color: " + userScheme[9], "color: " + userScheme[7], "border: none", "box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7)", "border: none"],
        "select.input-sm": ["background-color: " + userScheme[9], "color: " + userScheme[7], "border: none", "box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.7)"],
        ".add-existing-items-header": ["background-color: " + userScheme[0], "border: none", "padding: 10px"],
        "thead": ["border: none"],
        "th": ["color: " + userScheme[7], "border-radius: 0px", "background-color: transparent"],
        ".table thead": ["background-color: transparent"],
        ".assignment-table-sort": ["color: " + userScheme[7]],
        ".day": ["color: black"],
        ".btn-link": ["color: " + userScheme[3]],
        "#progress-btn": ["color: black"],
        "#schedule-btn": ["color: black"],
        "#assignment-center-btn": ["color: black"],
        "#learning-progression-btn": ["color: black"],
        "#course-requests-btn": ["color: black"],
        "#requirement-btn": ["color: black"],
        "#checklist-btn": ["color: black"],
        ".popover-content": ["background-color: white"],
        ".section-heading": ["background-color: " + userScheme[10]],
        ".bb-page-heading": ["color: white", "font-family: nunito"],
        ".lead": ["color: white", "transform: translateY(5px)"],
        ".bulletin": ["background-color: " + userScheme[10], "border: none", "border-radius: 15px", "box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7)", "color: " + userScheme[7]],
        "h2": ["color: " + userScheme[7], "font-family: nunito"],
        ".whiteContainer1 text-center": ["background-color: " + userScheme[9]],
        ".showGrade": ["visibility: shown", "color: " + userScheme[7]],
        ".pull-left strong": ["color: " + userScheme[7]],
        ".assignments-header": ["color: " + userScheme[7]],
        ".bb-avatar-wrapper-medium": ["visibility: shown"],
        ".bb-avatar-wrapper-nav": ["visibility: shown"],
        ".imgNice": ["visibility: shown", "border: none"],
        ".group-owner-name": ["color: " + userScheme[7]],
        ".caption": ["color: " + userScheme[7]],
        ".sky-page-heading": ["color: " + userScheme[7]],
        "#directory-description-content": ["color: " + userScheme[7]],
        "#assignment-detail-assignment .bb-tile-content-section h4": ["color: " + userScheme[7]],
        "#assignment-detail-assignment .bb-tile-content-section div": ["color: " + userScheme[7]],
        "#assignment-detail-assignment .bb-tile-content-section .btn": ["color: " + userScheme[7]],
        ".bulletin span": ["color: " + userScheme[7], "font-family: ralewayThin"],
        ".subnav span": ["color: black", "font-family: raleway"],
        "#assignment-center .col-md-8": ["opacity: 0", "pointer-events: none"],
        ".col-md-3 h4": ["color: " + userScheme[7]],
    };    
}

function file(name) {
    try {
        return(chrome.runtime.getURL('src/resources/' + name));
    }
    catch(e){}
}

function combineCSSProperties(css1, css2) {
    const properties1 = css1.split(';').map(prop => prop.trim()).filter(Boolean);
    const properties2 = css2.split(';').map(prop => prop.trim()).filter(Boolean);
    const combinedProperties = {};
    
    properties1.forEach(property => {
      const [key, value] = property.split(':');
      combinedProperties[key.trim()] = value.trim();
    });
  
    properties2.forEach(property => {
      const [key, value] = property.split(':');
      if (!combinedProperties.hasOwnProperty(key.trim())) {
        combinedProperties[key.trim()] = value.trim();
      }
    });
  
    const combinedCSS = Object.entries(combinedProperties)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
  
    return combinedCSS;
  }

function addStyles(sheet) {
    for (const selector in sheet) {
        const nodes = document.querySelectorAll(selector);
        let styleStr = "";
        for (const prop in sheet[selector]) {
            try {
                styleStr += sheet[selector][prop] + "!important; ";
            }
            catch (e) {
                console.error(e);
            }
        }
        for (let i = 0; i < nodes.length; i++) {
            try {
                const originalProps = nodes[i].getAttribute("style");
                if(originalProps) {
                    styleStr = combineCSSProperties(styleStr, originalProps);
                }
                nodes[i].setAttribute("style", styleStr);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}

function injectFonts() {
    if (!document.fonts.has(raleway)) {
        document.fonts.add(raleway);
        document.fonts.add(ralewayThin);
        document.fonts.add(nunito);
    }
}

function replaceImages() {
    if(userScheme == darkTheme) {
        replaceHeaderImage("group-header-Classes", "chalkboard-icon");
        replaceHeaderImage("group-header-Groups", "groups-icon");
        replaceHeaderImage("group-header-Resources", "books-icon");
        replaceHeaderImage("group-header-News", "newspaper-icon");
        replaceHeaderImage("calendar-subnav", "calendar-icon");
        replaceHeaderImage("directory-subnav", "directory-icon");
    }
    else {
        replaceHeaderImage("group-header-Classes", "chalkboard-icon-black");
        replaceHeaderImage("group-header-Groups", "groups-icon-black");
        replaceHeaderImage("group-header-Resources", "books-icon-black");
        replaceHeaderImage("group-header-News", "newspaper-icon-black");
        replaceHeaderImage("calendar-subnav", "calendar-icon-black");
        replaceHeaderImage("directory-subnav", "directory-icon-black");
    }

}

function misc() {
    try {
        document.getElementById("__AjaxAntiForgery").remove();
    }
    catch(e){}
    try {
        document.getElementById("small-date-display-label").remove();
    }
    catch(e){}
    try {
        let as = []
        document.querySelectorAll("#courses").forEach((e)=>{as.push(e.querySelectorAll("a"))});
        document.querySelectorAll(".bb-tile-content").forEach((e)=>{e.querySelectorAll("a").forEach((e)=>{as.push(e)})})
        for (let i = 0; i < as.length; i++) {
            if(as[i].getAttribute("href")) {
                if(as[i].getAttribute("style")) {
                    as[i].setAttribute("style", combineCSSProperties("color: " + userScheme[3] + "!important;", as[i].getAttribute("style")));
                }
                else {
                    as[i].setAttribute("style", "color: " + userScheme[3] + "!important;")
                }
            }
        }
    }
    catch(e){}
    try {
        const wellsm = document.querySelector(".well-sm");
        wellsm.setAttribute("style", "background-color: transparent!important; border: none!important;");
        wellsm.querySelector("label").remove();
    }
    catch(e){}
}

function replaceHeaderImage(eid, str) {
    try {
        document.getElementById(eid).querySelector("img").src = file(str + ".png");
    }
    catch(e){}
}

async function init() {
    //get user theme
    let schemeName = null;
    await chrome.storage.sync.get(["theme"]).then((result) => {
        schemeName = result.theme;
    });
    
    if (schemeName == "dark") {
        userScheme = darkTheme;
        chrome.storage.sync.set({ "theme": "dark" });
    }
    else if (schemeName == "light") {
        userScheme = lightTheme;
        chrome.storage.sync.set({ "theme": "light" });
    }
    else {
        userScheme = darkTheme;
        chrome.storage.sync.set({ "theme": "dark" });
    }
    
    chrome.runtime.onMessage.addListener(
        async function(request) {
        if (request.message == "theme") {
            if (request.data == "dark") {
                userScheme = darkTheme;
                chrome.storage.sync.set({ "theme": "dark" });
            }
            else if (request.data == "light") {
                userScheme = lightTheme;
                chrome.storage.sync.set({ "theme": "light" });
            }
        }
    });
}

function loop() {
    updateInjectedStyles();
    addStyles(injectedStyles);
    injectFonts();
    replaceImages();
    misc();
    setTimeout(loop, loopDelay);
}

const loopDelay = 1000
init();
loop();