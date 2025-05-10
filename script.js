const account_menu = document.getElementById("account-menu");
const output = document.getElementById("output");

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll != 0) {
      output.style.borderBottom = "solid 1px";
  } else {
      output.style.borderBottom = "0";
  }
});

function toggleUserMenu() {
    if (account_menu.style.height == "30em") {
      account_menu.style.height = "0";
  } else {
      account_menu.style.height = "30em";
  }
}
