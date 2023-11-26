
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const express = require('express');
const prisma = require('../prisma/database.js');
const { verify_Token } = require('./jwt.routes.js');

const vtrouter = express.Router();

/* Get All VTubers */

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array, numb) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = getRandomInt(0, i);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array.slice(0, numb);
}
/**
 * @swagger
 * /api/vtuber:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type: array
 *                 items:
 *                   type: object
*/
vtrouter.get('/vtuber', async (req, res) => {
	const { branch, unit, graduated } = req.query;
	const VTFilter = {}; // Filter to search
	if (branch) {
		VTFilter.branch = { contains: branch.toString() };
	}
	if (unit) {
		VTFilter.unit = { contains: unit.toString() };
	}
	if (graduated !== undefined) {
		VTFilter.graduated = { equals: (graduated.toLowerCase() === 'true') };
	}
	const vtubers = await prisma.vTuber.findMany({
		where: VTFilter,
		orderBy: { debut: 'asc' },
		include: {
			hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
			songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
			social: { select: { id: true, application: true, socialurl: true } }
		}
	});
	if (vtubers.length === 0) {
		return res.status(204).json();
	}
	return res.json(vtubers);
});

/* Get 6 randomly vtubers */

vtrouter.get('/vtuber/random-vtubers', async (req, res) => {
	try {
		const vtList = 6;
		const vtubers = await prisma.vTuber.findMany({
			include: {
				hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
				songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
				social: { select: { id: true, application: true, socialurl: true } }
			}
		});
		if (vtubers.length < vtList) {
			return res.status(400).json({ error: 'Not enough vtubers available' });
		}
		const randomVT = shuffleArray(vtubers, vtList);
		return res.status(200).json(randomVT);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
});

/* Get a random VTuber */

vtrouter.get('/vtuber/random', async (req, res) => {
	const vtuber = await prisma.vTuber.findFirst({
		orderBy: {
			id: 'asc',
		},
		skip: Math.floor(Math.random() * (await prisma.vTuber.count())),
		include: {
			hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
			songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
			social: { select: { id: true, application: true, socialurl: true } }
		}
	});
	return res.status(200).json(vtuber);
});

/* Get and Delete VTuber by id */

vtrouter.get('/vtuber/:id', async (req, res) => {
	const vtid = req.params.id;
	const vtuber = await prisma.vTuber.findUnique({
		where: { id: parseInt(vtid, 10) },
		include: {
			hashtag: { select: { general: true, stream: true, fanart: true, memes: true } },
			songs: { select: { id: true, name: true, album: true, releasedate: true, compositor: true, lyrics: true, mixing: true } },
			social: { select: { id: true, application: true, socialurl: true } }
		}
	});
	if (vtuber === null) {
		res.status(404);
		return res.json({ message: 'Error: Vtuber not found' });
	}
	res.status(200);
	return res.json(vtuber);
});

vtrouter.delete('/vtuber/:id', verify_Token, async (req, res) => {
	const vtid = req.params.id;
	try {
		await prisma.social.deleteMany({ where: { vtid: parseInt(vtid, 10) } });
		await prisma.song.deleteMany({ where: { vtid: parseInt(vtid, 10) } });
		await prisma.hashtag.delete({ where: { vtid: parseInt(vtid, 10) } });
		await prisma.vTuber.delete({ where: { id: parseInt(vtid, 10) } });
		return res.status(204).json({ message: 'Successfully deleted VTuber!' });
	} catch (error) {
		res.status(404);
		return res.json({ message: 'Error: Vtuber not found' });
	}
});

/* Create a new Vtuber */

vtrouter.post('/vtuber/create', verify_Token, async (req, res) => {
	let cont_songs = 0;
	let social_media = 0;
	const form = await req.body;
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
			zodiac: form.zodiac,
			height: parseFloat(form.height)
		}
	});
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
		});
		cont_songs += 1;
	}
	for (const social of form.social) {
		await prisma.social.create({
			data: {
				application: social.application,
				socialurl: social.socialurl,
				vtid: newvtuber.id
			}
		});
		social_media += 1;
	}
	res.status(201);
	return res.json({
		new_vtuber: newvtuber,
		songs: `added ${cont_songs} songs to ${newvtuber.fullname}`,
		social: `added ${social_media} social networks to ${newvtuber.fanname}`,
		message: 'Successfully created vtuber!'
	});
});

/* Update info of a existent VTuber */

vtrouter.put('/vtuber/update/:id', verify_Token, async (req, res) => {
	const form = await req.body;
	const vtid = req.params.id;
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
				zodiac: form.zodiac,
				height: parseFloat(form.height)
			}
		});
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
				});
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
				});
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
				});
			} else {
				await prisma.social.create({
					data: {
						application: social.application,
						socialurl: social.socialurl,
						vtid: updatevtuber.id
					}
				});
			}
		}
		res.status(200);
		return res.json({
			updated_vtuber: updatevtuber,
			songs: updatevtuber.songs,
			social: updatevtuber.social,
			message: 'Successfully updated Vtuber!'
		});
	} catch (error) {
		res.status(404);
		return res.json({ message: 'Error: Vtuber not found' });
	}
});

module.exports = vtrouter;
