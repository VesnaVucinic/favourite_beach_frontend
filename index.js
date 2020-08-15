// I want listen on the document and add event listener, to listen the DOM content being loaded
const endPoint = "http://127.0.0.1:3000/api/v1/beaches"

document.addEventListener("DOMContentLoaded", () => {
    getBeaches()
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
              <img src=${beach.attributes.image_url} height="200" width="250">
              <br><br>
              <button data-id=${beach.id}>edit</button>
            </div>
            <br><br>`;
  
            document.querySelector('#beach-container').innerHTML += beachMarkup
        })
    })
}
