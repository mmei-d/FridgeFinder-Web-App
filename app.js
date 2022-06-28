// div of added ingredients
const ingredDiv = document.querySelector('#ingred-buttons')

// ingred input
const searchInput = document.querySelector('#search-input')

// ingred add button
const addButton = document.querySelector('#add')


// add ingredients to ingredients div
const addIngred = () => {
    // make ingredient button
    const ingred = document.createElement('button')

    // add x (delete ingred) to ingredient button
    const x = document.createElement('img')
    x.setAttribute('src', 'images/x-close.svg')
    ingred.append(x)

    if(searchInput.value === ''){
        alert("Please enter an ingredient :)");
    // add ingredient button to div w/ ingredients
    }else{
        ingred.innerHTML = searchInput.value
        ingredDiv.append(ingred)
    }

    // clear input field after adding ingredient
    searchInput.value = ''
}

addButton.addEventListener('click', addIngred)