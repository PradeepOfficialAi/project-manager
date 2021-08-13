
const createEmploye = `
mutation CreateEmployee($input: CreateOneEmployeInput!) {
  createOneEmploye(input:$input) {
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
mutation updateEmployee($input:UpdateOneEmployeInput!) {
  updateOneEmploye(input:$input) {
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
mutation deleteEmployee($input : DeleteOneEmployeInput!) {
  deleteOneEmploye(input: $input) {
    id
  }
}
`

export {
  createEmploye,
  updateEmployee,
  deleteEmployee
}