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
let activeEditable;

const rainbowShifter = () => {
  rainbow.unshift(rainbow.pop());
};
const setColor = nodeList => {
  nodeList.forEach((node, index) => {
    node.style.color = rainbow[(index + 1) % 7]; // color to reset to 0 at 7
  });
};

const stopKeyPressModal = () => {
  preventModal = true;
};

const startKeyPressModal = () => {
  setTimeout(() => {
    preventModal = false;
  }, 100)
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
  }, 100); // every tenth of a second, check if user is still typing

  showModalContainer();
  modal.textContent = ev.key;
  modal.classList = "modalBox";
});

body.addEventListener("keyup", ev => { 
  setTimeout(() => {
    if (!isTyping && !preventModal) {
      clearInterval(checkKeyPressIntervalId);
      hideModalContainer();
      modal.textContent = "";
      modal.classList = "";
    }
  }, 500);
});

imgs.forEach(img =>
  img.addEventListener("click", ev => {
    stopKeyPressModal();
    showModalContainer();

    const { src } = ev.target;
    const img = document.createElement("img");
    img.src = src;

    // place inside modal container
    if (modal.contains(img)) {
      return;
    }
    modal.appendChild(img);
    modal.classList = "imgModal";
    modalContainer.focus();
  })
);

// add event listerner on modal container in which on click, the modal closes
modalContainer.addEventListener("click", function(ev) {
  const img = ev.target.querySelector("img");
  if (img) {
    modal.removeChild(img);
  }
  hideModalContainer();
  modal.classList = "";

  startKeyPressModal();
});



// select event
ps.forEach(pNode => {
  // when double clicked
  pNode.addEventListener("dblclick", ev => {
    stopKeyPressModal();
    activeEditable = pNode;
    pNode.contentEditable = true;
    pNode.classList.add("editable");
    // pNode is copied to p
    p.textContent = pNode.textContent;
    p.contentEditable = true;
    p.classList = 'editing'
    // p is added to modal
    modal.appendChild(p);
    modal.classList = "focusModal";
    // modal appears

    showModalContainer();
    p.focus();

    
  });
  // p.addEventListener("select", ev => {
  //   console.log(ev);
  // });
});
p.tabIndex = -1 // magic for keydown, keyup events
p.addEventListener("keydown", ev => {
  if (ev.keyCode === 27) {
    activeEditable.textContent = p.textContent;
    activeEditable.contentEditable = false;
    activeEditable.classList = "";
    modal.removeChild(p);
    hideModalContainer();
    startKeyPressModal();
  }
});

modalContainer.tabIndex = -1;
modalContainer.addEventListener('keydown', ({keyCode}) => {
  if (keyCode === 27) {
    const children = Array.from(modal.children);
    if (children.length) {
      children.forEach(child => modal.removeChild(child));
    }
    hideModalContainer();
    startKeyPressModal();
  }
})