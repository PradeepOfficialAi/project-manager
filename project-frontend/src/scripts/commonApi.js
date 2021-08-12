
export function callApi(data) {
  fetch('http://localhost:3000/graphql', {
  method: 'POST', // or 'PUT'
  headers: {
      'Content-Type': 'application/json',
  },
  body: data,
  })
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch((error) => {
  console.error('Error:', error);
  });
}
