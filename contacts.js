const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts(contactsPath);
  const contact = contacts.filter((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.filter((contact) => contact.id !== contactId);
  // return contact || null;
  if (index === -1) {
    return null;
  }
  const removeEl = books.splice(index, 1);
  await fs.writeFile(booksPath, JSON.stringify(contacts, null, 2));
  return removeEl;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
