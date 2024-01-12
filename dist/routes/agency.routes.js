var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// eslint-disable-next-line no-unused-vars
const prisma = require('../prisma/database.js');
const { Router } = require('express');
const agencyjson = require('../api/agencydata.json');
const { verify_Token } = require('./jwt.routes.js');
const router = Router();
router.get('/agency', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const staff = yield prisma.staff.findMany();
    return res.status(200).json({ agency: agencyjson, staffs: staff });
}));
router.post('/agency/addstaff', verify_Token, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const form = yield req.body;
    try {
        const newstaff = prisma.staff.create({
            data: {
                name: form.name,
                roles: form.roles,
                profileurl: form.profileurl,
                twitter: form.twitter
            }
        });
        return res.status(201).json({ new_staff: newstaff, message: "Successfully created staff" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while creating staff entity" });
    }
}));
router.get('/agency/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const vtid = req.params.id;
    try {
        const staff = yield prisma.staff.findUnique({ where: { id: parseInt(vtid, 10) } });
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        return res.status(200).json(staff);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while getting staff entity" });
    }
}));
router.delete('/agency/:id', verify_Token, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const vtid = req.params.id;
    const form = yield req.body;
    try {
        yield prisma.staff.delete({ where: { id: parseInt(vtid, 10) } });
        return res.status(204).json({});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while deleting staff entity" });
    }
}));
router.put('/agency/update/:id', verify_Token, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const vtid = req.params.id;
    const form = yield req.body;
    try {
        const staff = prisma.staff.update({
            where: { id: parseInt(vtid, 10) },
            data: {
                name: form.name,
                roles: form.roles,
                profileurl: form.profileurl,
                twitter: form.twitter
            }
        });
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        return res.status(201).json({ update_staff: staff, message: "Successfully updated staff" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while creating staff entity" });
    }
}));
module.exports = router;
