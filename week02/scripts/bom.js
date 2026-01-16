// Get references to DOM elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add event listener for the Add Chapter button
button.addEventListener('click', function () {
    // Only add if input is not empty
    if (input.value.trim() !== '') {

        // Create list item
        const li = document.createElement('li');
        li.textContent = input.value;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Delete functionality
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
        });

        // Append delete button to list item
        li.append(deleteButton);

        // Append list item to list
        list.append(li);

        // Clear input and refocus
        input.value = '';
        input.focus();
    }
});
