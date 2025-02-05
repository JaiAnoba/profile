document.addEventListener("DOMContentLoaded", function () {
    let pages = document.querySelectorAll(".page1, .page2, .page3, .page4");
    let button = document.querySelector(".done");
    let currentPage = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.display = i === index ? "block" : "none";
        });
    }

    function validatePage() {
        let formData = new FormData(document.querySelector("form"));
        formData.append("page", currentPage + 1);

        fetch("validate.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(errors => {
            document.querySelectorAll(".error").forEach(span => span.innerHTML = "");

            if (Object.keys(errors).length > 0) {
                for (const field in errors) {
                    let input = document.querySelector(`[name="${field}"]`);
                    if (input) {
                        let errorSpan = input.nextElementSibling;
                        if (errorSpan) {
                            errorSpan.innerHTML = errors[field];
                        }
                    }
                }
            } else {
                if (currentPage < pages.length - 1) {
                    currentPage++;
                    showPage(currentPage);
                    if (currentPage === pages.length - 1) {
                        button.textContent = "Submit";
                    }
                } else {
                    document.querySelector("form").submit();
                }
            }
        });
    }

    button.addEventListener("click", validatePage);
    showPage(currentPage);
});
