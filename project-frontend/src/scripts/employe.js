import { mainHeader } from "../scripts/mainHeader.js"
import { queries, mutations } from "../graphql/employe/index.js";
import { callApi } from "./commonApi.js";


let processData;
let processedArray = []

function callMeTODisplay() {
    const data = JSON.stringify({
      query: queries.getEmployes
    });
    callApi(data).then(response => response.json())
    .then(data => {
      processData = data.data.employees.edges
      for (let index = 0; index < processData.length; index++) {
        const element = processData[index];
        // updateId.push({id: index +1,upId :element.node.id})
        delete element.node.created
        delete element.node.updated
        processedArray.push(element.node)
      }
      displayTable(processedArray)
    })
    .catch((error) => {
    console.error('Error:', error);
    });
  }

  function displayTable(mytable) {
      debugger
    var html = "<th>id</th><th>Name</th><th>Code</th><th>Email</th> <th>Designation</th> <th>Address</th>";
    mytable.forEach((entry) => {
      html += "<tr>";
      for (var k in entry){
        html += "<td>" + entry[k] + "</td>";
      }
    //   html+= "<td>" + `
    //   <a style="color: #3b5998;width:5px;margin-left:10px"
    //   ><i id="employeUpdate" onclick="employeUpdate('update')" class="far fa-edit fa-lg"></i
    //   ></a>
    //   <span style="color: #3b5998;width:5px;margin-left:10px"
    //   ><i id="employeDelete" onclick="employeDelete('delete')" class="fas fa-archive fa-lg"></i
    //   ></span>
    //   ` + "</td>";
      html += `</tr>`;
    });
    document.getElementById('employeeDashboardSet').innerHTML = html
  }

document.getElementById('mainHeader').innerHTML = mainHeader
callMeTODisplay()
