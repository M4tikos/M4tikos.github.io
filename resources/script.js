const account_menu = document.getElementById("account-menu");
const account_menu_mobile = document.getElementById("account-menu-mobile");
const mobile_side_menu = document.getElementById("mobile-side-menu");
const mobile_side_menu_background = document.getElementById("mobile-side-menu-background");

document.addEventListener('mouseup', function(e) {
    if (!account_menu.contains(e.target) && account_menu.style.opacity == "1") {
        account_menu.style.opacity = "0";
        account_menu.style.fontSize = "0.8em";
        account_menu.style.pointerEvents = "none";
    }
    if (!account_menu_mobile.contains(e.target) && account_menu_mobile.style.opacity == "1") {
        account_menu_mobile.style.opacity = "0";
        account_menu_mobile.style.fontSize = "0.8em";
        account_menu_mobile.style.pointerEvents = "none";
    }
});

function openUserMenu() {
    if (window.getComputedStyle(account_menu).opacity != "1") {
        account_menu.style.opacity = "1";
        account_menu.style.fontSize = "1em";
        account_menu.style.pointerEvents = "all";
    }
}

function openUserMenuMobile() {
    if (window.getComputedStyle(account_menu_mobile).opacity != "1") {
        account_menu_mobile.style.opacity = "1";
        account_menu_mobile.style.fontSize = "1em";
        account_menu_mobile.style.pointerEvents = "all";
    }
}

function openMobileNavMenu() {
    mobile_side_menu.style.left = "0";
    mobile_side_menu_background.style.pointerEvents = "all";
    mobile_side_menu_background.style.opacity = "1";

}

function closeMobileNavMenu() {
    mobile_side_menu.style.left = "-20em";
    mobile_side_menu_background.style.pointerEvents = "none";
    mobile_side_menu_background.style.opacity = "0";
}
