import { PrismaClient } from "@prisma/client";

const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();



router.get("/", async (req, res, next) => {
    try {
        const districts = await prisma.district.findMany({
            orderBy: { id: "asc" },
        });
        res.json(districts);
    } catch (e: any) {
        next(e.message);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const district = await prisma.district.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json(district);
    } catch (e: any) {
        next(e.message);
    }
});

// get all clubs in a district
router.get("/:id/clubs", async (req, res, next) => {
    try {
        const clubs = await prisma.club.findMany({
            where: { districtId: parseInt(req.params.id) },
        });
        res.json(clubs);
    } catch (e: any) {
        next(e.message);
    }
});

router.post("/", async (req, res, next) => {
    try {
        //if district exists, return error
        let district = await prisma.district.findUnique({
            where: { id: req.body.id },
        });
        if (district) {
            res.status(400).send("District already exists");
            return;
        }
        district = await prisma.district.create({
            data: req.body
        });
        res.json(district);
    } catch (e: any) {
        next(e.message);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const district = await prisma.district.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        res.json(district);
    } catch (e: any) {
        next(e.message);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.district.delete({
            where: {
                id: parseInt(req.params.id)
            },
        });
        res.sendStatus(200);
    } catch (e: any) {
        next(e.message);
    }
});


module.exports = router;