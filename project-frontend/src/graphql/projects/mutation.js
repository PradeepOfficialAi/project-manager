
const createProject = `
mutation createProject($input: CreateOneProjectInput!) {
    createOneProject(input: $input) {
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
  
`

const updateProject = `
mutation updateProject($input: UpdateOneProjectInput!) {
  updateOneProject(input: $input) {
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
`

const deleteProject = `
mutation deleteProject($input: DeleteOneProjectInput!) {
  deleteOneProject(input: $input) {
    id
  }
}

`

export { 
  createProject,
  updateProject,
  deleteProject
 }