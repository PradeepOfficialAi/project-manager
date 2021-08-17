import { commonHeader } from "../commonHeader.js"
import { taskQueries, taskMutations } from "../../graphql/tasks/index.js";
import { projectQueries } from "../../graphql/projects/index.js";
import { callApi } from "../commonApi.js";
import { queries } from "../../graphql/employe/index.js";

let html;
let htmlProject;  
let processData;
let processDatatask;
let processDataProject;
let processedArrayProject = [];
let processedArray = [];
let processedArraytask = [];
let taskPushId;
let taskStartDate = moment().format('YYYY-MM-DD');
let taskEndDate = moment().format('YYYY-MM-DD');

var modal = document.getElementById("taskModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
  })
  .catch((error) => {
  console.error('Error:', error);
  });
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
  displayOptionProject(processedArrayProject)
  })
  .catch((error) => {
  console.error('Error:', error);
  });
}

function displayOptionProject(options) {

  htmlProject = ``;
  for (let index = 0; index < options.length; index++) {
    htmlProject += `<option id="taskSelectDev`+options[index].id+`"
  value="`+options[index].id+ `">` + options[index].projectName +`</option>`
  }
document.getElementById("projectNameId").innerHTML = htmlProject
}

function callMeTODisplaytask() {
  const data = JSON.stringify({
    query: taskQueries.getTasks,
    variables: {
      filter: {
        dashboardTaskId: {
          eq: localStorage.getItem("projectName")
        }
      }
    }
  });
  debugger
  callApi(data).then(response => response.json())
  .then(data => {
    if(data.data != null) {
      processDatatask = data.data.tasks.edges
      for (let index = 0; index < processDatatask.length; index++) {
          const element = processDatatask[index];
          delete element.node.created
          delete element.node.updated
          processedArraytask.push(element.node)
      }
      displayCards(processedArraytask)
      // processedArraytask = []
    }
  })
  .catch((error) => {
  console.error('Error:', error);
  });

}

function displayCards(cards) {
  let html = ``;
  for (let index = 0; index < cards.length; index++) {
  html += `
  <div id="taskCards">
  <div class="row">
      <div class=" col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="align-self-center">
                  <i class="fas fa-box text-info fa-3x"></i>
                </div>
                <div class="text-left">
                  <h5>Ends: `+ cards[index].startDate.split('T')[0] +`</h5>
                  <h6 class="mb-0">Task: `+ cards[index].taskName +`</h6>
                  <h6 class="mb-0"> Project: `+ cards[index].projectName.projectName +`</h6>
                </div>
                <div class="text-end">
                <a style="color: #3b5998;"
                    ><i id="taskUpdate" onclick="taskUpdate('`+ cards[index].id +`', '`+ cards[index].taskName +`', '`+ cards[index].startDate +`', '`+ cards[index].endDate +`', '`+ cards[index].projectName.projectName +`', '`+ cards[index].taskDevelopers +`')" class="far fa-edit fa-3x"></i
                  ></a>
                  <span style="color: #3b5998;"
                    ><i id="taskDelete" onclick="taskDelete('`+ cards[index].id +`')" class="fas fa-archive fa-3x"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
  </di>
  `
  }
  document.getElementById('taskCards').innerHTML = html
}

window.taskUpdate = function taskUpdate(value1,value2, value3, value4, value5, value6) {
  modal.style.display = "block";
  console.log(html);
  taskPushId = value1
  document.getElementById('taskNamePop').value = value2
  document.getElementById('taskDatePop').value = value3.split("T")[0] + '-' + value4.split("T")[0]
  document.getElementById('projectNameIdPop').innerHTML = htmlProject//value5
  document.getElementById('choices-multiple-remove-button').value = value6
  
}

window.updateSqlTask = function updateSqlTask() {

  let developers = document.getElementsByName('taskInputPop')[0].childNodes
  let element = []
  for (let index = 0; index < developers.length; index++) {
     element.push(developers[index].value)
  }
  let taskName = document.forms[1][0].value
  let taskLeaderId = document.forms[1][2].value
  const data = JSON.stringify({
    query: taskMutations.updateTask,
    variables: {
        input: {
          id: parseInt(taskPushId),
          update: {
                taskName: taskName,
                startDate: taskStartDate,
                endDate: taskEndDate,
                projectNameId: parseInt(taskLeaderId),
                taskDevelopers: element
            }
      }
    }
  }); 
  
  callApi(data)
  
  }

window.taskDelete =  function taskDelete(value) {
  console.log(value);
  const data = JSON.stringify({
    query: taskMutations.deleteTask,
    variables: {
        input: {
          id: value
        }
    }
});
callApi(data).then(data => {
  processedArraytask = []
  callMeTODisplaytask()
})


}

function displayOption(options) {

  html = ``;
  for (let index = 0; index < options.length; index++) {
  html += `<option id="taskSelectDev`+options[index].id+`"
  value="`+options[index].id+ `">` + options[index].employeName +`</option>`
  }

$( 'select[name="inptProduct"]' ).append( html );
$(document).ready(function(){

  var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
  removeItemButton: true,
  maxItemCount:5,
  searchResultLimit:5,
  renderChoiceLimit:5
  });
  
  });


$( 'select[name="taskInputPop"]' ).append( html );
$(document).ready(function(){

  var multipleCancelButton = new Choices('#choices-multiple-remove-button-pop', {
  removeItemButton: true,
  maxItemCount:5,
  searchResultLimit:5,
  renderChoiceLimit:5
  });
  
  });

}


window.createTask = function createTask() {

  let developers = document.getElementsByName('inptProduct')[0].childNodes
  let element = []
  for (let index = 0; index < developers.length; index++) {
     element.push(developers[index].value)
  }

let date = (document.forms[0][1].value).split(" - ")
let startDate = date[0]
let endDate = date[1]

  const data = JSON.stringify({
      query: taskMutations.createTask,
      variables: {
          input: {
              task: {
                  taskName: document.forms[0][0].value,
                  startDate: startDate,
                  endDate: endDate,
                  projectNameId: parseInt(document.forms[0][2].value),
                  taskDevelopers: element,
                  dashboardTaskId: localStorage.getItem("projectName")
              }
          }
      }
  });

  callApi(data)

}

$(function() {
    $('input[name="taskTime"]').daterangepicker({
      timePicker: true,
      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(8, 'day'),
      locale: {
        format: 'YYYY-MM-DD'
      }
    },
    function(start, end, label) {
      
      taskStartDate = start.format('YYYY-MM-DD')
      taskEndDate = end.format('YYYY-MM-DD')
        console.log("A new date selection was made: " + start.format('DD/MM/YYYY hh:mm A') + ' to ' + end.format('DD/MM/YYYY hh:mm A'));
      });
  });

document.getElementById('commonHeader').innerHTML = commonHeader

callMeTODisplaytask()
callMeTODisplayEmployee()
callMeTODisplayProject()
