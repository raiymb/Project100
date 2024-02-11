// Global variables for pagination and form mode
let currentPage = 1;
const limit = 5; // Match this with your backend limit

// Reset the form to its default state for adding new contacts
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('createContactForm').onsubmit = addNewContact;
}

// Add a new contact function
function addNewContact(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    fetch('/api/contacts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            loadContacts(currentPage); // Reload contacts to include the new one
            resetForm(); // Reset the form after successful addition
        }
    })
    .catch(error => console.error('Error creating contact:', error));
}

// Function to prepare the form for editing a specific contact
function prepareFormForEdit(id, name, email, phone) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    document.getElementById('createContactForm').onsubmit = function(e) {
        updateContact(e, id);
    };
}

// Update contact function
function updateContact(e, contactId) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    fetch(`/api/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            loadContacts(currentPage); // Reload contacts to reflect the update
            resetForm(); // Reset the form to default state
        }
    })
    .catch(error => console.error('Error updating contact:', error));
}

// Delete a contact
function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(response => {
            if (response.ok) {
                loadContacts(currentPage); // Reload contacts to reflect the deletion
            } else {
                alert('Failed to delete contact');
            }
        })
        .catch(error => console.error('Error deleting contact:', error));
    }
}

// Load contacts with pagination
async function loadContacts(page = 1) {
    const contactListElement = document.getElementById('contactList');
    contactListElement.innerHTML = ''; // Clear current contacts
    try {
        const response = await fetch(`/api/contacts?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        });
        const { contacts, totalPages } = await response.json();
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.innerHTML = `
                <h3>${contact.name}</h3>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phone}</p>
                <button onclick="prepareFormForEdit('${contact._id}', '${contact.name}', '${contact.email}', '${contact.phone}')">Edit</button>
                <button onclick="deleteContact('${contact._id}')">Delete</button>
            `;
            contactListElement.appendChild(contactElement);
        });
        updatePaginationControls(page, totalPages);
    } catch (error) {
        console.error('Failed to load contacts:', error);
    }
}

// Update pagination controls
function updatePaginationControls(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = ''; // Clear current pagination controls

    // Previous page button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.innerText = 'Previous';
        prevBtn.onclick = () => loadContacts(currentPage - 1);
        paginationElement.appendChild(prevBtn);
    }

    // Next page button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next';
        nextBtn.onclick = () => loadContacts(currentPage + 1);
        paginationElement.appendChild(nextBtn);
    }
}

// Initial actions
document.addEventListener('DOMContentLoaded', () => {
    loadContacts(currentPage); // Load initial set of contacts
    document.getElementById('createContactForm').onsubmit = addNewContact; // Default form action
});

// Logout functionality
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('jwt');
    window.location.href = 'login.html';
});
