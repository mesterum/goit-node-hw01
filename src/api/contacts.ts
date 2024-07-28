import express/* , { NextFunction, Request, Response } */ from 'express'
import validate from 'express-zod-safe';
import { contactSchema } from '../models/contacts.js' // 
// import { listContacts, getContactById, removeContact, addContact, updateContact } from '../service/index.js'
// import { Contact } from '../service/schemas/contacts.js';
import { get, getById, create, update, updateStatusContact, remove } from '../controller/index.js'
import { z } from 'zod';

const router = express.Router()

router.get('/', get/* async (req, res, next) => {
  listContacts().then((contacts: Contact[]) => {
    res.json(contacts)
  })
} */)

router.get('/:contactId', validate({ params: { contactId: contactSchema.shape.id } }), getById
  /* async (req: Request, res: Response, next: NextFunction) => {
    getContactById(req.params.contactId).then((contact: Contact | null) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  } */)

router.post('/', validate({ body: contactSchema.omit({ id: true }) }), create
  /* async (req, res, next) => {
    addContact(req.body).then((contact: Contact) => {
      res.json(contact)
    })
  } */)

router.delete('/:contactId', validate({ params: { contactId: contactSchema.shape.id } }), remove
  /* async (req, res, next) => {
    removeContact(req.params.contactId).then((success: Contact | null) => {
      if (success) {
        res.json({ message: 'Contact deleted' })
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  } */)

router.patch('/:contactId', validate({
  params: { contactId: contactSchema.shape.id },
  body: contactSchema.omit({ id: true }).partial(),
}), update
  /* async (req, res, next) => {
    updateContact(req.params.contactId, req.body).then((contact: Contact | null) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  } */)

router.patch('/:contactId/favorite', validate({
  params: { contactId: contactSchema.shape.id },
  body: { favorite: z.boolean().optional() },
}), updateStatusContact)

export default router
