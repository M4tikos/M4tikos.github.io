const account_menu = document.getElementById("account-menu");
const account_icon = document.getElementById("account-icon");

document.addEventListener('mousedown', function(e) {
    if (account_icon.contains(e.target)) {
        if (account_menu.style.height == "0px") {
            account_menu.style.height = "30em";
        } else {
            account_menu.style.height = "0px";
        }
    } else if (!account_menu.contains(e.target)) {
        account_menu.style.height = "0px";
    }
});


