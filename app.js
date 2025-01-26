function toggleFilters() {
    var filtersDiv = document.getElementById("hide");
    if (filtersDiv.style.display === "none") {
        filtersDiv.style.display = "block";
    } else {
        filtersDiv.style.display = "none";
    }
}
function selected(event) {
    var clickedCart = event.target;
    clickedCart.classList.add("bg");
}

