"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const VTuber_1 = __importDefault(require("../models/VTuber"));
const Social_1 = __importDefault(require("../models/Social"));
const Hashtag_1 = __importDefault(require("../models/Hashtag"));
const Song_1 = __importDefault(require("../models/Song"));
const jwt_routes_1 = __importDefault(require("./jwt.routes"));
const Cover_1 = __importDefault(require("../models/Cover"));
const OriginalSong_1 = __importDefault(require("../models/OriginalSong"));
const vtrouter = (0, express_1.Router)();
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
vtrouter.get('/vtuber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branch, unit, graduated } = req.query;
    const VTFilter = {};
    if (branch) {
        VTFilter.branch = { [sequelize_1.Op.iLike]: `%${branch.toString()}%` };
    }
    if (unit) {
        VTFilter.unit = { [sequelize_1.Op.iLike]: `%${unit.toString()}%` };
    }
    if (graduated !== undefined) {
        VTFilter.graduated = { [sequelize_1.Op.eq]: (graduated === 'true') };
    }
    const vtubers = yield VTuber_1.default.findAll({
        where: VTFilter,
        include: [
            { model: Cover_1.default, attributes: ['id', 'name', 'musicVideo', 'illustration', 'mix'], include: [{
                        model: OriginalSong_1.default, attributes: ['artist', 'album', 'release', 'genre']
                    }] },
            { model: Hashtag_1.default, attributes: ['general', 'stream', 'fanart', 'memes'] },
            { model: Song_1.default, attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics'] },
            { model: Social_1.default, attributes: ['id', 'application', 'socialurl'] }
        ]
    });
    if (vtubers.length === 0) {
        return res.status(204).json();
    }
    return res.json(vtubers);
}));
/* Get 6 randomly vtubers */
vtrouter.get('/vtuber/random-vtubers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vtList = 6;
        const vtubers = yield VTuber_1.default.findAll({
            include: [
                { model: Cover_1.default, attributes: ['id', 'name', 'musicVideo', 'illustration', 'mix'], include: [{
                            model: OriginalSong_1.default, attributes: ['artist', 'album', 'release', 'genre']
                        }] },
                { model: Hashtag_1.default, attributes: ['general', 'stream', 'fanart', 'memes'] },
                { model: Song_1.default, attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics'] },
                { model: Social_1.default, attributes: ['id', 'application', 'socialurl'] }
            ]
        });
        if (vtubers.length < vtList) {
            return res.status(400).json({ error: 'Not enough vtubers available' });
        }
        const randomVT = shuffleArray(vtubers, vtList);
        return res.status(200).json(randomVT);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
}));
vtrouter.get('/vtuber/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vtid = req.params.id;
    const vtuber = yield VTuber_1.default.findOne({
        where: { id: parseInt(vtid, 10) },
        include: [
            { model: Cover_1.default, attributes: ['id', 'name', 'musicVideo', 'illustration', 'mix'], include: [{
                        model: OriginalSong_1.default, attributes: ['artist', 'album', 'release', 'genre']
                    }] },
            { model: Hashtag_1.default, attributes: ['general', 'stream', 'fanart', 'memes'] },
            { model: Song_1.default, attributes: ['id', 'name', 'album', 'releasedate', 'compositor', 'mixing', 'lyrics'] },
            { model: Social_1.default, attributes: ['id', 'application', 'socialurl'] }
        ]
    });
    if (vtuber === null) {
        res.status(404);
        return res.json({ message: 'Error: Vtuber not found' });
    }
    res.status(200);
    return res.json(vtuber);
}));
vtrouter.delete('/vtuber/:id', jwt_routes_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vtid = req.params.id;
    try {
        yield Song_1.default.destroy({ where: { vtid: parseInt(vtid, 10) } });
        yield Social_1.default.destroy({ where: { vtid: parseInt(vtid, 10) } });
        yield Hashtag_1.default.destroy({ where: { vtid: parseInt(vtid, 10) } });
        yield VTuber_1.default.destroy({ where: { id: parseInt(vtid, 10) } });
        return res.status(204).json({ message: 'Successfully deleted VTuber!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to delete VTuber. See the console for more information' });
    }
}));
/* Create a new Vtuber */
vtrouter.post('/vtuber/create', jwt_routes_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cont_songs = 0;
    let social_media = 0;
    const form = yield req.body;
    const newvtuber = yield VTuber_1.default.create({
        fullname: form.fullname, fanname: form.fanname, phrase: form.phrase,
        debut: form.debut, branch: form.branch, unit: form.unit,
        aliases: form.aliases, likes: form.likes, dislikes: form.dislikes,
        emoji: form.emoji, youtube: form.youtube, avatarurl: form.avatarurl,
        graduated: form.graduated || false, gender: form.gender, age: parseInt(form.age, 10),
        birthday: form.birthday, zodiac: form.zodiac, height: parseFloat(form.height)
    });
    yield Hashtag_1.default.create({
        general: form.hashtag.general,
        stream: form.hashtag.stream,
        fanart: form.hashtag.fanart,
        memes: form.hashtag.memes,
        vtid: newvtuber.id
    });
    for (const song of form.songs) {
        yield Song_1.default.create({
            name: song.name, album: song.album,
            releasedate: song.releasedate,
            compositor: song.compositor,
            mixing: song.mixing, lyrics: song.lyrics,
            vtid: newvtuber.id
        });
        cont_songs += 1;
    }
    for (const social of form.social) {
        yield Social_1.default.create({ application: social.application, socialurl: social.socialurl, vtid: newvtuber.id });
        social_media += 1;
    }
    res.status(201);
    return res.json({
        new_vtuber: newvtuber,
        songs: `added ${cont_songs} songs to ${newvtuber.fullname}`,
        social: `added ${social_media} social networks to ${newvtuber.fanname}`,
        message: 'Successfully created vtuber!'
    });
}));
vtrouter.patch('/vtuber/update/:id', jwt_routes_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = yield req.body;
    const vtid = req.params.id;
    try {
        const updatevtuber = yield VTuber_1.default.findByPk(vtid);
        if (!updatevtuber) {
            return res.status(404).json({ message: 'VTuber not found' });
        }
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
        if (form.graduated !== undefined) {
            updatevtuber.graduated = form.graduated;
        }
        updatevtuber.gender = form.gender || updatevtuber.gender;
        updatevtuber.age = parseInt(form.age) || updatevtuber.age;
        updatevtuber.birthday = form.birthday || updatevtuber.birthday;
        updatevtuber.zodiac = form.zodiac || updatevtuber.zodiac;
        updatevtuber.height = parseFloat(form.height) || updatevtuber.height;
        if (form.hashtag) {
            let hashtag = yield Hashtag_1.default.findOne({ where: { vtid: parseInt(vtid) } });
            if (hashtag) {
                hashtag.general = form.hashtag.general || hashtag.general;
                hashtag.stream = form.hashtag.stream || hashtag.stream;
                hashtag.fanart = form.hashtag.fanart || hashtag.fanart;
                hashtag.memes = form.hashtag.memes || hashtag.memes;
            }
            else {
                hashtag = yield Hashtag_1.default.create({
                    general: form.hashtag.general,
                    stream: form.hashtag.stream,
                    fanart: form.hashtag.fanart,
                    memes: form.hashtag.memes,
                    vtid: updatevtuber.id
                });
            }
            yield hashtag.save();
        }
        yield updatevtuber.save();
        const vtafter = updatevtuber;
        if (JSON.stringify(vtbefore) === JSON.stringify(vtafter)) {
            return res.status(200).json({ update_vtuber: updatevtuber, message: 'Successfully updated vtuber!' });
        }
        else {
            return res.status(304).json({ vtuber: updatevtuber, message: 'Nothing to change' });
        }
    }
    catch (error) {
        res.status(500);
        console.log(error);
        return res.json({ message: 'Unable to update vtuber. See the console for more information' });
    }
}));
exports.default = vtrouter;
