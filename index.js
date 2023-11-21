document.addEventListener("DOMContentLoaded", () => {

    function goTo(url) {
        link = document.createElement("a")
        link.href = url
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    document.getElementById("brands-button").addEventListener("click", () => {
        goTo("./brands.html")
    })

    document.getElementById("news-button").addEventListener("click", () => {
        goTo("./news.html")
    })

})