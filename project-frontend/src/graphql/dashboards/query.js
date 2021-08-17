

const getDashboards = `
query dashboards($filter: DashboardFilter!) {
  dashboards(filter: $filter) {
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