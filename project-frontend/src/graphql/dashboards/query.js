

const getDashboards = `
query {
    dashboards {
      edges {
        node {
          id
          dashboardId
          dashboardArray
        }
      }
    }
  }
  
`

export {
    getDashboards
}