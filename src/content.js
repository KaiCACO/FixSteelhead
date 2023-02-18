//this function edits the css of an element
function css(element, style) {
    for (const property in style) {
        try {
            element.style[property] = style[property];
        }
        catch(error){
            console.log(error);
        }
    }
}

//If I want to edit a whole class of elements at once in the same way, I use this
function bulkedit(elements, editsList, idClassElements, removeClass) {
    for(let i = 0; i < elements.length; i++) {
        if (idClassElements == "id") {
            css(document.getElementById(elements[i]), editsList);
        }
        else if (idClassElements == "class") {
            css(document.getElementsByClassName(elements[i])[0], editsList);
        }
        else if (idClassElements == "elements") {
            css(elements[i], editsList);
        }
        if (!(removeClass == null)) {
            try {
                elements[i].classList.remove(removeClass);
            }
            catch(error){}
        }
    }
}

//Gets the temporary URL of a file in the extension
function file(name) {
    return(chrome.runtime.getURL('src/resources/' + name));
}

let darkTheme = ['#293b72', '#262935', '#414a72', '#9bb4ff', '#3f4869', '#2b2b3a', '#323a56', '#ffffff', '#000000', '#1e2d59', '#1e2d59'];
let lightTheme = ['#ffffff', "#bbc6f2", "#e4e7f0", '#5579e6', "#f0f4ff", "#ffffff", "#a4b7ff", '#000000', '#ffffff', "#d7e0fc", '#1e2d59'];
let userScheme = null;

let schemeName = chrome.storage.sync.get('theme');
if (schemeName == "dark") {
    userScheme = darkTheme;
    chrome.storage.sync.set({ "theme": "dark" });
}
else if (schemeName == "light") {
    userScheme = lightTheme;
    chrome.storage.sync.set({ "theme": "light" });
}

