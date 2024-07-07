import path from 'node:path';
import fs from 'node:fs/promises';
import { nanoid } from 'nanoid';
// import contactsPath from './db/contacts.json' assert { type: 'json' };
const contactsPath = path.resolve('db', 'contacts.json');
export async function listContacts() {
    const contactsFile = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contactsFile);
}
export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
}
export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        throw new Error(`Contact with id ${contactId} not found`);
    }
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}
