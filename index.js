//create a function that will use the below array to generate buttons and append them to the page

// the function should take 3 arguments - an array to be iterated over, className to be applied to the buttons, and the id of an element to append the buttons to. The button text should match the strings in our array.

const favActors = ["keanu reeves", "nicolas cage", "will smith"];
const baseURL = new URL("https://api.giphy.com/v1/gifs/search?q=${form}&rating=G&api_key=dc6zaTOxFJmzC&limit=10");
const gifDiv = document.getElementById("gif-container");
/* 
1. def function w/ 3 arguments(arr, className, id)
const container = document.getElementById(id)
  2. start iterating over arr w/ forEach(function(text){}) == 
    3. btn = createElement(button)
    4. btn.className = className
    5. btn.innerText = text
    6. append btn to container
*/

const buttonContainer = document.getElementById("button-container");

function renderButtons(arr, className, id) {
  const container = document.getElementById(id);
  container.innerHTML = ""
  arr.forEach(function (text) {
    const btn = createButton(text, className)
    container.append(btn);
  });
}


function createButton(text, className){
  const btn = document.createElement("button");
  btn.className = className;
  btn.innerText = text;
  return btn
}

//document.body.addEventListener("click", () => console.log("something was clicked!"))

buttonContainer.addEventListener("click", function(e) {
    gifDiv.innerHTML = "";
    e.stopPropagation()
    if(e.target.className === "actor-button"){
      console.log(e.target.innerText);
      let searchParams = baseURL.searchParams;
      searchParams.set("q", e.target.innerText);
      console.log(baseURL.toString());
      fetchActors();
    }
})

function renderForm(){
  const container = document.getElementById("form-container")
  container.innerHTML = ` 
  <form id="create-form" action="#" method="post">
    <label for="new-awesome-actor">Awesome Actor:</label>
    <input type="text" id="new-awesome-actor" name="new-awesome-actor" placeholder="Actor">
    <input type="submit" value="Create New Actor">
  </form>`
}

function attachSubmitListener(){
  const createForm = document.getElementById("create-form");
  createForm.addEventListener("submit", (event) => {
    
    handleOnSubmit(event)
  })
}

 function handleOnSubmit(event) {
    event.preventDefault();
    let newActor = document.getElementById("new-awesome-actor").value;
    // const actor = event.target["new-awesome-actor"].value
    favActors.push(newActor);
    console.log(favActors);
    event.target.reset();
    renderButtons(favActors, "actor-button", "button-container");
}

function fetchActors() {
  fetch(baseURL)
    .then(resp => resp.json()) 
    //.then(console.log)
    .then(returnedData => {
      returnedData.data.forEach(data => {
        renderActorGif(data)
      })
       //console.log(returnedData.data[0].images.original.url)
})
}

function renderActorGif(data) {
  //const gifDiv = document.getElementById("gif-container");
  const img = document.createElement("img");
  img.src = data.images.fixed_height_still.url
  img.setAttribute("data-url", data.images.fixed_height.url)
  gifDiv.appendChild(img);
}

function playPauseHandler(){
  const gifDiv = document.getElementById("gif-container");
  gifDiv.addEventListener("click", function(event){
    //debugger
    if(event.target.tagName === "IMG"){
      const temp = event.target.src
      event.target.src = event.target.dataset.url
      event.target.setAttribute("data-url", temp)
    }
  })

}




renderButtons(favActors, "actor-button", "button-container");
renderForm()
attachSubmitListener()
playPauseHandler()


