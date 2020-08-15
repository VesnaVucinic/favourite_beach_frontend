// I want listen on the document and add event listener, to listen the DOM content being loaded
const endPoint = "http://127.0.0.1:3000/api/v1/beaches"

document.addEventListener("DOMContentLoaded", () => {
    getBeaches()

    

    let createBeachForm = document.querySelector('#create-beach-form')

    createBeachForm.addEventListener('submit', (event) => createFormHandler(event))
    createFormHandler(event);
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
              <p>${beach.attributes.desription}</p>
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
    function postFetch(name, country_id, location, desription, image_url) {
        console.log(name, country_id, location, desription, image_url);
        let bodyData = {name, country_id, location, description, image_url}

        fetch(endPoint, {
            // POST request
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(beach => {
            console.log(beach);
            const beachData = beach.data.attributes
            // render JSON response
            const beachMarkup = `
            <div data-id=${beach.id}>
            <h3>${beachData.name}</h3>
            <p>${beachData.country.name}</p>
            <p>${beachData.location}</p>
            <p>${beachData.description}</p>
            <img src=${beachData.image_url} height="200" width="250">
            <button data-id=${beachData.id}>edit</button>
            </div>
            <br><br>`;

            document.querySelector('#beach-container').innerHTML += beachMarkup;
        }) 
    }


