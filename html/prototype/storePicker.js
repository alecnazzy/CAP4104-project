document
    .getElementById("store-icon")
    .addEventListener("click", function () {
        const menu = document.getElementById("store-checkbox-menu");
        const hidden = menu.classList.toggle("hidden");
        menu.style.setProperty("display", hidden ? "none" : "flex");
    });

document.addEventListener("click", function (event) {
    const menu = document.getElementById("store-checkbox-menu");
    const icon = document.getElementById("store-icon");
    if (!icon.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add("hidden");
        menu.style.setProperty("display", "none");
    }
});