// import gql from 'graphql-tag';

const getEmployes = `
{
  employes {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
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