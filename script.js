const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        addItemToDOM(item);
    });
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;

    // validate input
    if (newItem === '') {
        alert('please add an item');
        return;
    }

    // create item DOM element
    addItemToDOM(newItem);

    // add item to local storage
    addItemToStorage(newItem);

    checkUI();
    itemInput.value = '';
}

function addItemToDOM(item) {
    // create a new element list
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // add li to the DOM
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // add new item to array
    itemsFromStorage.push(item);

    // convert to JSON string and set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item) {
    console.log(item);

    // remove item from DOM
    if (confirm('are you sure')) {
        item.remove();
    }

    // remove item from storage
    removeItemFromStorage(item.textContent);
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    console.log(itemsFromStorage);

    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => {
        return i != item;
    });

    // re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // clear from local storage
    localStorage.removeItem('items');

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    console.log(text);

    items.forEach((item) => {
        // the first child of each li is the text node
        const itemName = item.firstChild.textContent.toLowerCase();
        console.log(itemName);

        if (itemName.indexOf(text) != -1) {
            console.log(true);
            item.style.display = 'flex: ';
        } else {
            console.log(false);
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    console.log(items);

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// initialize app
function init() {
    // event listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

// only init is in the global scope
init();
