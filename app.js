const ingredDiv = document.querySelector('#ingred-buttons')
const searchInput = document.querySelector('#search-input')
const addButton = document.querySelector('#add')
let numIngred = 0;

// add and remove ingredients
const addIngred = () => {
    // increment number of ingredients by 1
    numIngred++

    // make "no ingredients added yet" text disappear
    const noIngred = document.querySelector('#no-ingred')
    noIngred.classList.add('hidden')

    // make ingredient button
    const ingred = document.createElement('button')
    ingredDiv.append(ingred)

    // add "x" to ingredient button
    const x = document.createElement('img')
    x.setAttribute('src', 'images/x-close.svg')
    ingred.append(x)

    // add button text
    const btnText = document.createElement('p')
    if(searchInput.value === ''){
        alert("Please enter an ingredient :)");
    }else{
        btnText.innerHTML = searchInput.value
    }
    ingred.append(btnText)

    // clear input field after adding ingredient
    searchInput.value = ''

    // delete ingredient
    ingred.addEventListener('click', () => {
        ingred.remove()
        numIngred--
        // if all ingredients have been removed, show "no ingred in pantry" message again
        if(numIngred === 0){
            noIngred.classList.remove('hidden')
        }
    })
}

addButton.addEventListener('click', addIngred)

// add home page popular recipes
const recipeSection = document.querySelector('#all-recipes')

for(let i = 0; i < 12; i++){
    // recipe card
    const recipeCard = document.createElement('div')
    recipeSection.append(recipeCard)
    recipeCard.classList.add('one-recipe')

    // card image
    const image = document.createElement('img')
    let imageVal = 'images/food-example.jpeg'
    image.setAttribute('src', imageVal)
    image.setAttribute('alt', 'food photo')
    recipeCard.append(image)

    // recipe title
    const title = document.createElement('h3')
    let titleVal = 'Recipe Title'
    title.innerHTML = titleVal
    recipeCard.append(title)

    // cuisine
    const cuisine = document.createElement('p')
    cuisine.classList.add('cuisine')
    let cuisineVal = 'Chinese'
    cuisine.innerHTML = 'Cuisine: ' + cuisineVal
    recipeCard.append(cuisine)

    // health score
    const healthScore = document.createElement('p')
    healthScore.classList.add('health-score')
    let healthScoreVal = 10
    healthScore.innerHTML = 'Health Score: ' + healthScoreVal
    recipeCard.append(healthScore)

    // cook time
    const cookTime = document.createElement('p')
    cookTime.classList.add('cook-time')
    let cookTimeVal = '20 min'
    cookTime.innerHTML = 'Cook Time: ' + cookTimeVal
    recipeCard.append(cookTime)

    // servings
    const servings = document.createElement('p')
    servings.classList.add('servings')
    let servingsVal = 2
    servings.innerHTML = 'Servings: ' + servingsVal
    recipeCard.append(servings)
}

