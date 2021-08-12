import { queries } from "./graphql/employe/index.js";

const fetch = require('node-fetch');
require('dotenv').config();
async function getData() {
  const data = JSON.stringify({
    query: queries.getEmployes,
  });
  console.log(data);
  const response = await fetch(
    'http://localhost:3000/graphql',
    {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'User-Agent': 'Node',
      },
    }
  );

  const json = await response.json();
  document.getElementById("result").innerHTML = json.data.employes.edges[0].node.employeName
}

getData();