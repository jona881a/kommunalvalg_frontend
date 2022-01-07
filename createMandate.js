document.addEventListener("DOMContentLoaded",createFormEvent);

function createFormEvent(){
    const formObject = document.getElementById("assign");
    formObject.addEventListener("submit",handleCreateNewMandateForm);
}

async function handleCreateNewMandateForm(event){
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try{
        const formData = new FormData(form);
        console.log(formData);
        await insertMandateInBackend(url,formData);

    }catch(error){
        console.log("Error in function handleAssignmentSubmit "+error.message)
    }
}

async function insertMandateInBackend(url,formData){

    const plainFormData = Object.fromEntries(formData.entries());

    console.log(plainFormData);


    const mandateJSON = {
        firstname: plainFormData.firstname,
        lastname: plainFormData.lastname,
        politicalParty: {
            id: plainFormData.politicalPartySelector
        }
    }

    const JSONObjectToJSONString = JSON.stringify(mandateJSON);

    console.log(JSONObjectToJSONString);
    console.log("url: "+url);

    const POSTOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSONObjectToJSONString
    }

    const response = await fetch(url,POSTOptions);

    window.location.href = "PoliticalParties.html";

    return response.json();

}