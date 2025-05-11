const account_menu = document.getElementById("account-menu");
const account_icon = document.getElementById("account-icon");

document.addEventListener('mouseup', function(e) {
    if (account_icon.contains(e.target)) {
        if (account_menu.style.top == "39px" && !account_menu.contains(e.target)) {
            account_menu.style.top = "-440px";
            account_menu.style.opacity = "0";
        } else {
            account_menu.style.top = "39px";
            account_menu.style.opacity = "1";
        }
    } else if (!account_menu.contains(e.target)) {
        account_menu.style.top = "-440px";
        account_menu.style.opacity = "0";
    }
});


