document.addEventListener("DOMContentLoaded",createFormEvent);

function createFormEvent(){
    const formObject = document.getElementById("updateMandateForm");
    formObject.addEventListener("submit",restUpdateMandate);
}


let updatedMandate;

function updateMandate(mandate) {
    updatedMandate = mandate;
    console.log(updatedMandate);
}

async function restUpdateMandate(event) {
    event.preventDefault();

    const url = `http://localhost:8000/api/politicalparties/${updatedMandate.politicalParty.id}/mandates/${updatedMandate.id}`;
    const form = event.currentTarget;

    try {
        const formData = new FormData(form);
        const mandateFormObject = Object.fromEntries(formData.entries());

        const mandateJSON = {
            firstname: mandateFormObject.firstname,
            lastname: mandateFormObject.lastname,
            politicalParty: {
                id: updatedMandate.politicalParty.id
            }
        }

        const JSONObjectToJSONString = JSON.stringify(mandateJSON);

        const fetchOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSONObjectToJSONString
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