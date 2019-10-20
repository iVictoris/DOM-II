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

const rainbowShifter = () => {
  rainbow.unshift(rainbow.pop());
};

let rainbowIntervalID;

const setColor = nodeList => {
  nodeList.forEach((node, index) => {
    node.style.color = rainbow[(index + 1) % 7]; // color to reset to 0 at 7
  });
};

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
const modalContainer = document.createElement("section");
modalContainer.classList.add("modalContainer");
const modal = document.createElement("section");
modalContainer.appendChild(modal);

const body = document.querySelector("body");
const homeContainer = document.querySelector(".home");
homeContainer.prepend(modalContainer);

let keyPressTime;
let checkKeyPressIntervalId;
let isTyping;
let preventModal;

const getTime = () => new Date().getTime();
const getTimeDifference = (firstTime, secondTime, format) =>
  (secondTime - firstTime) / format;

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

  modalContainer.classList.add("appear");
  modal.classList.add("modalBox");
  modal.textContent = ev.key;
});

body.addEventListener("keyup", ev => {
  setTimeout(() => {
    if (!isTyping && !preventModal) {
      clearInterval(checkKeyPressIntervalId);
      modalContainer.classList.remove("appear");
      modal.textContent = "";
      modal.classList.remove("modalBox");
    }
  }, 500);
});

const imgs = document.querySelectorAll("img");
imgs.forEach(img =>
  img.addEventListener("click", ev => {
    // on click, we get the file path for the image
    const { src } = ev.target;
    // create new img

    const img = document.createElement("img");
    // link img to source
    img.src = src;
    modal.classList.add("imgModal");
    // place inside modal container
    modalContainer.classList.add("appear");
    modal.appendChild(img);
    preventModal = true;
  })
);

// add event listerner on modal container in which on click, the modal closes
modalContainer.addEventListener("click", function(ev) {
  preventModal = false;
  const img = ev.target.querySelector("img");
  if (img) {
    modal.removeChild(img);
    modal.classList = "";
    modalContainer.classList.remove("appear");
  }
});

// select event
const pList = document.querySelectorAll("p"); // should be the first p in the document
pList.forEach(p => {
  p.addEventListener("dblclick", ev => {
    p.contentEditable = true;
    p.classList.add("editable");
    p.focus();
    preventModal = true;
  });

  p.addEventListener("keydown", ({ keyCode }) => {
    if (keyCode === 27) {
      p.contentEditable = false;
      p.classList.remove("editable");
      setTimeout(() => {
        preventModal = false;
      }, 100)
    }
  });

  // p.addEventListener("select", ev => {
  //   console.log(ev);
  // });
});
