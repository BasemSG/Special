let backgroundOption = true;
let backgroundInterval;
let randomImgs = () => {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * landingImgs.length);
      landingElement.style.backgroundImage = `url(imgs/${landingImgs[randomNum]})`;
    }, 10000);
  }
};
// start setting-box
let sidebar = document.querySelector("div.sidebar");
let settingIconContainer = document.querySelector(
  "div.sidebar div.setting-icon"
);
let settingIcon = document.querySelector("div.sidebar div.setting-icon i");
let sidebarContent = document.querySelector("div.sidebar div.setting-content");
let myColors = document.querySelectorAll(
  "div.sidebar div.setting-content div.setting-box ul li"
);
let rootElement = document.querySelector(":root");
//get color value from localstorage
if (window.localStorage.getItem("--main-color") !== null) {
  rootElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("--main-color")
  );
  myColors.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === window.localStorage.getItem("--main-color")) {
      el.classList.add("active");
    }
  });
}
//add spinner class to the icon and show the setting box
settingIconContainer.onclick = () => {
  settingIcon.classList.toggle("spinner");
  sidebar.classList.toggle("show-box");
};
//set background colors for the colors
for (let i = 0; i < myColors.length; i++) {
  myColors[i].style.backgroundColor = `${myColors[i].dataset.color}`;
}
//choose the color of the page
myColors.forEach((el) => {
  el.addEventListener("click", () => {
    myColors.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    let activeColor = document.querySelector(
      `div.sidebar div.setting-content div.setting-box ul li[class = "active"]`
    );
    rootElement.style.setProperty("--main-color", activeColor.dataset.color);
    window.localStorage.setItem("--main-color", activeColor.dataset.color);
  });
});
//background random control
let backgroundOptions = document.querySelectorAll(
  "div.setting-box div.imgs-option button"
);
if (window.localStorage.getItem("random-background")) {
  if (window.localStorage.getItem("random-background") !== "yes") {
    backgroundOption = false;
  } else {
    backgroundOption = true;
  }

  backgroundOptions.forEach((el) => {
    el.classList.remove("active");
    if (
      el.dataset.option === window.localStorage.getItem("random-background")
    ) {
      el.classList.add("active");
    }
  });
}

backgroundOptions.forEach((el) => {
  el.addEventListener("click", () => {
    backgroundOptions.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    window.localStorage.setItem("random-background", el.dataset.option);
    if (el.dataset.option === "yes") {
      backgroundOption = true;
      randomImgs();
    } else if (el.dataset.option === "no") {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});
//bullets show control
let bulletsOptions = document.querySelectorAll(
  "div.setting-box div.bullets-option button"
);
if (window.localStorage.getItem("show-bullets")) {
  if (window.localStorage.getItem("show-bullets") === "yes") {
    document.querySelector("ul.bullets").classList.remove("hide-bullets");
  } else {
    document.querySelector("ul.bullets").classList.add("hide-bullets");
  }
  bulletsOptions.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.option === window.localStorage.getItem("show-bullets")) {
      el.classList.add("active");
    }
  });
}
bulletsOptions.forEach((el) => {
  el.addEventListener("click", () => {
    bulletsOptions.forEach((el) => {
      el.classList.remove("active");
    });
    el.classList.add("active");
    window.localStorage.setItem("show-bullets", el.dataset.option);
    if (el.dataset.option === "yes") {
      document.querySelector("ul.bullets").classList.remove("hide-bullets");
    } else {
      document.querySelector("ul.bullets").classList.add("hide-bullets");
    }
  });
});
//reset button
let resetBtn = document.querySelector(".sidebar button.reset");
resetBtn.addEventListener("click", () => {
  //reset color
  myColors.forEach((el) => {
    el.classList.remove("active");
  });
  myColors[0].classList.add("active");
  document.documentElement.style.setProperty(
    "--main-color",
    myColors[0].dataset.color
  );
  window.localStorage.setItem("--main-color", myColors[0].dataset.color);
  //reset background
  backgroundOptions.forEach((el) => {
    el.classList.remove("active");
  });
  backgroundOptions[0].classList.add("active");
  document.documentElement.style.setProperty(
    "random-background",
    backgroundOptions[0].dataset.option
  );
  window.localStorage.setItem(
    "random-background",
    backgroundOptions[0].dataset.option
  );
  backgroundOption = true;
  // randomImgs();
  //reset bullets
  bulletsOptions.forEach((el) => {
    el.classList.remove("active");
  });
  bulletsOptions[0].classList.add("active");
  document.documentElement.style.setProperty(
    "show-bullets",
    bulletsOptions[0].dataset.option
  );
  window.localStorage.setItem("show-bullets", bulletsOptions[0].dataset.option);
  document.querySelector("ul.bullets").classList.remove("hide-bullets");
  //close the sidebar
  sidebar.classList.remove("show-box");
  //stop spinner
  settingIcon.classList.remove("spinner");
});
// end setting-box

// start header
let navIcon = document.querySelector("div.header div.container i.links");
let ulLinks = document.querySelector("div.header div.container ul");
navIcon.addEventListener("click", () => {
  ulLinks.classList.toggle("show");
});
// end header

// start landing
randomImgs();
let landingElement = document.querySelector("div.landing");
let landingImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
landingElement.style.backgroundImage = `url(imgs/01.jpg)`;
// end landing

// start our-skills
let progressElement = document.querySelectorAll(
  "div.our-skills div.container div.skills div.skill div.progress span.progress"
);
let skillsElement = document.querySelector("div.our-skills");
window.onscroll = function () {
  if (window.scrollY >= skillsElement.offsetTop - 200) {
    progressElement.forEach((span) => {
      span.style.width = `${span.dataset.width}`;
    });
  }
};
// end our-skills

// start our-gallery
let galleryImgs = document.querySelectorAll(
  "div.our-gallery div.container div.imgs-container img"
);
let layoutViwer = document.querySelector(".our-gallery .layout");
let imgView = document.querySelector(".img-clicked img");
let imgTitle = document.querySelector("div.img-clicked h3");
let closeBtn = document.querySelector(".img-clicked .close");

galleryImgs.forEach((el) => {
  el.onclick = () => {
    imgView.attributes.src.value = el.attributes.src.value;
    layoutViwer.classList.add("show");
    imgTitle.textContent = `image ${el.attributes.alt.value}`;
  };
});
closeBtn.onclick = () => {
  layoutViwer.classList.remove("show");
};
// end our-gallery
// to top button
let topBtn = document.querySelector("button.top");
window.addEventListener("scroll", () => {
  if (window.scrollY >= document.querySelector("div.our-features").offsetTop) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behaviour: "smooth",
  });
});
