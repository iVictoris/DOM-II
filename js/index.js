// Your code goes here
// mouseover -> colorize nav h1 with rainbow

const rainbow = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet"
];

const navH1 = document.querySelector(`.logo-heading`);
const body = document.querySelector("body");
const homeContainer = document.querySelector(".home");
const imgs = document.querySelectorAll("img");
const ps = document.querySelectorAll("p"); // should be the first p in the document

const modalContainer = document.createElement("section");
const modal = document.createElement("section");
const p = document.createElement("p");

let rainbowIntervalID;
let keyPressTime;
let checkKeyPressIntervalId;
let isTyping;
let preventModal;

const rainbowShifter = () => {
  rainbow.unshift(rainbow.pop());
};
const setColor = nodeList => {
  nodeList.forEach((node, index) => {
    node.style.color = rainbow[(index + 1) % 7]; // color to reset to 0 at 7
  });
};

const showModalContainer = () => {
  modalContainer.classList.add("appear");
};

const hideModalContainer = () => {
  modalContainer.classList.remove("appear");
};

const getTime = () => new Date().getTime();
const getTimeDifference = (firstTime, secondTime, format) =>
  (secondTime - firstTime) / format;


navH1.addEventListener("mouseenter", e => {
  // assign a letter a color
  const text = navH1.textContent;
  const textSpans = text.split("").map(letter => {
    const span = document.createElement("span");
    span.textContent = letter;
    return span;
  });

  e.target.textContent = "";
  textSpans.forEach(node => {
    navH1.appendChild(node);
  });

  // shift the color over by .1 each second
  rainbowIntervalID = setInterval(() => {
    rainbowShifter();
    setColor(textSpans);
  }, 100);
});

navH1.addEventListener("mouseleave", e => {
  e.target.textContent = "Fun Bus";
  clearInterval(rainbowIntervalID);
});

// keydown => animate key press on screen in box
modalContainer.classList.add("modalContainer");
modalContainer.appendChild(modal);

homeContainer.prepend(modalContainer);

body.addEventListener("keydown", ev => {
  if (preventModal) return;
  keyPressTime = getTime();
  if (checkKeyPressIntervalId) {
    clearInterval(checkKeyPressIntervalId);
  }

  checkKeyPressIntervalId = setInterval(() => {
    const now = getTime();
    isTyping = getTimeDifference(keyPressTime, now, 100) < 5;
  }, 100); // every half a second, check if user is still typing

  showModalContainer();
});

body.addEventListener("keyup", ev => {
  setTimeout(() => {
    if (!isTyping && !preventModal) {
      clearInterval(checkKeyPressIntervalId);
      hideModalContainer();
    
    }
  }, 500);
});

imgs.forEach(img =>
  img.addEventListener("click", ev => {
    // on click, we get the file path for the image
    const { src } = ev.target;
    // create new img

    const img = document.createElement("img");
    // link img to source
    img.src = src;
    // place inside modal container
    showModalContainer();
    
    preventModal = true;
  })
);

// add event listerner on modal container in which on click, the modal closes
modalContainer.addEventListener("click", function(ev) {
  preventModal = false;
  const img = ev.target.querySelector("img");
  if (img) {
    
    hideModalContainer();
  }
});

// select event
ps.forEach(pNode => {
  pNode.addEventListener("dblclick", ev => {
    pNode.contentEditable = true;
    pNode.classList.add("editable");
    pNode.focus();
    preventModal = true;
  });

  pNode.addEventListener("keydown", ({ keyCode }) => {
    if (keyCode === 27) {
      pNode.contentEditable = false;
      pNode.classList.remove("editable");
      setTimeout(() => {
        preventModal = false;
      }, 100);
    }
  });

  pNode.addEventListener("focus", ev => {
    p.textContent = pNode.textContent;
    p.contentEditable = true;
    modal.appendChild(p);
    showModalContainer();
  });

  // p.addEventListener("select", ev => {
  //   console.log(ev);
  // });
});
