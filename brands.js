document.addEventListener("DOMContentLoaded", () => {

    function goTo(url) {
        link = document.createElement("a")
        link.href = url
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    function createItem(name, logo_url, status, explanation, count, id, isLast) {
        let brandContainer = document.createElement("div")
        brandContainer.style.border = "1px solid gray"
        brandContainer.style.padding = "16px"
        brandContainer.style.marginBottom = isLast ? "" : "1rem"
        let brandName = document.createElement("h2")
        brandName.innerText = name
        let brandLogo = document.createElement("img")
        brandLogo.src = logo_url
        brandLogo.alt = "Brand Logo"
        brandLogo.style = "width: 100%; height: auto; background-size: cover;"
        let brandStatus = document.createElement("p")
        brandStatus.innerText = "Status: " + status
        let brandExplanation = document.createElement("p")
        brandExplanation.innerText = "Explanation: " + explanation
        let desiredParticipant = document.createElement("p")
        desiredParticipant.innerText = "Desired Participation Count: " + count.toString()
        let editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.addEventListener("click", () => {
            localStorage.setItem("currentItemGuid", JSON.stringify(id))
            goTo("./edit_brand.html")
        })

        brandContainer.appendChild(brandName)
        brandContainer.appendChild(brandLogo)
        brandContainer.appendChild(brandStatus)
        brandContainer.appendChild(brandExplanation)
        brandContainer.appendChild(desiredParticipant)
        brandContainer.appendChild(editButton)

        return brandContainer
    }

    let brands = document.getElementById("container")

    fetch("http://194.163.146.18:8081/brand/all", {
        method: "get", headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
            accept: "*/*",
            "Content-Type": "application/json",
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error()
        }
        return response.json()
    }).then(json => json.map((item, i, json) => createItem(item.name, item.logo, item.status, item.whyInList, item.totalParticipant, item.id, i + 1 === json.length)))
        .then(elements => {
            for (let index in elements) {
                brands.appendChild(elements[index])
            }
        })
        .catch((e) => {
            console.log(e)
        })


    document.getElementById("add-brand-button").addEventListener("click", () => {
        goTo("./add_brand.html")
    })
})

