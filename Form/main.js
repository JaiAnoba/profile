document.addEventListener("DOMContentLoaded", function () {
    let pages = document.querySelectorAll(".page1, .page2, .page3, .page4");
    let button = document.querySelector(".done");
    let currentPage = 0;

    pages.forEach((page, index) => {
        page.style.display = index === 0 ? "block" : "none";
    });

    button.addEventListener("click", function () {
        if (currentPage < pages.length - 1) {
            pages[currentPage].style.display = "none";
            currentPage++;
            pages[currentPage].style.display = "block";

            if (currentPage === pages.length - 1) {
                button.textContent = "Submit";
            }
        } else {
            alert("Form submitted!");
        }
    });
});
