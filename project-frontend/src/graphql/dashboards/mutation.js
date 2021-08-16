

const createDashboard = `
mutation createDashboard($input: CreateOneDashboardInput!) {
    createOneDashboard(input: $input) {
      id
      dashboardId
      dashboardArray
    }
  }
  
`

const updateDashboard = `
mutation updateDashboard($input: UpdateOneDashboardInput!) {
    updateOneDashboard(input: $input) {
      id
      dashboardId
      dashboardArray
    }
  }
`

const deleteDashboard = `
mutation deleteDashboard($input: DeleteOneDashboardInput!) {
    deleteOneDashboard(input: $input) {
      id
    }
  }
  
`

export {
    createDashboard,
    updateDashboard,
    deleteDashboard
}