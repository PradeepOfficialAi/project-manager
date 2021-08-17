

const getTasks = `
query tasks($filter: TaskFilter!) {
  tasks(filter: $filter) {
    totalCount
    edges {
      node {
        id
        taskName
        startDate
        endDate
        projectName {
          projectName
        }
        taskDevelopers
      }
    }
  }
}
  
`

export { getTasks }