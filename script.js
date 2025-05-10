const output = document.getElementById("output");

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll != 0) {
      output.style.borderBottom = "solid 1px";
  } else {
      output.style.borderBottom = "0";
  }
});