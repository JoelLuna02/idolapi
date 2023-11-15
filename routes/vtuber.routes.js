/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const express = require('express')
const prisma = require('../prisma/database.js')
const { verify_Token } = require('./jwt.routes.js')

const vtrouter = express.Router()

/* Get All VTubers */

vtrouter.get('/vtuber', async (_req, res) => {
  const vtubers = await prisma.vTuber.findMany({
    orderBy: { id: 'asc' },
    include: {
      hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
      songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
      social: { select: { id: true, application: true, socialurl: true } }
    }
  })
  return res.json(vtubers)
})

/* Get and Delete VTuber by id */

vtrouter.get('/vtuber/:id', async (req, res) => {
  const vtid = req.params.id
  const vtuber = await prisma.vTuber.findUnique({
    where: { id: parseInt(vtid, 10) },
    include: {
      hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
      songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
      social: { select: { id: true, application: true, socialurl: true } }
    }
  })
  if (vtuber === null) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
  res.status(200)
  return res.json(vtuber)
})

vtrouter.delete('/vtuber/:id', verify_Token, async (req, res) => {
  const vtid = req.params.id
  try {
    await prisma.social.deleteMany({ where: { vtid: parseInt(vtid, 10) } })
    await prisma.song.deleteMany({ where: { vtid: parseInt(vtid, 10) } })
    await prisma.hashtag.delete({ where: { vtid: parseInt(vtid, 10) } })
    await prisma.vTuber.delete({ where: { id: parseInt(vtid, 10) } })
    return res.status(204).json({ message: 'Successfully deleted VTuber!' })
  } catch (error) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
})

/* Create a new Vtuber */

vtrouter.post('/vtuber/create', verify_Token, async (req, res) => {
  let cont_songs = 0
  let social_media = 0
  const form = await req.body
  const newvtuber = await prisma.vTuber.create({
    data: {
      fullname: form.fullname,
      fanname: form.fanname,
      phrase: form.phrase,
      debut: form.debut,
      branch: form.branch,
      unit: form.unit,
      hashtag: {
        create: {
          general: form.hashtag.general,
          stream: form.hashtag.stream,
          fanart: form.hashtag.fanart,
          memes: form.hashtag.memes
        }
      },
      emoji: form.emoji,
      youtube: form.youtube,
      avatarurl: form.avatarurl,
      graduated: form.graduated || false,
      gender: form.gender,
      age: parseInt(form.age, 10),
      birthday: form.birthday,
      zodiac: form.birthday,
      height: parseFloat(form.height)
    }
  })
  for (const song of form.songs) {
    await prisma.song.create({
      data: {
        name: song.name,
        album: song.album,
        releasedate: song.releasedate,
        compositor: song.compositor,
        mixing: song.mixing,
        lyrics: song.lyrics,
        vtid: newvtuber.id
      }
    })
    cont_songs += 1
  }
  for (const social of form.social) {
    await prisma.social.create({
      data: {
        application: social.application,
        socialurl: social.socialurl,
        vtid: newvtuber.id
      }
    })
    social_media += 1
  }
  res.status(201)
  return res.json({
    new_vtuber: newvtuber,
    songs: `added ${cont_songs} songs to ${newvtuber.fullname}`,
    social: `added ${social_media} social networks to ${newvtuber.fanname}`,
    message: 'Successfully created vtuber!'
  })
})

/* Update info of a existent VTuber */

vtrouter.put('/vtuber/update/:id', verify_Token, async (req, res) => {
  const form = await req.body
  const vtid = req.params.id
  try {
    const updatevtuber = await prisma.vTuber.update({
      where: { id: parseInt(vtid, 10) },
      data: {
        fullname: form.fullname,
        fanname: form.fanname,
        phrase: form.phrase,
        debut: form.debut,
        branch: form.branch,
        unit: form.unit,
        hashtag: {
          update: {
            general: form.hashtag.general,
            stream: form.hashtag.stream,
            fanart: form.hashtag.fanart,
            memes: form.hashtag.memes
          }
        },
        emoji: form.emoji,
        youtube: form.youtube,
        avatarurl: form.avatarurl,
        graduated: form.graduated || false,
        gender: form.gender,
        age: parseInt(form.age, 10),
        birthday: form.birthday,
        zodiac: form.birthday,
        height: parseFloat(form.height)
      }
    })
    for (const song of form.songs) {
      if (song.id) {
        await prisma.song.update({
          where: { id: parseInt(song.id, 10) },
          data: {
            name: song.name,
            album: song.album,
            releasedate: song.releasedate,
            compositor: song.compositor,
            mixing: song.mixing,
            lyrics: song.lyrics
          }
        })
      } else {
        await prisma.song.create({
          data: {
            name: song.name,
            album: song.album,
            releasedate: song.releasedate,
            compositor: song.compositor,
            mixing: song.mixing,
            lyrics: song.lyrics,
            vtid: updatevtuber.id
          }
        })
      }
    }
    for (const social of form.social) {
      if (social.id) {
        await prisma.social.update({
          where: { id: parseInt(social.id, 10) },
          data: {
            application: social.application,
            socialurl: social.socialurl,
            vtid: updatevtuber.id
          }
        })
      } else {
        await prisma.social.create({
          data: {
            application: social.application,
            socialurl: social.socialurl,
            vtid: updatevtuber.id
          }
        })
      }
    }
    res.status(200)
    return res.json({
      updated_vtuber: updatevtuber,
      songs: updatevtuber.songs,
      social: updatevtuber.social,
      message: 'Successfully updated Vtuber!'
    })
  } catch (error) {
    res.status(404)
    return res.json({ message: 'Error: Vtuber not found' })
  }
})

module.exports = vtrouter
