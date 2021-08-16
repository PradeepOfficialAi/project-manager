
const createEmploye = `
mutation CreateEmployee($input: CreateOneEmployeeInput!) {
  createOneEmployee(input:$input) {
    id
    employeName
    employeCode
    employeEmail
    employeDesignation
    employeAddress
    created
    updated
  }
}
`

const updateEmployee = `
mutation updateEmployee($input:UpdateOneEmployeeInput!) {
  updateOneEmployee(input:$input) {
    id
    employeName
    employeCode
    employeEmail
    employeDesignation
    employeAddress
    created
    updated
  }
}
`

const deleteEmployee = `
mutation deleteEmployee($input : DeleteOneEmployeeInput!) {
  deleteOneEmployee(input: $input) {
    id
  }
}
`

export {
  createEmploye,
  updateEmployee,
  deleteEmployee
}