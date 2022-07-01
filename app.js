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
            recRecipes()
        }
    })
}

addButton.addEventListener('click', addIngred)

// add top 12 popular recipes - default home page
const recRecipes = () => {
    recipeSectionTitle.innerHTML = 'Recommended Recipes'
    const recipeCardSection = document.querySelector('#all-recipes')

    // set up Spoonacular Nutrition, Recipe, and Food API and API key
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd5a99d1802msh5b96d6d154aec08p15be3cjsnd7ee3bd1833e',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    
    // get random recipes from Spoonacular Nutrition, Recipe, and Food API
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=16', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            // make recipe cards
            for(let i = 0; i < 16; i++){
                // recipe card
                const recipeCard = document.createElement('div')
                recipeCard.classList.add('one-recipe')
                recipeCardSection.append(recipeCard)

                // card image
                const image = document.createElement('img')
                let imageVal = response.recipes[i].image
                image.setAttribute('src', imageVal)
                recipeCard.append(image)

                // recipe title
                const title = document.createElement('h3')
                let titleVal = response.recipes[i].title
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
                let cookTimeVal = response.recipes[i].readyInMinutes + ' min'
                cookTime.innerHTML = cookTimeVal
                cookDiv.append(cookTime)

                // servings
                const servings = document.createElement('p')
                let servingsVal = response.recipes[i].servings
                servings.innerHTML = 'Servings: ' + servingsVal
                details.append(servings)

                // cuisine
                let cuisineVal = response.recipes[i].cuisines

                // health score
                let healthScoreVal = response.recipes[i].healthScore

                // summary
                let summaryVal = response.recipes[i].summary

                // ingredients + instructions
                let analyzedInstructions = response.recipes[i].analyzedInstructions

                // --- make modals for each recipe card --- //
                // modal div
                const modalDiv = document.createElement('div') 
                modalDiv.classList.add('modal')
                modalDiv.classList.add(`modal-${i}`)
                document.body.append(modalDiv)

                // recipe image
                const recipeImg = document.createElement('img')
                recipeImg.setAttribute('src', imageVal)
                modalDiv.append(recipeImg)

                // x - close button
                const xButton = document.createElement('button')
                xButton.classList.add('close-modal')
                xButton.classList.add(`close-modal-${i}`)
                modalDiv.append(xButton)

                const xIcon = document.createElement('img')
                xIcon.setAttribute('src', 'images/x-close.svg')
                xButton.append(xIcon)

                // recipe title
                const modalTitle = document.createElement('h2')
                modalTitle.innerHTML = titleVal
                modalDiv.append(modalTitle)

                // details div
                const modalDetails = document.createElement('div') 
                modalDetails.classList.add('modal-details')
                modalDiv.append(modalDetails)

                // cuisine
                if(cuisineVal.length !== 0){
                    const cuisineDiv = document.createElement('div')
                    cuisineDiv.classList.add('cuisine')
                    modalDetails.append(cuisineDiv)

                    const cuisineIcon = document.createElement('img')
                    cuisineIcon.setAttribute('src', 'images/dish.png')
                    cuisineDiv.append(cuisineIcon)

                    const cuisine = document.createElement('p')
                    let listOfCuisines = ""
                    for(let i = 0; i < cuisineVal.length; i++){
                        if(cuisineVal.length === 1){
                            listOfCuisines += cuisineVal[i]
                            break
                        }else{
                            if(i === cuisineVal.length - 1){
                                listOfCuisines += cuisineVal[i]
                            }else{
                                listOfCuisines += cuisineVal[i] + ", "
                            }
                        }
                    }
                    cuisine.innerHTML = listOfCuisines
                    cuisineDiv.append(cuisine)
                }
                // cook time
                const modalCookDiv = document.createElement('div')
                modalCookDiv.classList.add('modal-cook-time')
                modalDetails.append(modalCookDiv)

                const modalCookIcon = document.createElement('img')
                modalCookIcon.setAttribute('src', 'images/clock.svg')
                modalCookDiv.append(modalCookIcon)

                const modalCookTime = document.createElement('p')
                modalCookTime.innerHTML = cookTimeVal
                modalCookDiv.append(modalCookTime)

                // health score
                const healthScoreDiv = document.createElement('div')
                healthScoreDiv.classList.add('health-score')
                modalDetails.append(healthScoreDiv)

                const healthScoreIcon = document.createElement('img')
                healthScoreIcon.setAttribute('src', 'images/heart-pulse.svg')
                healthScoreDiv.append(healthScoreIcon)

                const healthScore = document.createElement('p')
                healthScore.innerHTML = 'Health: ' + healthScoreVal + "%"
                healthScoreDiv.append(healthScore)

                // servings
                const modalServings = document.createElement('p')
                modalServings.innerHTML = 'Servings: ' + servingsVal
                modalDetails.append(modalServings)

                // summary
                const summary = document.createElement('p')
                summary.innerHTML = summaryVal
                modalDiv.append(summary)

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

                for(let analIntructIndex = 0; analIntructIndex < analyzedInstructions.length; analIntructIndex++){
                    for(let stepIndex = 0; stepIndex < analyzedInstructions[analIntructIndex].steps.length; stepIndex++){
                        for(let ingredIndex = 0; ingredIndex < analyzedInstructions[analIntructIndex].steps[stepIndex].ingredients.length; ingredIndex++){
                            const ingred = analyzedInstructions[analIntructIndex].steps[stepIndex].ingredients[ingredIndex].name
                            const bullet = document.createElement('li')
                            bullet.innerHTML = ingred
                            list.append(bullet)
                        }
                    }
                }

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

                for(let analIntructIndex = 0; analIntructIndex < analyzedInstructions.length; analIntructIndex++){
                    for(let stepIndex = 0; stepIndex < analyzedInstructions[analIntructIndex].steps.length; stepIndex++){
                        const step = analyzedInstructions[analIntructIndex].steps[stepIndex].step
                        const bullet2 = document.createElement('li')
                        bullet2.innerHTML = step
                        list2.append(bullet2)
                    }
                }
                // --- end make modals for each recipe card --- //

                // --- toggle modal --- //
                // createModal(imageVal, titleVal, cookTimeVal, servingsVal, cuisineVal, healthScoreVal, summaryVal, analyzedInstructions)
                const closeModalButton = document.querySelector(`.close-modal-${i}`)
                const overlay = document.querySelector('.overlay')
                const modal = document.querySelector(`.modal-${i}`)

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
        })
        .catch(err => console.error(err));
}

