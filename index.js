// I want listen on the document and add event listener, to listen the DOM content being loaded
const endPoint = "http://127.0.0.1:3000/api/v1/beaches"

document.addEventListener("DOMContentLoaded", () => {
    getBeaches()

     let createBeachForm = document.querySelector('#create-beach-form')
    //  createBeachForm.addEventListener('submit', (event) => console.log(event))

    // after form is submited it's calling form handeler, event is when submit is is pressed, then I need to send back data to backend to database , to create new instance of beach, and I need post fetch for that
    createBeachForm.addEventListener('submit', (event) => createFormHandler(event))
    // createFormHandler(event);
})

function getBeaches() {
    fetch(endPoint)
    .then(response => response.json()) 
    .then(beaches => {
          // remember our JSON data is a bit nested due to our serializer
        beaches.data.forEach(beach => {
          // double check how your data is nested in the console so you can successfully access the attributes of each individual object
          const beachMarkup = `
            <div data-id=${beach.id}>
              <h3>${beach.attributes.name}</h3>
              <p>${beach.attributes.country.name}</p>
              <p>${beach.attributes.location}</p>
              <p>${beach.attributes.description}</p>
              <img src=${beach.attributes.image_url} height="200" width="250">
              <br><br>
              <button data-id=${beach.id}>edit</button>
            </div>
            <br><br>`;
  
            document.querySelector('#beach-container').innerHTML += beachMarkup
        })
    })
}



function createFormHandler(event) {
    event.preventDefault()    
    const nameInput = document.querySelector('#input-name').value
    const countryId = parseInt(document.querySelector('#countries').value)
    const locationInput = document.querySelector('#input-location').value
    const descriptionInput = document.querySelector('#input-description').value
    const imageInput = document.querySelector('#input-url').value
        
    postBeach(nameInput, countryId, locationInput, descriptionInput, imageInput)
}

// in this function I am making post request to the backend
function postBeach(name, country_id, location, description, image_url) {
    // console.log(name, country_id, location, description, image_url);
    let bodyData = {name, country_id, location, description, image_url}

    fetch(endPoint, {
        // POST request
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(beach => {
        // console.log response to see if it's created properly
         console.log(beach);
       //  this part is manipulate DOM in what way - show data to user
        const beachData = beach.data
        // render JSON response, render data to user to see what created, manuplate DOM by showing user what created, data is pointing to single object not array like in get fetch where I had arrey and .forEach
        const beachMarkup = `
        <div data-id=${beach.id}>
        <h3>${beachData.attributes.name}</h3>
        <p>${beachData.attributes.country.name}</p>
        <p>${beachData.attributes.location}</p>
        <p>${beachData.attributes.description}</p>
        <img src=${beachData.attributes.image_url} height="200" width="250">
        <button data-id=${beachData.id}>edit</button>
        </div>
        <br><br>`;
        // I am selecting container and updaing HTML
        document.querySelector('#beach-container').innerHTML += beachMarkup;
    }) 
}


