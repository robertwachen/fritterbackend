/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

 function createDiscourse(fields) {
    fetch('/api/discourses', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function modifyDiscourse(fields) {
    fetch('/api/discourses', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function deleteDiscourse(fields) {
    fetch(`/api/discourses/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }
  