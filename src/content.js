//this function edits the css of an element
function css(element, style) {
    for (const property in style) {
        try {
            element.style[property] = style[property];
        }
        catch(error){}
    }
}

//If I want to edit a whole class of elements at once in the same way, I use this
function bulkedit(elements, editsList, idClassElements, removeClass) {
    for(let i = 0; i < elements.length; i++) {
        if (idClassElements == "id") {
            try {
                css(document.getElementById(elements[i]), editsList);
            }
            catch(error){}
        }
        else if (idClassElements == "class") {
            try {
                css(document.getElementsByClassName(elements[i])[0], editsList);
            }
            catch(error){}
        }
        else if (idClassElements == "elements") {
            try {
                css(elements[i], editsList);
            }
            catch (error){}
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

function assignmentCenter(i) {
    //Defines a bunch of nodes to change
    const body = document.getElementsByTagName("body")[0];
    const headerContainer = document.getElementById("site-header-container");
    //const logoImage = document.getElementById("site-logo").getElementsByTagName("img")[0];
    const navContainer = document.getElementById("site-nav-container");
    const chalkboardImage = document.getElementById("group-header-Classes").getElementsByTagName("img")[0];
    const groupsImage = document.getElementById("group-header-Groups").getElementsByTagName("img")[0];
    const resourcesImage = document.getElementById("group-header-Resources").getElementsByTagName("img")[0];
    const newsImage = document.getElementById("group-header-News").getElementsByTagName("img")[0];
    const calendarImage = document.getElementById("calendar-subnav").getElementsByTagName("img")[0];
    const directoryImage = document.getElementById("directory-subnav").getElementsByTagName("img")[0];
    const navOptions = navContainer.getElementsByClassName("title sky-nav");
    const navSubs = navContainer.getElementsByClassName("desc");
    const navDropArrows = navContainer.getElementsByClassName("caret");
    const subNavBar = document.getElementById("site-nav-lower");
    //These lists of nodes will all be edited at once with the bulkEdit() function
    const subNavButtonNames = ["checklist-btn", "requirement-btn", "course-requests-btn", "assignment-center-btn", "schedule-btn", "progress-btn"]
    const linkButtonNames = ["bulletin-board-link", "topics-link", "assignments-link", "roster-link"];
    const dateDisplay = document.getElementById("small-date-display-label");
    const assignmentFiltersHeader = document.getElementsByClassName("bb-action-bar hidden-xs hidden-sm")[0];
    const assignmentFilters = document.getElementsByClassName("bb-action-bar hidden-xs hidden-sm")[1];
    const assignmentSort = document.getElementsByClassName("table table-sky table-striped table-mobile-stacked")[0].getElementsByTagName("thead")[0];
    const assignmentSortText = assignmentSort.getElementsByClassName("add-existing-items-header")[0].getElementsByTagName("th");
    const assignmentsHeaderBackground = document.getElementsByClassName("bb-tile-title")[0];
    const dateTitle = document.getElementById("date-display-label");
    const assignments = document.getElementById("assignment-center");
    const assignmentItems = document.getElementById("assignment-center-assignment-items").getElementsByTagName("tr");
    const assignmentFilterButtons1 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("label");
    const assignmentFilterButtons2 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("button");
    const assignmentFilterButtons3 = document.getElementsByClassName("assignment-calendar-header")[0].getElementsByTagName("a");
    const uselessButtons1 = document.getElementsByClassName("col-md-4")[0];
    const viewButtons = document.getElementsByClassName("btn-default");
    const assignmentsBackground = document.getElementsByClassName("bb-tile-content")[0];
    const assignmentsHeader = document.getElementsByClassName("bb-tile-header")[0];

    //The original code is awful. Idk why I need to do this but I do
    headerContainer.classList.remove('pri-100-bgc');
    navContainer.classList.remove('sec-15-bgc');

    try {
        dateDisplay.remove();
    }
    catch(error){}
    if (i==1) {
        try {
            uselessButtons1.remove();
        }
        catch(error){}
    }

    //Bulk edit some lists of elements
    bulkedit(navOptions, { "color": "white" }, "elements", "pri-100-fgc");
    bulkedit(navSubs, { "color": "white" }, "elements", "black-fgc");
    bulkedit(navDropArrows, { "color": "white" }, "elements", null);
    bulkedit(subNavButtonNames, { "color": "black" }, "id", null);
    bulkedit(linkButtonNames, { "color": "black" }, "id", null);
    bulkedit(assignmentItems, { "background-color": "#414a72" }, "elements", null);
    bulkedit(assignmentSortText, { "color": "white"}, "elements", null);
    bulkedit(assignmentFilterButtons1, { "color": "white", "background-color": "#262935"}, "elements", null);
    bulkedit(assignmentFilterButtons2, { "color": "white", "background-color": "#262935"}, "elements", null);
    bulkedit(assignmentFilterButtons3, { "color": "white", "background-color": "#262935"}, "elements", null);
    bulkedit(viewButtons, { "border-color": "transparent" }, "elements", null);
    for (let i = 0; i < assignmentItems.length; i = (i + 2)) {
        css(assignmentItems[i], {
            "background-color": "#414a72",
            "font-family": "ralewayThin"
        })
        let assignmentText = assignmentItems[i].getElementsByTagName("td");
        for (let i = 0; i < assignmentText.length; i++) {
            if (!((assignmentText[i].getAttribute("data-heading") == "Details")||(assignmentText[i].getAttribute("data-heading") == "Status"))) {
                css(assignmentText[i], {
                    "color": "white",
                    "font-family": "ralewayThin"
                })
            }
            else if(assignmentText[i].getAttribute("data-heading") == "Details") {
                let text = assignmentText[i].getElementsByTagName("a")[0];
                text.style["color"] = "#9bb4ff"
            }
        }
    }
    for (let i = 1; i < assignmentItems.length; i = (i + 2)) {
        css(assignmentItems[i], {
            "background-color": "#3f4869"
        })
        let assignmentText = assignmentItems[i].getElementsByTagName("td")
        for (let i = 0; i < assignmentText.length; i++) {
            if (!((assignmentText[i].getAttribute("data-heading") == "Details")||(assignmentText[i].getAttribute("data-heading") == "Status"))) {
                css(assignmentText[i], {
                    "color": "white",
                    "font-family": "ralewayThin"
                })
            }
            else if(assignmentText[i].getAttribute("data-heading") == "Details") {
                let text = assignmentText[i].getElementsByTagName("a")[0];
                text.style["color"] = "#9bb4ff"
            }
        }

    }

    //Change some images/icons on the site to my own. These images can be found in src/resources/
    chalkboardImage.src = file("chalkboard-icon.png");
    groupsImage.src = file("groups-icon.png");
    resourcesImage.src = file("books-icon.png");
    newsImage.src = file("newspaper-icon.png");
    calendarImage.src = file("calendar-icon.png");
    directoryImage.src = file("directory-icon.png");
    //logoImage.src = file("kaiscades-academy.png");

    //Edit the css of a bunch of elements using the css() function
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

    css(body, {
        "background-color": '#2b2b3a'
    });
    css(headerContainer, {
        "background-color": 'rgb(30 45 89)',
    });
    css(navContainer, {
        "background-color": "#293b72",
        "font-family": "raleway",
    });
    css(subNavBar, {
        "color": "white"
    });
    css(assignmentFiltersHeader, {
        "background-color": "#293b72",
        "border-top": "none",
        "border-bottom": "none",
        "border-style": "outset",
        "border-color": "white",
        'border-radius': '5px 5px 0px 0px',
    })
    css(assignmentFilters, {
        "background-color": "#293b72",
        "border-top": "none",
        "border-bottom": "none",
        "border-style": "outset",
        "border-color": "white",
        "border-top-color": "transparent"
    })
    css(assignmentSort, {
        "background-color": "#2b2b3a",
        "border-top": "none",
        "border-bottom": "none"
    })
    css(assignmentsHeaderBackground, {
        "background-color": 'rgb(30 45 89)',
        'border-top': 'none',
        'border': '2px solid white',
        'border-radius': '25px 25px 0px 0px',
    });
    css(dateTitle, {
        "font-family": "raleway",
        "color": "white"
    })
    css(assignments, {
        "font-family": "raleway"
    });
    css(assignmentsBackground, {
        "background-color": "#323a56",
        'border': '2px solid white',
        'border-radius': '0px 0px 25px 25px'
    });
    css(assignmentsHeader, {
        "font-family": "nunito",
        "color": "white",
        'transform': 'translate(250%, 2px)',
        "text-shadow": "0px 0px 10px black"
    });

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
    var i = 1;
    let loc = window.location.href;
    function loop() {
        if (!(loc == window.location.href)) {
            loc = window.location.href;
            i = 0;
        }
        if (window.location.href.indexOf("studentmyday/assignment-center") > -1) {
            try {
                assignmentCenter(i);
            }
            catch(error){}
        }
        else if (window.location.href.indexOf("assignmentdetail") > -1) {
            console.log("detail");
        }
        i++;

        setTimeout(() => {loop();}, 1500);
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