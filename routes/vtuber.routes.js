/* eslint-disable camelcase */
import { Router } from 'express'
import { prisma } from '../prisma/database.js'
import { verify_Token } from './jwt.routes.js'

const router = Router()

/* Get All VTubers */

router.get('/vtuber', async (_req, res) => {
  const vtubers = await prisma.vTuber.findMany()
  return res.json(vtubers)
})

/* Get and Delete VTuber by id */

router.get('/vtuber/:id', async (req, res) => {
  const vtid = req.params.id
  const vtuber = await prisma.vTuber.findUnique({
    where: { id: parseInt(vtid, 10) }
  })
  if (vtuber === null) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
  res.status(200)
  return res.json(vtuber)
})

router.delete('/vtuber/:id', verify_Token, async (req, res) => {
  const vtid = req.params.id
  try {
    await prisma.vTuber.delete({ where: { id: parseInt(vtid, 10) } })
    return res.status(204).json({ message: 'Successfully deleted VTuber!' })
  } catch (error) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
})

/* Create a new Vtuber */

router.post('/vtuber/create', verify_Token, async (req, res) => {
  const form = await req.body
  const newvtuber = await prisma.vTuber.create({
    data: {
      fullname: form.fullname,
      fanname: form.fanname,
      branch: form.branch,
      unit: form.unit,
      graduated: form.graduated || false
    }
  })
  res.status(201)
  return res.json({ new_vtuber: newvtuber, message: 'Successfully created vtuber!' })
})

/* Update info of a existent VTuber */

router.put('/vtuber/update/:id', verify_Token, async (req, res) => {
  const form = await req.body
  const vtid = req.params.id
  try {
    const updatevtuber = await prisma.vTuber.update({
      where: { id: parseInt(vtid, 10) },
      data: {
        fullname: form.fullname,
        fanname: form.fanname,
        branch: form.branch,
        unit: form.unit,
        graduated: form.graduated || false
      }
    })
    res.status(200)
    return res.json({ updated_vtuber: updatevtuber, message: 'Successfully updated Vtuber!' })
  } catch (error) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
})

export default router
