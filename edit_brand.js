document.addEventListener("DOMContentLoaded", () => {

    function goTo(url) {
        link = document.createElement("a")
        link.href = url
        document.getElementsByTagName("body")[0].appendChild(link)
        link.click()
    }

    function uploadImage() {
        // Get the form and file input element
        var form = document.getElementById("editBrandForm");
        var fileInput = document.getElementById("logo");

        // Create FormData object to append the file
        var formData = new FormData(form);
        console.log("buradayim");

        // Check if a file is selected
        if (fileInput.files.length > 0) {
            // Perform AJAX request to handle file upload on the server
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/upload/{id}", true); // Replace '/upload' with your server endpoint
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert("Image uploaded successfully!");
                    // You can perform additional actions after successful upload
                }
            };

            // Send the FormData object containing the file to the server
            xhr.send(formData);
        }
    }

    function deleteBrand() {
        var result = confirm("Are you sure you want to delete this brand?");
        if (result) {
            fetch("/delete/{id}", { method: "DELETE" });
        }
    }


    document.getElementById("editBrandForm").addEventListener("submit", (e) => {
        let brandUpdate = {
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

        // TODO logo dosya mi url mi ?
        // let logoUrl = e.target.logo


        e.preventDefault()
        fetch("http://194.163.146.18:8081/brand?objectId=" + JSON.parse(localStorage.getItem("currentItemGuid")), {
            method: "PUT", headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                accept: "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(brandUpdate)
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

    document.getElementById("deleteBrandButton").addEventListener("click", () => {
        var result = confirm("Are you sure you want to delete this brand?");
        if (result) {
            fetch("http://194.163.146.18:8081/brand?objectId=" + JSON.parse(localStorage.getItem("currentItemGuid")), {
                method: "DELETE", headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
                    accept: "*/*",
                    "Content-Type": "application/json",
                }
            })
        }
    })
})