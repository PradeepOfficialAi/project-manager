// import gql from 'graphql-tag';

const getEmployes = `
query Employees{
  employees {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      node {
        id
        employeName
				employeCode
        employeEmail
        employeDesignation
        employeAddress
        created
        updated
      }
      cursor
    }
  }
}
`

// function getEmployes() {
//   console.log("What the shit is");
// }

export { getEmployes }