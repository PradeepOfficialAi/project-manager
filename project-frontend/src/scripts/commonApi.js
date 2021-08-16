// debugger
export function callApi(data) {
  return fetch('http://localhost:3000/graphql', {
  method: 'POST', // or 'PUT'
  mode: 'cors',
  cache: 'default',
  headers: {
      'Content-Type': 'application/json',
  },
  body: data,
  })
}
