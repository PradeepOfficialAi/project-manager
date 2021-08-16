import { callApi } from "./commonApi.js";
import { queries } from "../graphql/employe/index.js";
import { projectQueries } from "../graphql/projects/index.js";
import { dashboardQueries, dashboardMutations } from "../graphql/dashboards/index.js";

let currentDateFor = moment()
let currentdate = new Date();
var oneJan = new Date(currentdate.getFullYear(),0,1);
var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
let enterCurrentDate = currentDateFor.format('DD')
let enterCurrentWeek = currentDateFor.format('MM')
let enterCurrentYear = parseInt(currentDateFor.format('YYYY'))
let currentWeekNumber = result
let currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
let weekStart = currentDate.clone().startOf('week')
let weekEnd = currentDate.clone().endOf('week')
let currentDay = []
let prevWeek
let nextWeek
let weekPrev = 0
let weekNext = 0
let currentWeek = 0
let processedArray = [];
let processData;
let processDataProject = [];
let processedArrayProject = [];


document.getElementsByClassName('input1')[0].value = currentWeekNumber
document.getElementsByClassName('input2')[0].value = enterCurrentYear

window.resetActive  = function resetActive() {
    currentWeekNumber = result
    currentDateFor = moment()
     enterCurrentDate = currentDateFor.format('DD')
     enterCurrentWeek = currentDateFor.format('MM')
     enterCurrentYear = parseInt(currentDateFor.format('YYYY'))
     currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
    weekStart = currentDate.clone().startOf('week')
    displayFunc(weekStart)
    document.getElementsByClassName('input1')[0].value = currentWeekNumber
    document.getElementsByClassName('input2')[0].value = enterCurrentYear
    currentWeek = 0
    weekPrev = 0
    weekNext = 0
    currentDay = []
}

let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');

// .onchange replace instead of .oninput bro
input1.oninput = (value) => {
    if (value.target.value.length > 0 || value.target.value.length >= 2) {
        updateWeekYear(parseInt(value.target.value), 'week')
    }
}

input2.oninput = (value) => { 
    if (value.target.value.length > 0 || value.target.value.length >= 2) {
        updateWeekYear(parseInt(value.target.value), 'year')
    }
}

window.updateWeekYear = function updateWeekYear(value, defType) {
    if (defType === 'year') {
        let findDays = (currentWeekNumber * 7)
        enterCurrentDate = currentDateFor.dayOfYear(findDays)._d.getDate()
        enterCurrentYear = value
    } else if(defType === 'week') {
        let findMonth = value
        currentWeekNumber = parseInt(findMonth)
        let findDays = (findMonth * 7)
        enterCurrentWeek = Math.ceil(findDays/30)
        enterCurrentDate = currentDateFor.dayOfYear(findDays)._d.getDate()
    }
    currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
    weekStart = currentDate.clone().startOf('week')
    displayFunc(weekStart)
    document.getElementsByClassName('input1')[0].value = currentWeekNumber
    document.getElementsByClassName('input2')[0].value = enterCurrentYear
}

window.nextWeekFunc = function nextWeekFunc(value, weekNextIn) {
    if (weekNextIn === 0) {
        prevWeekFunc(value, weekNextIn)
    } else {
        nextWeek = currentDate.clone().add(weekNextIn, 'week').clone().startOf('week')
        weekNext += value
        displayFunc(nextWeek)
    }
}
window.resetYear = function resetYear(params) {
    if (params === 0 || params === -1) {
        currentWeekNumber = 52
        enterCurrentYear -= 1
    } else if(params >= 52) {
        currentWeekNumber = 0
        enterCurrentYear +=1
    }
    document.getElementsByClassName('input2')[0].value = enterCurrentYear
}
window.prevWeekFunc = function prevWeekFunc(value, weekPrevIn) {
    if (weekPrevIn === 0) {
        
        prevWeek = currentDate.clone().subtract(weekPrevIn, 'week').clone().startOf('week')
        weekPrev += value
        displayFunc(prevWeek)
    } else {
        nextWeekFunc(value, weekPrevIn)
    }
}

