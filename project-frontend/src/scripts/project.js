import { projectQueries } from "../graphql/projects/index.js";
import { callApi } from "./commonApi.js";
// import { mainHeader } from "./mainHeader.js";
// import { taskQueries } from "../graphql/tasks/index.js";


let processDataProject;
let processedArrayProject = [];
// let processData;
// let processedArray = [];

// function callToDisplayTasks() {
  
// const data = JSON.stringify({
//   query: taskQueries.getTasks
// });
// callApi(data).then(response => response.json())
// .then(data => {
// processData = data.data.tasks.edges
// for (let index = 0; index < processData.length; index++) {
//     const element = processData[index];
//     delete element.node.created
//     delete element.node.updated
//     processedArray.push(element.node)
// }
// showProject(cards, processedArray)
// })
// .catch((error) => {
// console.error('Error:', error);
// });
// }

(function callMeTODisplayProject() {
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
    .catch((error) => {
    console.error('Error:', error);
    });
  })();

function displayCards(cards) {
  console.log(cards.length);
  let html = ``;
  for (let index = 0; index < cards.length; index++) {

    html += `
    <div class="card" style="width: 18rem;margin-left:50px;margin-top:20px">
  <div class="card-body">
    <h3 class="card-title">Project: `+ cards[index].projectName +`</h3>
    <h5 class="card-subtitle mb-2 text-muted">TL: `+ cards[index].projectLeader.employeName +`</h5>
    <p class="card-text">Start Date: 
    `+ cards[index].startDate.split('T')[0] +`
    </p>
    <p class="card-text">End Date: 
    `+ cards[index].endDate.split('T')[0] +`
    </p>
    <button type="button" onclick="callWorkspace('`+cards[index].projectName+`', '`+cards[index].projectLeader.employeName+`')" class="btn btn-primary">Work Sheet</button>
  </div>
</div>
    `
  }
  document.getElementById('projectCards').innerHTML = html
}
window.callWorkspace = function callWorkspace(projectName, projectLead) {
  localStorage.setItem("projectName", projectName);
  localStorage.setItem("projectLaed", projectLead);
  window.location.href = `./workSpace.html`;
}

// export window.setterProject = function setterProject(){
//   return "value"
// }
// document.getElementById('mainHeader').innerHTML = mainHeader