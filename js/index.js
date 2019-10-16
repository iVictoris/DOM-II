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
  console.log(rainbow);
};

let rainbowIntervalID;

const setColor = nodeList => {
  nodeList.forEach((node, index) => {
    console.log(index);
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
    console.log('working...');
    rainbowShifter();
    setColor(textSpans);
  }, 100);
});

navH1.addEventListener("mouseleave", e => {
  e.target.textContent = "Fun Bus";
  clearInterval(rainbowIntervalID);
});
