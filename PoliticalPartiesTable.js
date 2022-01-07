let urlFetchPoliticalParties = "http://localhost:8000/api/politicalparties";
const table = document.getElementById("politicalPartiesTable");
const sortyBySelector = document.getElementById("selectSortBy");
const sortDirSelector = document.getElementById("selectSortDir");


sortyBySelector.addEventListener('change',(event) => {
    const optionIndex = sortyBySelector.value;

    if(urlFetchPoliticalParties.indexOf("sortBy") === -1) {
        if(urlFetchPoliticalParties.indexOf("?") === -1) {
            urlFetchPoliticalParties += "?sortBy=" + optionIndex;
            table.innerHTML = '';
        } else {
            urlFetchPoliticalParties += "&sortBy=" + optionIndex;
            table.innerHTML = '';
        }
        createTable(urlFetchPoliticalParties);
    }

});

sortDirSelector.addEventListener('change',() => {
    const optionIndex = sortDirSelector.value;
    if(urlFetchPoliticalParties.indexOf('sortDir') === -1) {
        if(urlFetchPoliticalParties.indexOf('?') === -1) {
            urlFetchPoliticalParties += "?sortDir=" + optionIndex;
            table.innerHTML = '';
        } else {
            urlFetchPoliticalParties += "&sortDir=" + optionIndex;
            table.innerHTML = '';
        }
        createTable(urlFetchPoliticalParties);
    }
})

async function createTable(url) {

    await fetch(url).then(response => response.json())
        .then(politicalParties => {
            politicalParties.content.forEach(politicalParty => {
                addTableRow(politicalParty);
            })
        })
}

function addTableRow(politicalParty){
    console.log(politicalParty);

    politicalParty.mandates.forEach(mandate => {

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
        cell4.innerHTML = politicalParty.politicalPartyName;

        let cell5 = row.insertCell(4);
        cell5.innerHTML = politicalParty.alias;

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

    })
}

createTable(urlFetchPoliticalParties);

