function updateMandate() {
    window.location.href = "updateMandate.html";

    console.log("updateMandate called");
    const mandate = {
        id: mandate.id,
        firstname: document.getElementById("editFirstname").innerText,
        lastname: document.getElementById("editLastname").innerText
    }
    restUpdateMandate(mandate);
}

async function restUpdateMandate(mandate) {
    console.log(mandate);

    try {
        //const response = await restUpdateMandate(mandate);
        const url = `http://localhost:8000/api/politicalparties/${mandate.politicalParty.id}/mandates/${mandate.id}`;
        const jsonString = JSON.stringify(mandate);

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonString
        }
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            console.log("det gik ikke godt");
        }
        return response.json();
    } catch(error) {
        alert(error.message);
    }
}
/*
async function restUpdateMandate(mandate) {
    //const url = "http://localhost:8000/api/politicalparties/"+ +"/mandates/" + mandate.id;
    const url = `http://localhost:8000/api/politicalparties/${mandate.politicalParty.id}/mandates/${mandate.id}`;
    const jsonString = JSON.stringify(mandate);

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonString
    }
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("det gik ikke godt");
    }
    return response.json();
}
*/