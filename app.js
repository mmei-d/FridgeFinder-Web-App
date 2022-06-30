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

        // cuisine
        let cuisineVal = 'Chinese'

        // health score
        let healthScoreVal = 10

        // --- toggle modal --- //
        createModal(imageVal, titleVal, cookTimeVal, servingsVal, cuisineVal, healthScoreVal)
        const closeModalButton = document.querySelector('.close-modal')
        const overlay = document.querySelector('.overlay')
        const modal = document.querySelector('.modal')

        const openModal = () => {
            modal.classList.add('modal-active')
            overlay.classList.add('overlay-active')
        }

        const closeModal = () => {
            modal.classList.remove('modal-active')
            overlay.classList.remove('overlay-active')
        }

        closeModalButton.addEventListener('click', closeModal)

        // if you click outside the modal, it closes
        overlay.addEventListener('click', () => {
            closeModal(modal)
        })

        recipeCard.addEventListener('click', openModal)
        // --- end toggle modal --- //
    }
}

// create a unique modal for each recipe card
const createModal = (imageVal, titleVal, cookTimeVal, servingsVal, cuisineVal, healthScoreVal) => {
    // modal div
    const modalDiv = document.createElement('div') 
    modalDiv.classList.add('modal')
    document.body.append(modalDiv)

    // recipe image
    const recipeImg = document.createElement('img')
    recipeImg.setAttribute('src', `${imageVal}`)
    modalDiv.append(recipeImg)

    // x - close button
    const xButton = document.createElement('button')
    xButton.classList.add('close-modal')
    modalDiv.append(xButton)

    const xIcon = document.createElement('img')
    xIcon.setAttribute('src', 'images/x-close.svg')
    xButton.append(xIcon)

    // recipe title
    const title = document.createElement('h2')
    title.innerHTML = titleVal
    modalDiv.append(title)

    // details div
    const details = document.createElement('div') 
    details.classList.add('modal-details')
    modalDiv.append(details)

    // cuisine
    const cuisineDiv = document.createElement('div')
    cuisineDiv.classList.add('cuisine')
    details.append(cuisineDiv)

    const cuisineIcon = document.createElement('img')
    cuisineIcon.setAttribute('src', 'images/dish.png')
    cuisineDiv.append(cuisineIcon)

    const cuisine = document.createElement('p')
    cuisine.innerHTML = cuisineVal
    cuisineDiv.append(cuisine)

    // cook time
    const cookDiv = document.createElement('div')
    cookDiv.classList.add('modal-cook-time')
    details.append(cookDiv)

    const cookIcon = document.createElement('img')
    cookIcon.setAttribute('src', 'images/clock.svg')
    cookDiv.append(cookIcon)

    const cookTime = document.createElement('p')
    cookTime.innerHTML = cookTimeVal
    cookDiv.append(cookTime)

    // health score
    const healthScoreDiv = document.createElement('div')
    healthScoreDiv.classList.add('health-score')
    details.append(healthScoreDiv)

    const healthScoreIcon = document.createElement('img')
    healthScoreIcon.setAttribute('src', 'images/heart-pulse.svg')
    healthScoreDiv.append(healthScoreIcon)

    const healthScore = document.createElement('p')
    healthScore.innerHTML = 'Health: ' + healthScoreVal + "%"
    healthScoreDiv.append(healthScore)

    // servings
    const servings = document.createElement('p')
    servings.innerHTML = 'Servings: ' + servingsVal
    details.append(servings)

    // line break
    const line = document.createElement('hr')
    modalDiv.append(line)

    // ingredients div w/ bulleted ingredients
    const ingredDiv = document.createElement('div')
    ingredDiv.classList.add('modal-ingred-div')
    modalDiv.append(ingredDiv)

    const ingredHeader = document.createElement('h3')
    ingredHeader.innerHTML = 'Ingredients'
    ingredDiv.append(ingredHeader)

    const list = document.createElement('ul')
    ingredDiv.append(list)

    const bullet = document.createElement('li')
    bullet.innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt tempore adipisci alias soluta distinctio ullam autem harum. Omnis tempora sapiente aut atque consectetur at id nobis dolores sit minus, error recusandae maiores dolor cumque? Illo amet consequatur maiores voluptatibus libero magnam cupiditate quos numquam, suscipit quae praesentium rerum possimus eos, reprehenderit beatae quisquam excepturi doloremqu.'
    list.append(bullet)

    // line break
    const line2 = document.createElement('hr')
    modalDiv.append(line2)

    // instructions div w/ bulleted list
    const instructDiv = document.createElement('div')
    instructDiv.classList.add('instructions-div')
    modalDiv.append(instructDiv)

    const instructHeader = document.createElement('h3')
    instructHeader.innerHTML = 'Instructions'
    instructDiv.append(instructHeader)

    const list2 = document.createElement('ol')
    instructDiv.append(list2)

    const bullet2 = document.createElement('li')
    bullet2.innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt tempore adipisci alias soluta distinctio ullam autem harum. Omnis tempora sapiente aut atque consectetur at id nobis dolores sit minus, error recusandae maiores dolor cumque? Illo amet consequatur maiores voluptatibus libero magnam cupiditate quos numquam, suscipit quae praesentium rerum possimus eos, reprehenderit beatae quisquam excepturi doloremqu.'
    list2.append(bullet2)

}

// automatically load top popular results when you open the sight for the first time
popRecipes()

// search for recipes with ingredients in pantry
const search = () => {
    let numRecipes = 12
    recipeSectionTitle.innerHTML = `${numRecipes} Recipes Based on Your Ingredients`
}

searchBtn.addEventListener('click', search)
