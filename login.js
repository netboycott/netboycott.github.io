

document.addEventListener("DOMContentLoaded", () => {

    function linkToMain() {
        link = document.createElement("a")
        link.href = "./index.html"
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    if (localStorage.getItem("token") !== null) {
        linkToMain()
    }
    document.getElementById("submit").addEventListener("click", () => {
        localStorage.setItem("token", document.getElementById("id").value)
        linkToMain()
    })
})

