const ingredDiv = document.querySelector('#ingred-buttons')
const searchInput = document.querySelector('#search-input')
const addButton = document.querySelector('#add')
const searchBtn = document.querySelector('#search-btn')
const recipeSectionTitle = document.querySelector('#recipes h2')
let numIngred = 0;

// add and remove ingredients
const addIngred = () => {
    // if there is no input, exit function, and don't add a button
    if(searchInput.value === ''){
        alert("Please enter an ingredient :)");
        return;
    }

    // increment number of ingredients by 1
    numIngred++

    // make "no ingredients added yet" text disappear
    const noIngred = document.querySelector('#no-ingred')
    noIngred.classList.add('hidden')

    // make search button appear
    searchBtn.classList.remove('hidden')

    // make ingredient button
    const ingred = document.createElement('button')
    ingredDiv.append(ingred)

    // add "x" to ingredient button
    const x = document.createElement('img')
    x.setAttribute('src', 'images/x-close.svg')
    ingred.append(x)

    // add button text
    const btnText = document.createElement('p')
    btnText.innerHTML = searchInput.value
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
            searchBtn.classList.add('hidden')
            popRecipes()
        }
    })
}

addButton.addEventListener('click', addIngred)

// add top popular recipes - default home page
const popRecipes = () => {
    recipeSectionTitle.innerHTML = 'Top Popular Recipes'
    const recipeCardSection = document.querySelector('#all-recipes')

    for(let i = 0; i < 12; i++){
        // recipe card
        const recipeCard = document.createElement('div')
        recipeCard.classList.add('one-recipe')
        recipeCardSection.append(recipeCard)

        // card image
        const image = document.createElement('img')
        let imageVal = 'images/food-example.jpeg'
        image.setAttribute('src', imageVal)
        image.setAttribute('alt', 'food photo')
        recipeCard.append(image)

        // recipe title
        const title = document.createElement('h3')
        let titleVal = 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs'
        title.innerHTML = titleVal
        recipeCard.append(title)

        // details div
        const details = document.createElement('div')
        details.classList.add('details')
        recipeCard.append(details)

        // cook time
        const cookDiv = document.createElement('div')
        cookDiv.classList.add('cook-time')
        details.append(cookDiv)

        const cookIcon = document.createElement('img')
        cookIcon.setAttribute('src', 'images/clock.svg')
        cookDiv.append(cookIcon)

        const cookTime = document.createElement('p')
        let cookTimeVal = '20 min'
        cookTime.innerHTML = cookTimeVal
        cookDiv.append(cookTime)

        // servings
        const servings = document.createElement('p')
        let servingsVal = 2
        servings.innerHTML = 'Servings: ' + servingsVal
        details.append(servings)
    }
}

// automatically load top popular results when you open the sight for the first time
popRecipes()

// search for recipes with ingredients in pantry
const search = () => {
    let numRecipes = 12
    recipeSectionTitle.innerHTML = `Search Results - You Can Make ${numRecipes} Recipes`
}

searchBtn.addEventListener('click', search)

