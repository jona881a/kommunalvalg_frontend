
let urlFetchSpecificPartyMandates;
const table = document.getElementById("mandateTable");
const sortyBySelector = document.getElementById("selectSortBy");
const sortDirSelector = document.getElementById("selectSortDir");
const politicalPartySelector = document.getElementById("selectPartyMandates");
const politicalPartyName = document.getElementById("politicalPartyName");
const contentDiv = document.getElementById("content");
const pbSaveChanges = document.getElementById("saveBtn");
const pbCancelChanges = document.getElementById("cancelBtn");

politicalPartySelector.addEventListener('change',() => {
    const politicalPartyId = politicalPartySelector.value;
    urlFetchSpecificPartyMandates = `http://localhost:8000/api/politicalparties/${politicalPartyId}/mandates/`;
    table.innerHTML = '';
    createTable(urlFetchSpecificPartyMandates);
})

sortyBySelector.addEventListener('change',(event) => {
    const optionIndex = sortyBySelector.value;

    if(urlFetchSpecificPartyMandates.indexOf("sortBy") === -1) {
        if(urlFetchSpecificPartyMandates.indexOf("?") === -1) {
            urlFetchSpecificPartyMandates += "?sortBy=" + optionIndex;
        } else {
            urlFetchSpecificPartyMandates += "&sortBy=" + optionIndex;
        }
        table.innerHTML = '';
        createTable(urlFetchSpecificPartyMandates);
    }
});

sortDirSelector.addEventListener('change',() => {
    const optionIndex = sortDirSelector.value;

    if(urlFetchSpecificPartyMandates.indexOf('sortDir') === -1) {
        if(urlFetchSpecificPartyMandates.indexOf('?') === -1) {
            urlFetchSpecificPartyMandates += "?sortDir=" + optionIndex;
        } else {
            urlFetchSpecificPartyMandates += "&sortDir=" + optionIndex;
        }
        table.innerHTML = '';
        createTable(urlFetchSpecificPartyMandates);
    }
})

async function createTable(url) {
    await fetch(url).then(response => response.json())
        .then(mandates => {
            mandates.content.forEach(mandate => {
                addTableRow(mandate);
            })
        })
}

function addTableRow(mandate){
    politicalPartyName.innerText = `Liste over ${mandate.politicalParty.politicalPartyName}s mandater`;

    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.id = mandate.id;

    let cell1 = row.insertCell(0);
    cell1.innerHTML = mandate.id;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = mandate.firstname;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = mandate.lastname;

    let cell4 = row.insertCell(3);
    cell4.innerHTML = mandate.politicalParty.politicalPartyName;

    let cell5 = row.insertCell(4);
    cell5.innerHTML = mandate.politicalParty.alias;

    let cell6 = row.insertCell(5);
    let pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet mandat");
    pbDelete.onclick = function() {
        document.getElementById(mandate.id).remove();
        deleteMandate(mandate);
    }
    cell6.appendChild(pbDelete);

    //button til at rette kommune
    let cell9 = row.insertCell(6);
    let pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute("value", "Rediger mandat");

    pbUpdate.onclick = function() {
        const contentDiv = document.getElementById("content");
        const firstnameInput = document.getElementById("firstnameInput");
        const lastnameInput = document.getElementById("lastnameInput");
        const politicalPartyInput = document.getElementById("politicalPartyInput");

        contentDiv.scrollIntoView(true);
        contentDiv.style.display = 'block';
        firstnameInput.value = mandate.firstname;
        lastnameInput.value = mandate.lastname;
        politicalPartyInput.value = mandate.politicalParty.politicalPartyName;

        pbSaveChanges.onclick = function() {
            updateMandate(mandate);
        }
        pbCancelChanges.addEventListener("click", () => {
            contentDiv.style.display='none'
            document.querySelector(".header").scrollIntoView(true);
        });

    }
    cell9.appendChild(pbUpdate);
}