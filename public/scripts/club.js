/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

function createClub(fields) {
  fetch('/api/clubs', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function modifyClub(fields) {
  fetch('/api/clubs', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteClub(fields) {
  fetch(`/api/clubs/${fields.name}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
