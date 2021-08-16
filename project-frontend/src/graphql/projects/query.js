
const  getProjects = `
query {
    projects {
      totalCount
      edges {
        node {
          id
          projectName
          startDate
          endDate
          projectLeaderId
          projectLeader {
            employeName
          }
          projectDevelopers
        }
      }
    }
  }
  
`

export { getProjects }