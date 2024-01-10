/* eslint-disable no-self-assign */
const express = require('express');
const {Op} = require('sequelize');
const VTuber = require('../models/VTuber');
const Social = require('../models/Social');
const Hashtag = require('../models/Hashtag');
const Song = require('../models/Song');
const { verify_Token } = require('./jwt.routes');

const vtrouter = express.Router();

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

vtrouter.get('/vtuber', async (req, res) => {
	const { branch, unit, graduated } = req.query;
	const VTFilter = {};
	if (branch) { VTFilter.branch = { [Op.iLike]: `%${branch.toString()}%` }; }
	if (unit) { VTFilter.unit = { [Op.iLike]: `%${unit.toString()}%` }; }
	if (graduated !== undefined) { VTFilter.graduated = { [Op.eq]: (graduated.toLowerCase() === 'true') };}
	
	const vtubers = await VTuber.findAll({
		where: VTFilter, orderBy: { id: 'asc' },
		include: [
			{ model: Hashtag, attributes: ['general', 'stream', 'fanart', 'memes']}, 
			{ model: Song,    attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics']},
			{ model: Social,  attributes: ['id', 'application', 'socialurl']}
		]
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
		const vtubers = await VTuber.findAll({
			include: [
				{ model: Hashtag, attributes: ['general', 'stream', 'fanart', 'memes']}, 
				{ model: Song,    attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics']},
				{ model: Social,  attributes: ['id', 'application', 'socialurl']}
			]
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
	const vtuber = await VTuber.findOne({
		orderBy: { id: 'asc', },
		skip: Math.floor(Math.random() * (await VTuber.count())),
		include: [
			{ model: Hashtag, attributes: ['general', 'stream', 'fanart', 'memes']}, 
			{ model: Song,    attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics']},
			{ model: Social,  attributes: ['id', 'application', 'socialurl']}
		]
	});
	return res.status(200).json(vtuber);
});

vtrouter.get('/vtuber/:id', async (req, res) => {
	const vtid = req.params.id;
	const vtuber = await VTuber.findOne({
		where: { id: parseInt(vtid, 10) },
		include: [
			{ model: Hashtag, attributes: ['general', 'stream', 'fanart', 'memes']}, 
			{ model: Song,    attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics']},
			{ model: Social,  attributes: ['id', 'application', 'socialurl']}
		]
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
		await Song.destroy({ where: { vtid: parseInt(vtid, 10)}});
		await Social.destroy({ where: { vtid: parseInt(vtid, 10)} });
		await Hashtag.destroy({ where: { vtid: parseInt(vtid, 10)} });
		await VTuber.destroy({ where: { id: parseInt(vtid, 10) } });
		return res.status(204).json({ message: 'Successfully deleted VTuber!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Unable to delete VTuber. See the console for more information'});
	}
});

/* Create a new Vtuber */

vtrouter.post('/vtuber/create', verify_Token, async (req, res) => {
	let cont_songs = 0;
	let social_media = 0;
	const form = await req.body;
	const newvtuber = await VTuber.create({
		fullname: form.fullname,   fanname: form.fanname,    phrase: form.phrase,
		debut: form.debut,         branch: form.branch,      unit: form.unit,
		aliases: form.aliases,     likes: form.likes,        dislikes: form.dislikes,
		emoji: form.emoji,         youtube: form.youtube,    avatarurl: form.avatarurl,
		graduated: form.graduated || false,  gender: form.gender, age: parseInt(form.age, 10),
		birthday: form.birthday, zodiac: form.zodiac,        height: parseFloat(form.height)
	});
	await Hashtag.create({
		general: form.hashtag.general,
		stream: form.hashtag.stream,
		fanart: form.hashtag.fanart,
		memes: form.hashtag.memes,
		vtid: newvtuber.id
	});
	for (const song of form.songs) {
		await Song.create({
			name: song.name,  album: song.album,
			releasedate: song.releasedate,
			compositor: song.compositor,
			mixing: song.mixing, lyrics: song.lyrics,
			vtid: newvtuber.id
		});
		cont_songs += 1;
	}
	for (const social of form.social) {
		await Social.create({ application: social.application, socialurl: social.socialurl, vtid: newvtuber.id });
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


vtrouter.patch('/vtuber/update/:id', verify_Token, async (req, res) => {
	const form = await req.body;
	const vtid = req.params.id;
	try {
		const updatevtuber = await VTuber.findByPk(vtid);
		if (!updatevtuber) { return res.status(404).json({ message: 'VTuber not found'}); }
		const vtbefore = updatevtuber;
		updatevtuber.fullname = form.fullname || updatevtuber.fullname;
		updatevtuber.fanname = form.fanname || updatevtuber.fanname;
		updatevtuber.phrase = form.phrase || updatevtuber.phrase;
		updatevtuber.aliases = form.aliases || updatevtuber.aliases;
		updatevtuber.likes = form.likes || updatevtuber.likes;
		updatevtuber.dislikes = form.dislikes || updatevtuber.dislikes;
		updatevtuber.debut = form.debut || updatevtuber.debut;
		updatevtuber.branch = form.branch || updatevtuber.branch;
		updatevtuber.unit = form.unit || updatevtuber.unit;
		updatevtuber.emoji = form.emoji || updatevtuber.emoji;
		updatevtuber.youtube = form.youtube || updatevtuber.youtube;
		updatevtuber.avatarurl = form.avatarurl || updatevtuber.avatarurl;
		if (form.graduated !== undefined) { updatevtuber.graduated = form.graduated; }
		updatevtuber.gender = form.gender || updatevtuber.gender;
		updatevtuber.age = parseInt(form.age) || updatevtuber.age;
		updatevtuber.birthday = form.birthday || updatevtuber.birthday;
		updatevtuber.zodiac = form.zodiac || updatevtuber.zodiac;
		updatevtuber.height = parseFloat(form.height) || updatevtuber.height;

		if (form.hashtag) {
			let hashtag = await Hashtag.findOne({ where: { vtid: parseInt(vtid)} });
			if (hashtag) {
				hashtag.general = form.hashtag.general || hashtag.general;
				hashtag.stream = form.hashtag.stream || hashtag.stream;
				hashtag.fanart = form.hashtag.fanart || hashtag.fanart;
				hashtag.memes = form.hashtag.memes || hashtag.memes;
			} else {
				hashtag = await Hashtag.create({
					general: form.hashtag.general,
					stream: form.hashtag.stream,
					fanart: form.hashtag.fanart,
					memes: form.hashtag.memes,
					vtid: updatevtuber.id
				});
			}
			await hashtag.save();
		}
		await updatevtuber.save();
		const vtafter = updatevtuber;
		if (JSON.stringify(vtbefore) === JSON.stringify(vtafter)) {
			return res.status(200).json({ update_vtuber: updatevtuber, message: 'Successfully updated vtuber!' });
		} else {
			return res.status(304).json({ vtuber: updatevtuber, message: 'Nothing to change' });
		}
	} catch (error) {
		res.status(500);
		console.log(error);
		return res.json({ message: 'Unable to update vtuber. See the console for more information' });
	}
});

module.exports = vtrouter;
