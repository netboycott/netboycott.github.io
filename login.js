document.addEventListener("DOMContentLoaded", () => {

    function goTo(url) {
        link = document.createElement("a")
        link.href = url
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }
    if (localStorage.getItem("token") !== null) {
        goTo("./index.html")
    }
    document.getElementById("submit").addEventListener("click", () => {
        localStorage.setItem("token", JSON.stringify(document.getElementById("id").value))
        goTo("./index.html")
    })
})

