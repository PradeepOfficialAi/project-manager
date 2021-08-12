
const employeMutation = `
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

export {
    employeMutation
}