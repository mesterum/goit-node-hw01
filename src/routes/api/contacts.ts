import express, { NextFunction, Request, Response } from 'express'
import validate from 'express-zod-safe';
import { listContacts, getContactById, removeContact, addContact, contactSchema, updateContact } from '../../models/contacts.js' // 
import { z } from 'zod';

const router = express.Router()

router.get('/', async (req, res, next) => {
  listContacts().then((contacts) => {
    res.json(contacts)
  })
})

router.get('/:contactId', validate({ params: { contactId: contactSchema.shape.id } }),
  async (req: Request, res: Response, next: NextFunction) => {
    getContactById(req.params.contactId).then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  })

router.post('/', validate({ body: contactSchema.omit({ id: true }) }),
  async (req, res, next) => {
    addContact(req.body).then((contact) => {
      res.json(contact)
    })
  })

router.delete('/:contactId', validate({ params: { contactId: contactSchema.shape.id } }),
  async (req, res, next) => {
    removeContact(req.params.contactId).then((success) => {
      if (success) {
        res.json({ message: 'Contact deleted' })
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  })

router.put('/:contactId', validate({
  params: { contactId: contactSchema.shape.id },
  body: contactSchema.omit({ id: true }).partial(),
}),
  async (req, res, next) => {
    updateContact(req.params.contactId, req.body).then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).json({ message: 'Contact not found' })
      }
    })
  })

export default router
