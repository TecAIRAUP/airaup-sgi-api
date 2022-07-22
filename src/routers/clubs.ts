import { PrismaClient } from "@prisma/client";

const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();

// get all clubs
router.get("/", async (req, res, next) => {
    try {
        const clubs = await prisma.club.findMany({
            orderBy: { id: "asc" },
        });
        res.json(clubs);
    } catch (e: any) {
        next(e.message);
    }
});

// get club by id
router.get("/:id", async (req, res, next) => {
    try {
        const club = await prisma.club.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json(club);
    } catch (e: any) {
        next(e.message);
    }
});

// create club
router.post("/", async (req, res, next) => {
    try {
        //if club exists, return error
        let club = await prisma.club.findUnique({
            where: { id: req.body.id },
        });
        if (club) {
            res.status(400).send("Club already exists");
            return;
        }
        club = await prisma.club.create({
            data: req.body,
        });
        res.json(club);
    } catch (e: any) {
        next(e.message);
    }
});

// get club by name
router.get("/", async (req, res, next) => {
    try {
        const club = await prisma.club.findMany({
            where: { name: req.body.name },
        });
        res.json(club);
    } catch (e: any) {
        next(e.message);
    }
});


module.exports = router;