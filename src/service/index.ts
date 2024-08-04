import ContactSchema, { Contact } from './schemas/contact.js'

export const listContacts = (): Promise<Contact[]> =>
  ContactSchema.find()

export const getContactById = (id: string): Promise<Contact | null> =>
  ContactSchema.findOne({ _id: id })

export const addContact = (contact: Omit<Contact, '_id'>) =>
  ContactSchema.create(contact)

export const updateContact = (id: string, fields: Partial<Contact>) =>
  ContactSchema.findByIdAndUpdate({ _id: id }, fields, { new: true })

export const removeContact = (id: string) =>
  ContactSchema.findByIdAndDelete({ _id: id })

