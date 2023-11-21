document.addEventListener("DOMContentLoaded", () => {

    function goTo(url) {
        link = document.createElement("a")
        link.href = url
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    document.getElementById("editBrandForm").addEventListener("submit", (e) => {
        let brandUpdate = {
            name: e.target.elements["brandName"].value,
            status: e.target.elements["brandStatus"].value.toUpperCase(),
            whyInList: e.target.elements["explanation"].value,
            description: e.target.elements["explanation"].value,
            descriptionLanguageMap: {},
            whyInListLanguageMap: {},
            desiredParticipant: e.target.elements["participationCount"].value,
            weeklyBoycott: true,
            superBrandId: null
        }

        let formData = new FormData()
        formData.append("file", e.target.elements["logo"].files[0])


        e.preventDefault()
        fetch("http://194.163.146.18:8081/brand?objectId=" + JSON.parse(localStorage.getItem("currentItemGuid")), {
            method: "PUT", headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(brandUpdate)
        }).then(async (response) => {
            let res = { ok: true }
            if (formData.get("file") !== null) {
                res = await fetch("http://194.163.146.18:8081/brand/" + JSON.parse(localStorage.getItem("currentItemGuid")) + "/logo", {
                    method: "PUT", headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                        accept: "*/*",
                    },
                    body: formData
                })
            }
            if (!response.ok || !res.ok) {
                throw new Error()
            }
            return response.json()
        }).then(() => {
            goTo("./brands.html")
        }).catch(e => {
            console.log(e)
        })
    })

    document.getElementById("deleteBrandButton").addEventListener("click", () => {
        var result = confirm("Are you sure you want to delete this brand?");
        if (result) {
            fetch("http://194.163.146.18:8081/brand?objectId=" + JSON.parse(localStorage.getItem("currentItemGuid")), {
                method: "DELETE", headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                    accept: "*/*",
                    "Content-Type": "application/json",
                }
            }).then(response => {
                // if (logoFile !== null) {
                //     await fetch("http://194.163.146.18:8081/brand/" + JSON.parse(localStorage.getItem("currentItemGuid")) + "/logo", {
                //         method: "PUT", headers: {
                //             Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                //             accept: "*/*",
                //             "Content-Type": "application/json",
                //         },
                //         body: JSON.stringify(brandUpdate)
                //     })
                // }
                if (!response.ok) {
                    throw new Error()
                }
            }).then(() => {
                goTo("./brands.html")
            }).catch(e => {
                console.log(e)
            })
        }
    })
})