import { commonHeader } from "../commonHeader.js"
import { projectQueries, projectMutations } from "../../graphql/projects/index.js";
import { callApi } from "../commonApi.js";
import { queries } from "../../graphql/employe/index.js";
  
let html;
let processData;
let processDataProject;
let processedArray = [];
let processedArrayProject = [];
let projectPushId;
let projectStartDate = moment().format('YYYY-MM-DD');
let projectEndDate = moment().format('YYYY-MM-DD');
var modal = document.getElementById("projectModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


window.callCreateProject = function callCreateProject() {
  document.getElementById("createProjectShow").style.display = "block";
  document.getElementById("callProjectPopup").style.display = "none";
  
}

function callMeTODisplayEmployee() {
  const data = JSON.stringify({
    query: queries.getEmployes
  });
  callApi(data).then(response => response.json())
  .then(data => {
    processData = data.data.employees.edges
    for (let index = 0; index < processData.length; index++) {
      const element = processData[index];
      delete element.node.created
      delete element.node.updated
      processedArray.push(element.node)
    }
    displayOption(processedArray)
    document.getElementById("createProjectShow").style.display = "none";
    document.getElementById("callProjectPopup").style.display = "block";
  })
}

function callMeTODisplayProject() {
  const data = JSON.stringify({
    query: projectQueries.getProjects
  });
  callApi(data).then(response => response.json())
  .then(data => {
    processDataProject = data.data.projects.edges
    for (let index = 0; index < processDataProject.length; index++) {
      const element = processDataProject[index];
      delete element.node.created
      delete element.node.updated
      processedArrayProject.push(element.node)
    }
    displayCards(processedArrayProject)
  })
}

function displayCards(cards) {
  let html = ``;
  for (let index = 0; index < cards.length; index++) {
    html += `
    <div id="projectCards">
      <div class="row">
        <div class=" col-8">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="align-self-center">
                    <i class="fas fa-box text-info fa-3x"></i>
                  </div>
                  <div class="text-center">
                    <h5>Ends: `+ cards[index].startDate.split('T')[0] +`</h5>
                    <h6 class="mb-0">`+ cards[index].projectName +`</h6>
                    <h6 class="mb-0"> TL: `+ cards[index].projectLeader.employeName +`</h6>
                  </div>
                  <div class="text-end">
                  <a style="color: #3b5998;"
                      ><i id="projectUpdate" onclick="projectUpdate('`+ cards[index].id +`', '`+ cards[index].projectName +`', '`+ cards[index].startDate +`', '`+ cards[index].endDate +`', '`+ cards[index].projectLeader.employeName +`', '`+ cards[index].projectDevelopers +`')" class="far fa-edit fa-3x"></i
                    ></a>
                    <span style="color: #3b5998;"
                      ><i id="projectDelete" onclick="projectDelete('`+ cards[index].id +`')" class="fas fa-archive fa-3x"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    `
  }
  // var html = "<th>id</th><th>Project Name</th><th>Lead</th><th>Developers</th> <th>Actions</th>";
  // cards.forEach((entry) => {
  //   html += "<tr>";
  //   for (var k in entry){
  //     html += "<td>" + entry[k] + "</td>";
  //   }
  //   html+= "<td>" + `
  //   <a style="color: #3b5998;width:5px;margin-left:10px"
  //   ><i id="employeUpdate" onclick="employeUpdate('update')" class="far fa-edit fa-lg"></i
  //   ></a>
  //   <span style="color: #3b5998;width:5px;margin-left:10px"
  //   ><i id="employeDelete" onclick="projectDelete('`+ cards[index].id +`')" class="fas fa-archive fa-lg"></i
  //   ></span>
  //   ` + "</td>";
  //   html += `</tr>`;
  // });
  document.getElementById('projectCards').innerHTML = html
}

window.projectUpdate = function projectUpdate(value1,value2, value3, value4, value5, value6) {
  modal.style.display = "block";
  projectPushId = value1
  document.getElementById('projectNamePop').value = value2
  document.getElementById('projectDatePop').value = value3.split("T")[0] + '-' + value4.split("T")[0]
  document.getElementById('projectSelectLeadPop').innerHTML = html//value5
  document.getElementById('choices-multiple-remove-button').value = value6
}

window.updateSqlProject = function updateSqlProject() {
  let developers = document.getElementsByName('projectInputPop')[0].childNodes
  let element = []
  for (let index = 0; index < developers.length; index++) {
     element.push(developers[index].value)
  }
  let projectName = document.forms[1][0].value
  let projectLeaderId = document.forms[1][2].value
  const data = JSON.stringify({
    query: projectMutations.updateProject,
    variables: {
      input: {
        id: parseInt(projectPushId),
        update: {
          projectName: projectName,
          startDate: projectStartDate,
          endDate: projectEndDate,
          projectLeaderId: parseInt(projectLeaderId),
          projectDevelopers: element
        }
      }
    }
  }); 
  callApi(data)
}

window.projectDelete =  function projectDelete(value) {
  const data = JSON.stringify({
    query: projectMutations.deleteProject,
    variables: {
      input: {
        id: value
      }
    }
  });
  callApi(data).then(data => {
    processedArrayProject = []
    callMeTODisplayProject()
  })
}

function displayOption(options) {
  html = ``;
  for (let index = 0; index < options.length; index++) {
    html += `<option id="projectSelectDev`+options[index].id+`"
    value="`+options[index].id+ `">` + options[index].employeName +`</option>`
  }

  document.getElementById("projectSelectLead").innerHTML = html
  $( 'select[name="inptProduct"]' ).append( html );
  $(document).ready(function(){
    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
    removeItemButton: true,
    maxItemCount:5,
    searchResultLimit:5,
    renderChoiceLimit:5
    });
  });

  $( 'select[name="projectInputPop"]' ).append( html );
  $(document).ready(function(){

    var multipleCancelButton = new Choices('#choices-multiple-remove-button-pop', {
    removeItemButton: true,
    maxItemCount:5,
    searchResultLimit:5,
    renderChoiceLimit:5
    });
  });
}

window.createProject = function createProject() {
  let developers = document.getElementsByName('inptProduct')[0].childNodes
  let element = []
  for (let index = 0; index < developers.length; index++) {
    element.push(developers[index].textContent)
    debugger
  }

  let date = (document.forms[0][1].value).split(" - ")
  let startDate = date[0]
  let endDate = date[1]
  const data = JSON.stringify({
    query: projectMutations.createProject,
    variables: {
      input: {
        project: {
          projectName: document.forms[0][0].value,
          startDate: startDate,
          endDate: endDate,
          projectLeaderId: parseInt(document.forms[0][2].value),
          projectDevelopers: element,
        }
      }
    }
  });
  callApi(data)
}

$(function() {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(8, 'day'),
    locale: {
      format: 'YYYY-MM-DD'
    }
  },
  function(start, end, label) {
    projectStartDate = start.format('YYYY-MM-DD')
    projectEndDate = end.format('YYYY-MM-DD')
    console.log("A new date selection was made: " + start.format('DD/MM/YYYY hh:mm A') + ' to ' + end.format('DD/MM/YYYY hh:mm A'));
  });
});

document.getElementById('commonHeader').innerHTML = commonHeader
callMeTODisplayProject()
callMeTODisplayEmployee()