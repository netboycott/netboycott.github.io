document.addEventListener("DOMContentLoaded", () => {

    function linkToLogin() {
        link = document.createElement("a")
        link.href = "./login.html"
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    if (localStorage.getItem("token") === null) {
        linkToLogin()
    }

    brands = document.getElementById("brands")

    fetch("http://194.163.146.18:8081/brand/all", {
        method: "get", headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        })
    }).then(res => res.json()).then(json => console.log(json))
    // .catch(() => {
    //     localStorage.removeItem("token")
    //     linkToLogin()
    // })
})