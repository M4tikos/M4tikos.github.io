const account_menu = document.getElementById("account-menu");
const account_icon = document.getElementById("account-icon");

document.addEventListener('mouseup', function(e) {
    if (!account_menu.contains(e.target)) {
        if (account_icon.contains(e.target) && account_menu.style.opacity != "1") {
            account_menu.style.opacity = "1";
            account_menu.style.fontSize = "1em";
        } else if (account_menu.style.opacity == "1") {
            console.log("a");
            account_menu.style.opacity = "0";
            account_menu.style.fontSize = "0.8em";
        }
    }
});
