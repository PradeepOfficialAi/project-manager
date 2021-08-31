
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
            id
            employeName
          }
          projectDevelopers
        }
      }
    }
  }
  
`
const getFilterProjects = `
query projects($filter: ProjectFilter!) {
  projects(filter: $filter) {
    edges {
      node {
        projectName
        projectDevelopers
      }
    }
  }
}

`

export { 
  getProjects,
  getFilterProjects
 }