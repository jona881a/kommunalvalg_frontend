
let urlFetchSpecificPartyMandates;
const table = document.getElementById("mandateTable");
const sortyBySelector = document.getElementById("selectSortBy");
const sortDirSelector = document.getElementById("selectSortDir");
const politicalPartySelector = document.getElementById("selectPartyMandates");
const politicalPartyName = document.getElementById("politicalPartyName");

politicalPartySelector.addEventListener('change',() => {
    const politicalPartyId = politicalPartySelector.value;
    urlFetchSpecificPartyMandates = `http://localhost:8000/api/politicalparties/${politicalPartyId}/mandates/`;
    clearTable();
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
        clearTable();
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
        clearTable();
        createTable(urlFetchSpecificPartyMandates);
    }
})

async function createTable(url) {
    console.log(table.rows.length);
    await fetch(url).then(response => response.json())
        .then(mandates => {
            console.log(mandates)
            mandates.content.forEach(mandate => {
                addTableRow(mandate);
            })
        })
}

function addTableRow(mandate){
    politicalPartyName.innerText = `Liste over ${mandate.politicalParty.politicalPartyName}s mandater`;
    console.log(mandate);

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
        console.log(mandate);
        updateMandate(mandate);
    }
    cell9.appendChild(pbUpdate);
}

function clearTable() {
    const rowCount = table.rows.length;

    if(rowCount > 0) {
        for (let i = 0; i < rowCount - 1; i++) {
            table.deleteRow(i);
        }
    }
}