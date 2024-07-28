
import { RequestHandler } from 'express'
import { listContacts, getContactById, removeContact, addContact, updateContact } from '../service/index.js'

export const get: RequestHandler = async (req, res, next) => {
  try {
    const results = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const getById: RequestHandler = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await getContactById(contactId)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const create: RequestHandler = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const result = await addContact({ name, email, phone })

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const update: RequestHandler = async (req, res, next) => {
  const { contactId: id } = req.params
  const { name, email, phone } = req.body
  try {
    const result = await updateContact(id, { name, email, phone })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const updateStatusContact: RequestHandler = async (req, res, next) => {
  const { contactId: id } = req.params
  if (!req.body) return res.status(400).json({ message: 'missing field favorite' })
  const { favorite = false } = req.body

  try {
    const result = await updateContact(id, { favorite })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const remove: RequestHandler = async (req, res, next) => {
  const { contactId: id } = req.params

  try {
    const result = await removeContact(id)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

