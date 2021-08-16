

const getTasks = `
query {
    tasks {
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