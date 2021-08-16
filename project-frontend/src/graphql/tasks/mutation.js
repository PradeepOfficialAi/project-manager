

const  createTask = `
mutation createTask($input: CreateOneTaskInput!) {
  createOneTask(input: $input) {
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
  
`

const updateTask = `
mutation updateTask($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
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
  
`

const deleteTask = `
mutation deleteTask($input: DeleteOneTaskInput!) {
    deleteOneTask(input: $input) {
      id
    }
  }
  
`

export { 
    createTask,
    updateTask,
    deleteTask
 }