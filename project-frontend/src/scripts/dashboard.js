// import { commonHeader } from "../commonHeader.js"
import { projectQueries } from "../graphql/projects/index.js";
import { callApi } from "./commonApi.js";
import { taskQueries } from "../graphql/tasks/index.js";

let projectDashboardCount;
let taskDashboardCount;

(function callMeTODisplayEmployee() {
  const data = JSON.stringify({
    query: taskQueries.getTasks
  });
  callApi(data).then(response => response.json())
  .then(data => {
  taskDashboardCount = data.data.tasks.totalCount
  showDashBoardCount()
  })
  .catch((error) => {
  console.error('Error:', error);
  });
})();

(function callMeTODisplayProject() {
  const data = JSON.stringify({
    query: projectQueries.getProjects
  });
  callApi(data).then(response => response.json())
  .then(data => {
  projectDashboardCount = data.data.projects.totalCount
  showDashBoardCount()
  })
  .catch((error) => {
  console.error('Error:', error);
  });
})(); 

function showDashBoardCount() {
  
// callMeTODisplayProject()
// callMeTODisplayEmployee()
  debugger
  document.getElementById("projectDashboard").innerHTML = `
<div id="projectDashboard" class="row">
          <div class="col-xl-6 col-md-12 mb-4">
            <div id="project" class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between p-md-1">
                  <div class="d-flex flex-row">
                    <div class="align-self-center">
                      <i class="fas fa-box text-info fa-3x me-4"></i>
                    </div>
                    <div>
                      <h4>Projects</h4>
                      <p class="mb-0">view all projects</p>
                    </div>
                  </div>
                  <div class="align-self-center">
                    <h2 class="h1 mb-0">`+ projectDashboardCount +`</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-md-12 mb-4">
            <div id="task" class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between p-md-1">
                  <div class="d-flex flex-row">
                    <div class="align-self-center">
                      <i
                         class="fas fa-scroll text-warning fa-3x me-4"
                         ></i>
                    </div>
                    <div>
                      <h4>Total Tasks</h4>
                      <p class="mb-0">view all tasks</p>
                    </div>
                  </div>
                  <div class="align-self-center">
                    <h2 class="h1 mb-0">`+ taskDashboardCount +`</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
`
}

