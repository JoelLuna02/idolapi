var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Cover = require('../models/Cover');
const VTuber = require('../models/VTuber');
const { Router } = require('express');
const OriginalSong = require('../models/OriginalSong');
const { verify_Token } = require('./jwt.routes');
const cover_routes = Router();
cover_routes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const covers = yield Cover.findAll({
        attributes: ['id', 'vtid', 'name', 'musicVideo', 'illustration', 'mix'],
        include: { model: OriginalSong, attributes: ['artist', 'album', 'release', 'genre'] }
    });
    if (covers.length === 0) {
        return res.status(204).json();
    }
    return res.status(200).json(covers);
}));
cover_routes.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cover_id = parseInt(req.params.id);
    const cover = yield Cover.findByPk(cover_id);
    if (!cover)
        return res.status(404).json({ message: 'Cover not found' });
    return res.status(200).json(cover);
}));
cover_routes.post('/add/:vtid', verify_Token, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const vtid = parseInt(req.params.vtid);
    const form = req.body;
    try {
        const vtuber = yield VTuber.findByPk(vtid);
        if (!vtuber)
            return res.status(404).json({ message: 'VTuber not found' });
        const newcover = yield Cover.create({
            name: form.name, musicVideo: form.musicVideo,
            illustration: form.illustration, mix: form.mix,
            vtid: vtid
        });
        yield OriginalSong.create({
            artist: form.originalSong.artist, album: form.originalSong.album,
            release: form.originalSong.release, genre: form.originalSong.genre,
            cover_id: newcover.id
        });
        return res.status(201).json({ newCover: newcover, message: `Successfully added 1 cover to the VTuber ${vtid}` });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to add cover. See the console for more information' });
    }
}));
cover_routes.delete('/:coverid', verify_Token, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const cover_id = parseInt(req.params.coverid);
    try {
        const cover = yield Cover.findByPk(cover_id);
        yield OriginalSong.destroy({ where: { cover_id: cover.id } });
        yield cover.destroy();
        return res.status(204).json();
    }
    catch (error) {
        console.error(error);
        console.error(error);
        return res.status(500).json({ message: 'Unable to delete cover. See the console for more information' });
    }
}));
module.exports = cover_routes;
