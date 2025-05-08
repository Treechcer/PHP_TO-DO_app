function addRow(data){
    var table = document.getElementById("table");
    var row = document.createElement("tr");
    if (data.length != 3){
        row.innerHTML = `
        <td> ${index} </td>
        <td> ${data[0]} </td>
        <td> ${data[1]} </td>
    `
    index++;
    }
    else{
        row.innerHTML = `
        <td> ${data[0]} </td>
        <td> ${data[1]} </td>
        <td> ${data[2]} </td>
    `
    }

    table.appendChild(row);
}

function load(event){
    event.preventDefault();
    getData();
}

function submit(event){
    event.preventDefault();

    var data = [];
    data[0] = document.getElementById("data0").value;
    data[1] = document.getElementById("data1").checked;

    if (data[0] != ""){
        addRow(data);
        sendData(data);
    }
}

function sendData(data){
    fetch("POSTdb.php", {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        body: `index=${encodeURIComponent(index)}&data0=${encodeURIComponent(data[0])}&data1=${encodeURIComponent(data[1])}`})
}

function getData() {
    fetch("GETdb.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split("\n");
        lines.forEach(line => {
            if (line.trim() !== "") {
                processData(line);
            }
        });
    });
}

function processData(dataLine){
    let lastI = 0;
    let data = [];

    for (let i = 0; i < dataLine.length; i++) {
        if (dataLine[i] === "|") {
            data.push(dataLine.slice(lastI, i));
            lastI = i + 1;
        }
    }
    if (data.length >= 3) {
        addRow([data[0], data[1], data[2]]);
    }
}

getData();

var index = 0;
document.getElementById("t").addEventListener("submit", submit)
document.getElementById("load").addEventListener("click", load)