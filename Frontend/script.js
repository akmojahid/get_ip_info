const table = document.querySelector(".table");
const url = "http://localhost:3000/";

//data fetch
async function loadData() {
  const req = await fetch(url);
  const data = await req.json();
  return data;
}

//html view generator
async function insert(table, data) {
  for (let key in data) {
    table.innerHTML += `<div class="row">
      <div class="key">${key}</div>
      <div class="value">${data[key]}</div>
    </div>`;
  }
}

// errors handling
loadData().then(data => {
  insert(table, data);
}).catch(error => {
  console.error(error);
});
