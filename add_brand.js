document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addBrandForm").addEventListener("submit", (e) => {
        e.preventDefault()

        console.log(e.target)
        let newBrand = {
            name: e.target.elements["brandName"].value,
            status: e.target.elements["brandStatus"].value,
            whyInList: e.target.elements["explanation"].value,
            description: e.target.elements["explanation"].value,
            descriptionLanguageMap: {},
            whyInListLanguageMap: {},
            desiredParticipant: e.target.elements["participationCount"].value,
            weeklyBoycott: true,
            superBrandId: ""
        }

        fetch("http://194.163.146.18:8081/brand", {
            method: "POST", headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBrand)
        }).then(async (response) => {
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
            return response.json()
        }).then(() => {
            goTo("./brands.html")
        }).catch(e => {
            console.log(e)
        })
    })
})
