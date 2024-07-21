import express, { NextFunction, Request, Response } from 'express'
import { listContacts, getContactById, removeContact, addContact } from '../../models/contacts.js' // 

const router = express.Router()

router.get('/', async (req, res, next) => {
  listContacts().then((contacts) => {
    res.json(contacts)
  })
})

router.get('/:contactId', async (req: Request, res: Response, next: NextFunction) => {
  getContactById(req.params.contactId).then((contact) => {
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).json({ message: 'Contact not found' })
    }
  })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router
