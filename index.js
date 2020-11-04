//create a function that will use the below array to generate buttons and append them to the page

// the function should take 3 arguments - an array to be iterated over, className to be applied to the buttons, and the id of an element to append the buttons to. The button text should match the strings in our array.

const favActors = ["keanu reeves", "nicolas cage", "will smith"];

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

document.body.addEventListener("click", () => console.log("something was clicked!"))

buttonContainer.addEventListener("click", function(e) {
    e.stopPropagation()
    if(event.target.className === "actor-button"){
      console.log(e.target.innerText)

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





renderButtons(favActors, "actor-button", "button-container");
renderForm()
attachSubmitListener()
// before next week - attach an event listener to the button container that logs the text of the target button
// bonus - create an form with a single input. On submit, take the input value, add it too the text array and rerender the buttons to include the new text