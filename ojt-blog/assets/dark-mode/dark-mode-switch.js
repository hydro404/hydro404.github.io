/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */

var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");

    let paths = document.querySelectorAll("#mySVG path");
      paths.forEach(function(path) {
          path.setAttribute("stroke", "white");
    });

    const svgIds = ["#fave", "#projects2", "#archiv", "#addressSVG", "#phoneSVG", "#emailSVG"];
    // Loop through each SVG ID
    svgIds.forEach(svgId => {
        let paths = document.querySelectorAll(svgId + " path");
        paths.forEach(function(path) {
            path.setAttribute("fill", "white");
            path.setAttribute("stroke", "white");
        });
    });
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");

    let paths = document.querySelectorAll("#mySVG path");
      paths.forEach(function(path) {
          path.setAttribute("stroke", "black");
    });

    const svgIds = ["#fave", "#projects2", "#archiv", "#addressSVG", "#phoneSVG" , "#emailSVG"];
    // Loop through each SVG ID
    svgIds.forEach(svgId => {
        let paths = document.querySelectorAll(svgId + " path");
        paths.forEach(function(path) {
            path.setAttribute("fill", "black");
            path.setAttribute("stroke", "black");
        });
    });
  }
}

var darkSwitch2 = document.getElementById("darkSwitch2");
var darkThemeSelected;

window.addEventListener("load", function () {
 darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";

  if (darkThemeSelected) {
    document.body.setAttribute("data-theme", "dark");
    let paths = document.querySelectorAll("#mySVG path");
      paths.forEach(function(path) {
          path.setAttribute("stroke", "white");
    });

    const svgIds = ["#fave", "#projects2", "#archiv", "#addressSVG", "#phoneSVG", "#emailSVG"];
    // Loop through each SVG ID
    svgIds.forEach(svgId => {
        let paths = document.querySelectorAll(svgId + " path");
        paths.forEach(function(path) {
            path.setAttribute("fill", "white");
            path.setAttribute("stroke", "white");
        });
    });
  } else {
    document.body.removeAttribute("data-theme");
    let paths = document.querySelectorAll("#mySVG path");
      paths.forEach(function(path) {
          path.setAttribute("stroke", "black");
    });

    const svgIds = ["#fave", "#projects2", "#archiv", "#addressSVG", "#phoneSVG", "#emailSVG"];
    // Loop through each SVG ID
    svgIds.forEach(svgId => {
        let paths = document.querySelectorAll(svgId + " path");
        paths.forEach(function(path) {
            path.setAttribute("fill", "black");
            path.setAttribute("stroke", "black");
        });
    });
  }

  console.log(darkThemeSelected);
  darkSwitch2.checked = darkThemeSelected;
});
          
$("#darkSwitch2").click(function(){
  if(localStorage.getItem("darkSwitch") === "dark"){
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
  else{
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  }              
});