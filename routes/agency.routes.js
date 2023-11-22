// eslint-disable-next-line no-unused-vars
const prisma = require('../prisma/database.js')
const { Router } = require('express')
const agencyjson = require('../api/agencydata.json')
const { verify_Token } = require('./jwt.routes.js')

const router = Router()

router.get('/agency', async (req, res) => {
  const staff = await prisma.staff.findMany()
  return res.status(200).json({ agency: agencyjson, staffs: staff})
})

router.post('/agency/addstaff', verify_Token, async (req, res) => {
  const form = await req.body
  try {
    const newstaff = prisma.staff.create({
      data: {
        name: form.name,
        roles: form.roles,
        profileurl: form.profileurl,
        twitter: form.twitter
      }
    })
    return res.status(201).json({ new_staff: newstaff, message: "Successfully created staff" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error while creating staff entity" })
  }
})

router.get('/agency/:id', async (req, res) => {
  const vtid = req.params.id
  try {
    const staff = await prisma.staff.findUnique({ where: { id: parseInt(vtid, 10) }})
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" })
    }
    return res.status(200).json(staff)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error while getting staff entity" })
  }
})

router.delete('/agency/:id', verify_Token, async (req, res) => {
  const vtid = req.params.id
  const form = await req.body
  try {
    await prisma.staff.delete({ where: { id: parseInt(vtid, 10) }})
    return res.status(204).json({})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Error while deleting staff entity" })
  }
})

module.exports = router