window.updateWeek = function updateWeek(value, method) {
    currentWeek += value
    if ('add' === method) {
        resetYear(currentWeekNumber)
        document.getElementsByClassName('input1')[0].value = (currentWeekNumber = parseInt(currentWeekNumber) + 1)
        nextWeekFunc(value, currentWeek)
    } else if('sub' === method) {
        resetYear(currentWeekNumber)
        document.getElementsByClassName('input1')[0].value = currentWeekNumber = parseInt(currentWeekNumber) - 1
        prevWeekFunc(value, currentWeek)
    }
}
window.displayFunc = function displayFunc(weekDays) {
  const data = JSON.stringify({
    query: projectQueries.getFilterProjects,
    variables: {
      filter: { "projectName": { "eq": localStorage.getItem("projectName") } }
    }
  });
  callApi(data).then(response => response.json())
  .then(data => {
  processDataProject = data.data.projects.edges[0].node.projectDevelopers
  processDataProject.push(localStorage.getItem("projectLaed"))
  for (let index = 0; index <= 6; index++) {
    currentDay.push(moment(weekDays).add(index, 'days').format("DD-MM-YYYY"))
}
var html = "<table id='mockup'><th>Employees</th><th>Sun <br>"+ currentDay[0] +"</th><th>Mon <br>"+ currentDay[1] +"</th><th>Tue <br>"+ currentDay[2] +"</th> <th>Wed <br>"+ currentDay[3] +"</th> <th>Thu <br>"+ currentDay[4] +"</th> <th>Fri <br>"+ currentDay[5] +"</th> <th>Sat <br>"+ currentDay[6] +"</th>";
for (let index = 0; index < processDataProject.length; index++) {
  html += `<tr><td>`+ processDataProject[index] +`</td>`
  for (let indexCell = 0; indexCell < currentDay.length; indexCell++) {
      html += `<td id="content`+ index + indexCell +`" contenteditable="true"></td>`
  }
  html += `</tr>`
}
html += "</table>";
document.getElementById("result").innerHTML = html;
currentDay = [];
createListData()

  })
    // let array = [1,2,3]  // Replace with employee table
    
}
displayFunc(weekStart);

function createListData() {
  var n1 = document.getElementById("mockup").rows.length;
  var i=0,j=0;
  let store = ''
  let firstTime = true;
  let cellData = [];
  let rowData = [];
  for(i=0; i<n1;i++){
    var n2 = document.getElementById("mockup").rows[i].cells.length;
    for(j=0; j<n2;j++){
      var x=document.getElementById("mockup").rows[i].cells.item(j).innerHTML;
      if (j === 1 && firstTime === true) {
        for (let index = 0; index < x.split('<br>')[1].split('-').length; index++) {
          store += x.split('<br>')[1].split('-')[index]
          
        }
        firstTime = false
      }
      cellData.push(x)
    }
    rowData.splice(i, 0,cellData)
    cellData = []
  }
  console.log(JSON.stringify(rowData));
  console.log(JSON.parse([JSON.stringify(rowData)]));
  let stringify = JSON.stringify(rowData)
  const data = JSON.stringify({
    query: dashboardMutations.createDashboard,
    variables: {
        input: {
            dashboard: {
                dashboardId: store,
                dashboardArray: [stringify]
            }
        }
    }
});
debugger
callApi(data)
}

window.updateListData = function updateListData() {
  
}
window.getListData = function getListData() {
  let assignArray = [
    ["Employees", "Sun <br>15-08-2021", "Mon <br>16-08-2021", "Tue <br>17-08-2021", "Wed <br>18-08-2021", "Thu <br>19-08-2021", "Fri <br>20-08-2021", "Sat <br>21-08-2021"],
    ["2", "Jesus", "", "", "", "", "", ""],
    ["peter", "", "", "", "", "", "", ""]
  ]
  var n1 = document.getElementById("mockup").rows.length;
  var i=0,j=0;
  for(i=0; i<n1;i++){
    var n2 = document.getElementById("mockup").rows[i].cells.length;
    for(j=0; j<assignArray[i].length;j++){
      document.getElementById("mockup").rows[i].cells.item(j).innerHTML = assignArray[i][j]
    }
  }

}


// function callMeTODisplayEmployee() {
//   const data = JSON.stringify({
//     query: queries.getEmployes
//   });
//   callApi(data).then(response => response.json())
//   .then(data => {
//   processData = data.data.employees.edges
//   for (let index = 0; index < processData.length; index++) {
//       const element = processData[index];
//       delete element.node.created
//       delete element.node.updated
//       processedArray.push(element.node)
//   }
//   // displayOption(processedArray)
//   })
//   .catch((error) => {
//   console.error('Error:', error);
//   });

// }

// callMeTODisplayEmployee();

// (function callMeTODisplayProject() {
  
// })();

// document.getElementById('editTable').innerHTML = `
//   <thead>
//     <tr>
//       <th class="table-active" scope="col">#</th>
//       <th scope="col">First</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr class="table-active">
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td>
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td id="content" contenteditable="true"></td>
//       <td>@twitter</td>
//       <td id="content" contenteditable="true">Demo</td>
//     </tr>
//   </tbody>
// `
