document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addContactButton = document.getElementById('add-contact');
    const updateContactButton = document.getElementById('update-contact');
    const contactList = document.getElementById('contact-list');
    const searchInput = document.getElementById('search');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let editIndex = null;

    const renderContacts = (contactsToRender) => {
        contactList.innerHTML = '';
        contactsToRender.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${contact.name} - ${contact.phone}
                <div class="actions">
                    <button class="edit" onclick="editContact(${index})">Edit</button>
                    <button class="delete" onclick="deleteContact(${index})">Delete</button>
                </div>
            `;
            contactList.appendChild(li);
        });
    };

    const saveContacts = () => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts(contacts);
    };

    addContactButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone) {
            contacts.push({ name, phone });
            saveContacts();
            nameInput.value = '';
            phoneInput.value = '';
        }
    });

    updateContactButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone && editIndex !== null) {
            contacts[editIndex] = { name, phone };
            saveContacts();
            nameInput.value = '';
            phoneInput.value = '';
            editIndex = null;
            addContactButton.style.display = 'inline-block';
            updateContactButton.style.display = 'none';
        }
    });

    window.editContact = (index) => {
        const contact = contacts[index];
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        editIndex = index;
        addContactButton.style.display = 'none';
        updateContactButton.style.display = 'inline-block';
    };

    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        saveContacts();
    };

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.phone.includes(searchTerm)
        );
        renderContacts(filteredContacts);
    });

    renderContacts(contacts);
});
