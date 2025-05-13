const account_menu = document.getElementById("account-menu");

document.addEventListener('mouseup', function(e) {
    if (!account_menu.contains(e.target) && account_menu.style.opacity == "1") {
        account_menu.style.opacity = "0";
        account_menu.style.fontSize = "0.8em";
        account_menu.style.pointerEvents = "none";
    }
});

function openUserMenu() {
    if (window.getComputedStyle(account_menu).opacity != "1") {
        account_menu.style.opacity = "1";
        account_menu.style.fontSize = "1em";
        account_menu.style.pointerEvents = "all";
    }
}

function openMobileNavMenu() {

}
