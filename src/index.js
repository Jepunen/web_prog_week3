import "./styles.css";

async function getJSON() {
  let cities = [];
  let population = [];

  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff ";
  const usersPromise = await fetch(url);
  const userJSON = await usersPromise.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065 ";
  const userPromise = await fetch(url2);
  const userJSON2 = await userPromise.json();

  Object.keys(
    userJSON["dataset"]["dimension"]["Alue"]["category"]["label"]
  ).forEach((key) => {
    const municipality =
      userJSON["dataset"]["dimension"]["Alue"]["category"]["label"][key];
    cities.push(municipality);
  });

  let count = 0;

  userJSON.dataset.value.forEach((value) => {
    population.push(value);
  });

  userJSON2.dataset.value.forEach((value) => {
    const column = document.getElementById("tbody");

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = cities[count];
    td2.innerText = population[count];
    td3.innerText = value;
    td4.innerText = ((value / population[count]) * 100).toFixed(2);
    if (((value / population[count]) * 100).toFixed(2) > 45) {
      td4.style.backgroundColor = "#abffbd";
    } else if (((value / population[count]) * 100).toFixed(2) < 25) {
      td4.style.backgroundColor = "#ff9e9e";
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    column.appendChild(tr);

    count++;
  });
}

getJSON();
