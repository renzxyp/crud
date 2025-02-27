// Get elements from the DOM
const addItemButton = document.getElementById('addItemButton');
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const addressInput = document.getElementById('addressInput');
const imageInput = document.getElementById('imageInput');
const itemList = document.getElementById('itemList');

let selectedImageURL = ''; // Store the selected image URL

// Event listener for the file input change (when an image is selected)
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // When file is loaded, set the selected image URL
        reader.onload = function(e) {
            selectedImageURL = e.target.result;
            alert('Image selected successfully!');
        };
        
        // Read the selected file as Data URL
        reader.readAsDataURL(file);
    }
});

// Event listener for adding an item
addItemButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const address = addressInput.value.trim();

    if (name && age && address && selectedImageURL) {
        const listItem = createItemElement(name, age, address, selectedImageURL);
        itemList.appendChild(listItem);
        nameInput.value = ''; 
        ageInput.value = '';
        addressInput.value = '';
        selectedImageURL = ''; // Reset image URL after adding the item
        imageInput.value = '';  // Reset the file input
    } else {
        alert('Please fill in all fields and select an image!');
    }
});

// Function to create a list item element
function createItemElement(name, age, address, image) {
    const li = document.createElement('li');
    
    // Image
    const img = document.createElement('img');
    img.src = image;
    img.alt = name;

    // Create details section
    const details = document.createElement('div');
    details.classList.add('details');

    const nameElem = document.createElement('p');
    nameElem.textContent = `Name: ${name}`;
    details.appendChild(nameElem);

    const ageElem = document.createElement('p');
    ageElem.textContent = `Age: ${age}`;
    details.appendChild(ageElem);

    const addressElem = document.createElement('p');
    addressElem.textContent = `Address: ${address}`;
    details.appendChild(addressElem);

    li.appendChild(img);
    li.appendChild(details);

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editItem(li));
    li.appendChild(editButton);
    
    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteItem(li));
    li.appendChild(deleteButton);
    
    return li;
}

// Function to edit an item
function editItem(item) {
    const name = prompt('Edit Name:', item.querySelector('.details p').textContent.split(': ')[1]);
    const age = prompt('Edit Age:', item.querySelector('.details p:nth-child(2)').textContent.split(': ')[1]);
    const address = prompt('Edit Address:', item.querySelector('.details p:nth-child(3)').textContent.split(': ')[1]);
    const image = prompt('Edit Image URL:', item.querySelector('img').src);

    if (name && age && address && image) {
        item.querySelector('.details p').textContent = `Name: ${name}`;
        item.querySelector('.details p:nth-child(2)').textContent = `Age: ${age}`;
        item.querySelector('.details p:nth-child(3)').textContent = `Address: ${address}`;
        item.querySelector('img').src = image;
    }
}

// Function to delete an item
function deleteItem(item) {
    if (confirm('Are you sure you want to delete this item?')) {
        itemList.removeChild(item);
    }
}
