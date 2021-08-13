import { queries, mutations } from "../../graphql/employe/index.js";
import { callApi } from "../commonApi.js";

let processData;
let updateId = [];
var pushId = '';
let processedArray = [];
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("employeUpdate");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.createEmployee = function showImportedMessage() {
    const data = JSON.stringify({
        query: mutations.createEmploye,
        variables: {
            input: {
                employe: {
                    employeName: document.forms[0][0].value,
                    employeEmail: document.forms[0][1].value,
                    employeCode: document.forms[0][2].value,
                    employeDesignation: document.forms[0][3].value,
                    employeAddress: document.forms[0][4].value,
                }
            }
        }
    });
    callApi(data)
}

function callMeTODisplay() {
  const data = JSON.stringify({
    query: queries.getEmployes
  });
  callApi(data).then(response => response.json())
  .then(data => {
  processData = data.data.employes.edges

  for (let index = 0; index < processData.length; index++) {
      const element = processData[index];
      // let id = index +1
    updateId.push({id: index +1,upId :element.node.id})
      element.node.id = index +1
      delete element.node.created
      delete element.node.updated
      console.log(element.node);

      processedArray.push(element.node)
      
  }
  debugger
  displayTable(processedArray)

  // console.log('Success:', data.data.employes.edges);
  })
  .catch((error) => {
  console.error('Error:', error);
  });

}

function displayTable(mytable) {
    var html = "<th>id</th><th>Name</th><th>Code</th><th>Email</th> <th>Designation</th> <th>Address</th><th>Actions</th>";
    mytable.forEach((entry) => {
        html += "<tr>";
        for (var k in entry){
                html += "<td>" + entry[k] + "</td>";
                
        }
        html+= "<td>" + `
        <a style="color: #3b5998;width:5px;margin-left:10px"
        ><i id="employeUpdate" onclick="employeUpdate('update')" class="far fa-edit fa-lg"></i
      ></a>
        <span style="color: #3b5998;width:5px;margin-left:10px"
                ><i id="employeDelete" onclick="employeDelete('delete')" class="fas fa-archive fa-lg"></i
              ></span>
              ` + "</td>";
        html += `</tr>`;
    });
    // html += "</table>";
    document.getElementById('employeeTableSet').innerHTML = html
}

window.employeDelete =  function employeDelete(value) {
  var table = document.getElementById("employeeTableSet");
  if (table) {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {  
          if (value === 'delete') {
            tableText(this);
            const data = JSON.stringify({
              query: mutations.deleteEmployee,
              variables: {
                  input: {
                    id: pushId
                  }
              }
          });
          callApi(data).then(data => {
            processedArray = []
            callMeTODisplay()
          })
            // displayTable()
          }
            value = undefined
        };
    }
  }

}

window.employeUpdate =  function employeUpdate(value) {
  modal.style.display = "block";

  var table = document.getElementById("employeeTableSet");
  if (table) {
    for (var i = 0; i < table.rows.length; i++) {
      table.rows[i].onclick = function() {
        if (value === 'update') {
          tableText(this);
        }
        value = undefined

      };
    }
  }
}

window.updateMongoEmployee = function updateMongoEmployee() {
  let name = document.forms[1][0].value
  let code = document.forms[1][1].value
  let email = document.forms[1][2].value
  let designation = document.forms[1][3].value
  let address = document.forms[1][4].value
  const data = JSON.stringify({
    query: mutations.updateEmployee,
    variables: {
        input: {
          id: pushId,
          update: {
                employeName: name,
                employeEmail: code,
                employeCode: email,
                employeDesignation: designation,
                employeAddress: address,
            }
        }
    }
});
callApi(data)
}

function tableText(tableRow) {
    var id = tableRow.childNodes[0].innerHTML;
    var name = tableRow.childNodes[1].innerHTML;
    var code = tableRow.childNodes[2].innerHTML;
    var email = tableRow.childNodes[3].innerHTML;
    var designation = tableRow.childNodes[4].innerHTML;
    var address = tableRow.childNodes[5].innerHTML;
    var employeeData = {
        'id': id, 
        'employeName': name,
        'employeCode': code,
        'employeEmail': email,
        'employeDesignation': designation,
        'employeAddress': address
      };
    for (let index = 0; index < updateId.length; index++) {
          if (parseInt(id) === updateId[index].id) {
          pushId = updateId[index].upId
          console.log(updateId[index].upId);
      }
      
    }
    document.getElementById('employeeName').value = employeeData.employeName
    document.getElementById('employeeEmail').value = employeeData.employeEmail
    document.getElementById('employeeCode').value = employeeData.employeCode
    document.getElementById('employeeDesignation').value = employeeData.employeDesignation
    document.getElementById('employeeAddress').value = employeeData.employeAddress
  }

  callMeTODisplay()

//###############Mutation Functions############

// var table = document.getElementById("employeeTableSet");
//     if (table) {
//       for (var i = 0; i < table.rows.length; i++) {
//         table.rows[i].onclick = function() {
//           tableText(this);
//         };
//       }
//     }
    
//     function tableText(tableRow) {
//       var id = tableRow.childNodes[0].innerHTML;
//       var name = tableRow.childNodes[1].innerHTML;
//       var code = tableRow.childNodes[2].innerHTML;
//       var email = tableRow.childNodes[3].innerHTML;
//       var designation = tableRow.childNodes[4].innerHTML;
//       var address = tableRow.childNodes[5].innerHTML;
//       var obj = {
//           'id': id, 
//           'employeName': name,
//           'employeCode': code,
//           'employeEmail': email,
//           'employeDesignation': designation,
//           'employeAddress': address
//         };
//       console.log(obj);
//     }

//##########Mutation graphql###############

// query: mutations.employeMutation,
//     variables: {
//         input: {
//             employe: {
//                 employeCode: "230B",
//                 employeName: "Pradeep"
//               }
//         }
//     }

// ##############Get Values from graphql################

//   const data = JSON.stringify({
//     query: queries.getEmployes
//   });