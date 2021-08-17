import { callApi } from "./commonApi.js";
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
let processDataProject = [];
let dashboardPushId;
var i=0,j=0;
let cellData = [];
let rowData = [];
let assignArray = [];
let setUpdate = false;
let processDataDashboard;

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
  setUpdate = false
  dashboardPushId = ''
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
  setUpdate = false
  dashboardPushId = ''
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

  var html = "<table id='mockup'><th>Employees</th><th>Sun <br>"+ currentDay[0] +"</th><th>Mon <br>"+ currentDay[1] +"</th><th>Tue <br>"+ currentDay[2] +"</th> <th>Wed <br>"+ currentDay[3] +"</th> <th>Thu <br>"+ currentDay[4] +"</th> <th>Fri <br>"+ currentDay[5] +"</th> <th>Sat <br>"+ currentDay[6] +"</th><th>Per/Employee <br> total hour </th>";
  for (let index = 0; index < processDataProject.length; index++) {
    html += `<tr><td>`+ processDataProject[index] +`</td>`
    for (let indexCell = 0; indexCell < currentDay.length; indexCell++) {
        html += `<td id="content`+ index + indexCell +`" contenteditable="true">0</td>`
    }
    html += `<td id="`+ processDataProject[index] +`"></td></tr>`
  }
  html += `<tr style="padding: 30px;">
  <td><h4></h4></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>`
  html += "</table>";
  document.getElementById("result").innerHTML = html;
  currentDay = [];

  }).then(data => {
    getListData()
  })
}

function getListData() {
  let listFirstTime = true;
  let storeList = '';
  var n1 = document.getElementById("mockup").rows.length;
  for(i=0; i<n1;i++){
    var n2 = document.getElementById("mockup").rows[i].cells.length;
    for(j=0; j<n2;j++){
      var x=document.getElementById("mockup").rows[i].cells.item(j).innerHTML;
      if (j === 1 && listFirstTime === true) {
        for (let index = 0; index < x.split('<br>')[1].split('-').length; index++) {
          storeList += x.split('<br>')[1].split('-')[index]
        }
        listFirstTime = false
      }
      cellData.push(x)
    }
    rowData.splice(i, 0,cellData)
    cellData = []
  }

  const data = JSON.stringify({
    query: dashboardQueries.getDashboards,
    variables: {
      filter: {
        dashboardId: {
          eq: storeList
        },
        dashboardProjectId:{
          eq: localStorage.getItem("projectName")
        }
      }
    }
  });
  callApi(data).then(response => response.json())
  .then(data => {
    processDataDashboard = data.data.dashboards.edges
    for (let index = 0; index < processDataDashboard.length; index++) {
      const element = processDataDashboard[index];
      if (element.node.dashboardId === storeList) {
        dashboardPushId = element.node.id
        setUpdate = true
        assignArray = JSON.parse(element.node.dashboardArray)
        var n1 = document.getElementById("mockup").rows.length;
        var i=0,j=0;
        for(i=0; i<n1;i++){
          var n2 = document.getElementById("mockup").rows[i].cells.length;
          for(j=0; j<assignArray[i].length;j++){
            document.getElementById("mockup").rows[i].cells.item(j).innerHTML = assignArray[i][j]
          }
        }
        totalCalculate(assignArray)
      }
    } 
  })
}

function createListData(dashId, createStringify) {
  const data = JSON.stringify({
    query: dashboardMutations.createDashboard,
      variables: {
        input: {
          dashboard: {
            dashboardProjectId: localStorage.getItem("projectName"),
            dashboardId: dashId,
            dashboardArray: [createStringify]
          }
        }
      }
  });
  if (setUpdate === false) {
    callApi(data)
  }
}

function updateListData(id, storeUpdate, updateStringify) {
  // updateStringify = totalCalculate(updateStringify)
  const data = JSON.stringify({
    query: dashboardMutations.updateDashboard,
    variables: {
      input: {
        id: parseInt(id),
        update: {
          dashboardId: storeUpdate,
          dashboardArray: [updateStringify]
        }
      }
    }
  }); 
  if (setUpdate) {
    callApi(data).then(data => {
      dashboardPushId = ''
      setUpdate = false
    })
  }
}

function totalCalculate(sheetData) {

  let calValue = 0;
  let storeArray = []
  let storeRowArray = []
  let findedId;
  let stringArray = sheetData
  for (let index = 1; index < stringArray.length && index < (stringArray.length - 1); index++) {
    for (let indexIn = 0; indexIn < stringArray[index].length && indexIn < (stringArray[index].length - 1); indexIn++) {
      findedId = stringArray[index][0]
      calValue = calValue + isNaN(parseInt(stringArray[index][indexIn])) === false ? 0 : parseInt(stringArray[index][indexIn]);
      storeArray.splice(index, 0, calValue)
    }
    
    storeRowArray.push({id: stringArray[index][0], value: storeArray.map((e)=>isNaN(e)?0:e).reduce((a, b) => a + b)})
    console.log(storeRowArray);
    storeArray = []
    calValue = 0
  }

  for (let index = 0; index < storeRowArray.length; index++) {
    const element = storeRowArray[index];
    console.log(element);
    document.getElementById(element.id).innerHTML = element.value
  }
  // debugger
  // return sheetData
}

window.collectExcel = function collectExcel() {
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
  let stringify = JSON.stringify(rowData)
  if (setUpdate) {
    updateListData(dashboardPushId, store, stringify)
  } else {
    createListData(store, stringify)
  }
}

window.redirectTask = function redirectTask() {
  window.location.href = './crudViews/crudTask.html';
}
displayFunc(weekStart);