chrome.runtime.onMessage.addListener(
    function(request) {
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

function allPages() {
    const logoImage = document.getElementById("site-logo").getElementsByTagName("img")[0];
    const chalkboardImage = document.getElementById("group-header-Classes").getElementsByTagName("img")[0];
    const groupsImage = document.getElementById("group-header-Groups").getElementsByTagName("img")[0];
    const resourcesImage = document.getElementById("group-header-Resources").getElementsByTagName("img")[0];
    const newsImage = document.getElementById("group-header-News").getElementsByTagName("img")[0];
    const calendarImage = document.getElementById("calendar-subnav").getElementsByTagName("img")[0];
    const directoryImage = document.getElementById("directory-subnav").getElementsByTagName("img")[0];
    const headerContainer = document.getElementById("site-header-container");
    const navContainer = document.getElementById("site-nav-container");
    const navOptions = navContainer.getElementsByClassName("title sky-nav");
    const navSubs = navContainer.getElementsByClassName("desc");
    const navDropArrows = navContainer.getElementsByClassName("caret");
    const subNavBar = document.getElementById("site-nav-lower");
    
    //Change some images/icons on the site to my own. These images can be found in src/resources/
    if (userScheme == darkTheme) {
        chalkboardImage.src = file("chalkboard-icon.png");
        groupsImage.src = file("groups-icon.png");
        resourcesImage.src = file("books-icon.png");
        newsImage.src = file("newspaper-icon.png");
        calendarImage.src = file("calendar-icon.png");
        directoryImage.src = file("directory-icon.png");
    }
    else if (userScheme == lightTheme) {
        chalkboardImage.src = file("chalkboard-icon-black.png");
        groupsImage.src = file("groups-icon-black.png");
        resourcesImage.src = file("books-icon-black.png");
        newsImage.src = file("newspaper-icon-black.png");
        calendarImage.src = file("calendar-icon-black.png");
        directoryImage.src = file("directory-icon-black.png");
    }
    logoImage.src = file("kaiscades-academy.png");

    //The original code is awful. Idk why I need to do this but I do
    try {
        headerContainer.classList.remove('pri-100-bgc');
        navContainer.classList.remove('sec-15-bgc');
    }
    catch(e){}

    //Some bulk edits
    bulkedit(navOptions, { "color": userScheme[7] }, "elements", "pri-100-fgc");
    bulkedit(navSubs, { "color": userScheme[7] }, "elements", "black-fgc");
    bulkedit(navDropArrows, { "color": userScheme[7] }, "elements", null);
    
    css(headerContainer, {
        "background-color": userScheme[10],
    });
    css(navContainer, {
        "background-color": userScheme[0],
        "font-family": "raleway",
    });
    css(subNavBar, {
        "color": userScheme[7]
    });
    css(chalkboardImage, {
        "transform": "translateY(2px)",
        "width": "30px",
        "height": "25px"
    })
    css(groupsImage, {
        "width": "28px",
        "height": "28px"
    })
    css(resourcesImage, {
        "width": "30px",
        "height": "30px"
    })
    css(newsImage, {
        "width": "29px",
        "height": "29px"
    })
    css(calendarImage, {
        "width": "28px",
        "height": "28px"
    })
    css(directoryImage, {
        "width": "28px",
        "height": "28px"
    })
    
}

function assignmentCenter() {
    //Defines a bunch of nodes to change
    const body = document.getElementsByTagName("body")[0];
    //These lists of nodes will all be edited at once with the bulkEdit() function
    const subNavButtonNames = ["checklist-btn", "requirement-btn", "course-requests-btn", "assignment-center-btn", "schedule-btn", "progress-btn"]
    const dateDisplay = document.getElementById("small-date-display-label");
    const assignmentFiltersHeader = document.getElementsByClassName("bb-action-bar hidden-xs hidden-sm")[0];
    const assignmentFilters = document.getElementsByClassName("bb-action-bar hidden-xs hidden-sm")[1];
    const assignmentsHeaderBackground = document.getElementsByClassName("bb-tile-title")[0];
    const dateTitle = document.getElementById("date-display-label");
    const assignments = document.getElementById("assignment-center");
    const assignmentItems = document.getElementById("assignment-center-assignment-items").getElementsByTagName("tr");
    const assignmentFilterButtons1 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("label");
    const assignmentFilterButtons2 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("button");
    const assignmentFilterButtons3 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("a");
    const uselessButtons1 = document.getElementsByClassName("col-md-4")[0];
    const uselessButton2 = document.getElementById("add-task");
    const uselessButton3 = document.getElementById("filter-student-sections");
    const viewButtons = document.getElementsByClassName("btn-default");
    const assignmentsBackground = document.getElementsByClassName("bb-tile-content")[0];
    const assignmentsHeader = document.getElementsByClassName("bb-tile-header")[0];
    const assignmentSort = document.getElementsByClassName("table table-sky table-striped table-mobile-stacked")[0].getElementsByTagName("thead")[0];

    try {
        dateDisplay.remove();
        uselessButtons1.remove();
        uselessButton2.remove();
        uselessButton3.remove();
    }
    catch(e){}

    //Bulk edit some lists of elements
    bulkedit(subNavButtonNames, { "color": "black" }, "id", null);
    bulkedit(assignmentItems, { "background-color": userScheme[2] }, "elements", null);
    //bulkedit(assignmentSortText, { "color": userScheme[7]}, "elements", null);
    bulkedit(assignmentFilterButtons1, { "color": userScheme[7], "background-color": userScheme[1]}, "elements", null);
    bulkedit(assignmentFilterButtons2, { "color": userScheme[7], "background-color": userScheme[1]}, "elements", null);
    bulkedit(assignmentFilterButtons3, { "color": userScheme[7], "background-color": userScheme[1]}, "elements", null);
    bulkedit(viewButtons, { "border-color": "transparent" }, "elements", null);
    for (let i = 0; i < assignmentItems.length; i = (i + 2)) {
        css(assignmentItems[i], {
            "background-color": userScheme[2],
            "font-family": "ralewayThin"
        })
        let assignmentText = assignmentItems[i].getElementsByTagName("td");
        for (let i = 0; i < assignmentText.length; i++) {
            if (!((assignmentText[i].getAttribute("data-heading") == "Details")||(assignmentText[i].getAttribute("data-heading") == "Status"))) {
                css(assignmentText[i], {
                    "color": userScheme[7],
                    "font-family": "ralewayThin"
                })
            }
            else if(assignmentText[i].getAttribute("data-heading") == "Details") {
                let text = assignmentText[i].getElementsByTagName("a")[0];
                text.style["color"] = userScheme[3];
            }
        }
    }
    for (let i = 1; i < assignmentItems.length; i = (i + 2)) {
        css(assignmentItems[i], {
            "background-color": userScheme[4]
        })
        let assignmentText = assignmentItems[i].getElementsByTagName("td")
        for (let i = 0; i < assignmentText.length; i++) {
            if (!((assignmentText[i].getAttribute("data-heading") == "Details")||(assignmentText[i].getAttribute("data-heading") == "Status"))) {
                css(assignmentText[i], {
                    "color": userScheme[7],
                    "font-family": "ralewayThin"
                })
            }
            else if(assignmentText[i].getAttribute("data-heading") == "Details") {
                let text = assignmentText[i].getElementsByTagName("a")[0];
                text.style["color"] = userScheme[3]
            }
        }

    }

    //Edit the css of a bunch of elements using the css() function
    css(body, {
        "background-color": userScheme[5]
    });
    
    css(assignmentFiltersHeader, {
        "background-color": userScheme[0],
        "border-top": "none",
        "border-bottom": "none",
        "border-style": "outset",
        "border-color": userScheme[7],
        'border-radius': '5px 5px 0px 0px',
    })
    css(assignmentFilters, {
        "background-color": userScheme[0],
        "border-top": "none",
        "border-bottom": "none",
        "border-style": "outset",
        "border-color": userScheme[7],
        "border-top-color": "transparent"
    })
    css(assignmentSort, {
        "background-color": userScheme[5],
        "border-top": "none",
        "border-bottom": "none"
    })
    css(assignmentsHeaderBackground, {
        "background-color": userScheme[9],
        'border-top': 'none',
        'border': '2px solid ' + userScheme[7],
        'border-radius': '25px 25px 0px 0px',
    });
    css(dateTitle, {
        "font-family": "raleway",
        "color": userScheme[7]
    })
    css(assignments, {
        "font-family": "ralewayThin"
    });
    css(assignmentsBackground, {
        "background-color": userScheme[6],
        'border': '2px solid ' + userScheme[7],
        'border-radius': '0px 0px 25px 25px'
    });
    css(assignmentsHeader, {
        "font-family": "nunito",
        "color": userScheme[7],
        'transform': 'translate(250%, 2px)',
        "text-shadow": ("0px 0px 10px " + userScheme[8])
    });

}

function assignmentDetail() {
    const body = document.getElementsByTagName("body")[0];
    const titleHeaderText = document.getElementsByClassName("bb-tile-header")[0];
    const statusText = document.getElementsByClassName("bb-tile-header")[1];
    const titleHeader = document.getElementsByClassName("bb-tile-title")[0];
    const statusHeader = document.getElementsByClassName("bb-tile-title")[1];
    const viewPanels = document.getElementsByClassName("bb-tile-content");
    const statusDropdown = document.getElementsByClassName("tile-body whiteContainer1")[0];
    const statusBackground = document.getElementsByClassName("assignment-detail-header completed")[0];
    const statusIndicator = document.getElementsByClassName("indicator-field p3formWhite dropdown-toggle assignment-status-button")[0];
    const saveLater = document.getElementById("save-button");
    const submit = document.getElementById("sub-button");

    try {
        saveLater.remove();
    }
    catch(e){}
    css(submit, {
        "transform": "translateX(-108%)",
        "background-image": "none",
        "background": "rgb(255,0,0)",
        "background": "radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(250,0,0,1) 100%)"
    })
    bulkedit(viewPanels, { 'border-radius': '0px 0px 25px 25px', "background-color": "#eceff8" }, "elements", null);

    css(body, {
        'background-color': userScheme[5]
    })
    css (titleHeaderText, {
        "font-family": "nunito",
        "color": userScheme[7],
        "text-shadow": "0px 0px 10px black",
        'transform': 'translate(60%, 2px)'
    });
    css (statusText, {
        "font-family": "nunito",
        "color": userScheme[7],
        "text-shadow": "0px 0px 10px black",
        'transform': 'translateY(3px)'
    });
    css (titleHeader, {
        "border": "2px solid " + userScheme[7],
        'border-radius': '25px 25px 0px 0px',
        "background-color": userScheme[9],
    });
    css (statusHeader, {
        "border": "2px solid " + userScheme[7],
        'border-radius': '25px 25px 0px 0px',
        "background-color": userScheme[9],
    });
    css (statusDropdown, {
        "border-radius": "10px"
    })
    css (statusBackground, {
        "background-color": "transparent"
    })
    css (statusIndicator, {
        "border-radius": "9px",
        "width": "110px"
    })
}

//Init is called when the window loads.
function init() {
    //adds some new fonts to the page's font library
    const raleway = new FontFace("raleway", "url(" + file('Raleway.ttf') + ")");
    const ralewayThin = new FontFace("ralewayThin", "url(" + file('RalewayThin.ttf') + ")");
    const nunito = new FontFace("nunito", "url(" + file('Nunito.ttf') + ")");
    document.fonts.add(raleway);
    document.fonts.add(ralewayThin);
    document.fonts.add(nunito);
    //does a different list of actions depending on the page within steelhead
    let loc = window.location.href;
    function loop() {
        allPages();
        if (!(loc == window.location.href)) {
            loc = window.location.href;
        }
        if (window.location.href.indexOf("studentmyday/assignment-center") > -1) {
            setTimeout(() => {assignmentCenter();}, 500);
        }
        else if (window.location.href.indexOf("assignmentdetail") > -1) {
            setTimeout(() => {assignmentDetail();}, 500);
        }
        setTimeout(() => {loop();}, 800);
    }
    loop();

}

function waitForTarget() {
    let AC = document.getElementById("month-view");
    let AD = document.getElementById("assignment-detail-assignment");
    if ((!(AC==null))||(!(AD==null))) {
        setTimeout(() => {init();}, 200);
    }
    else {
        setTimeout(() => {waitForTarget();}, 200);
    }

};

waitForTarget();