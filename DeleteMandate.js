async function deleteMandate(mandate) {
    try {
        const response = await deleteRestCall(mandate);

    } catch(error) {
        alert(error.message);
    }
}

async function deleteRestCall(mandate) {
    const url = "http://localhost:8000/api/politicalparties/mandates/" + mandate.id;

    console.log(url);

    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: ""
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        console.log("det gik ikke godt");
    }

    return response;
}