// automatically load top popular results when you open the sight for the first time
recRecipes()

// search for recipes with ingredients in pantry
const search = () => {
    let numRecipes = 12
    recipeSectionTitle.innerHTML = `${numRecipes} Recipes Based on Your Ingredients`
}

searchBtn.addEventListener('click', search)






// DEBUGGGGGGG

// const recipeCardSection = document.querySelector('#all-recipes')
// // recipe card
// const recipeCard = document.createElement('div')
// recipeCard.classList.add('one-recipe')
// recipeCardSection.append(recipeCard)

// // card image
// const image = document.createElement('img')
// let imageVal = 'images/food-example.jpeg'
// image.setAttribute('src', imageVal)
// recipeCard.append(image)

// // recipe title
// const title = document.createElement('h3')
// let titleVal = 'Scrambled Eggs and Tomatoes With Rice'
// title.innerHTML = titleVal
// recipeCard.append(title)

// // details div
// const details = document.createElement('div')
// details.classList.add('details')
// recipeCard.append(details)

// // cook time
// const cookDiv = document.createElement('div')
// cookDiv.classList.add('cook-time')
// details.append(cookDiv)

// const cookIcon = document.createElement('img')
// cookIcon.setAttribute('src', 'images/clock.svg')
// cookDiv.append(cookIcon)

// const cookTime = document.createElement('p')
// let cookTimeVal = '20 min'
// cookTime.innerHTML = cookTimeVal
// cookDiv.append(cookTime)

// // servings
// const servings = document.createElement('p')
// let servingsVal = '2'
// servings.innerHTML = 'Servings: ' + servingsVal
// details.append(servings)

// //////////////////////////////////////////////////////

// // recipe card
// const recipeCard2 = document.createElement('div')
// recipeCard2.classList.add('one-recipe')
// recipeCardSection.append(recipeCard2)

// // card image
// const image2 = document.createElement('img')
// let imageVal2 = 'images/food-example.jpeg'
// image2.setAttribute('src', imageVal2)
// recipeCard2.append(image2)

// // recipe title
// const title2 = document.createElement('h3')
// let titleVal2 = 'Scrambled Eggs and Tomatoes With Rice Scrambled Eggs and Tomatoes With Rice'
// title2.innerHTML = titleVal2
// recipeCard2.append(title2)

// // details div
// const details2 = document.createElement('div')
// details2.classList.add('details')
// recipeCard2.append(details2)

// // cook time
// const cookDiv2 = document.createElement('div')
// cookDiv2.classList.add('cook-time')
// details2.append(cookDiv2)

// const cookIcon2 = document.createElement('img')
// cookIcon2.setAttribute('src', 'images/clock.svg')
// cookDiv2.append(cookIcon2)

// const cookTime2 = document.createElement('p')
// let cookTimeVal2 = '20 min'
// cookTime2.innerHTML = cookTimeVal2
// cookDiv2.append(cookTime2)

// // servings
// const servings2 = document.createElement('p')
// let servingsVal2 = '2'
// servings2.innerHTML = 'Servings: ' + servingsVal2
// details2.append(servings2)
