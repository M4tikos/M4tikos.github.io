const account_menu = document.getElementById("account-menu");
const mobile_side_menu = document.getElementById("mobile-side-menu");
const mobile_side_menu_background = document.getElementById("mobile-side-menu-background");

document.addEventListener('mouseup', function(e) {
    if (!account_menu.contains(e.target) && account_menu.style.opacity == "1") {
        account_menu.style.opacity = "0";
        account_menu.style.transform = "scale(0.8) translate(12.5%, -12.5%)";
        account_menu.style.pointerEvents = "none";
    }
});

function openUserMenu() {
    if (window.getComputedStyle(account_menu).opacity != "1") {
        account_menu.style.opacity = "1";
        account_menu.style.transform = "scale(1, 1) translate(0, 0)";
        account_menu.style.pointerEvents = "all";
    }
}

function openMobileNavMenu() {
    mobile_side_menu.style.transform = "translateX(0em)";
    mobile_side_menu.style.pointerEvents = "all";
    mobile_side_menu_background.style.pointerEvents = "all";
    mobile_side_menu_background.style.opacity = "1";

}

function closeMobileNavMenu() {
    mobile_side_menu.style.transform = "translateX(-20em)";
    mobile_side_menu.style.pointerEvents = "none";
    mobile_side_menu_background.style.pointerEvents = "none";
    mobile_side_menu_background.style.opacity = "0";
}
