import { PrismaClient } from "@prisma/client";

const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();

// get all users
router.get("/", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { id: "asc" },
        });
        res.json(users);
    } catch (e: any) {
        next(e.message);
    }
});

// get user by id
router.get("/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
        });
        res.json(user);
    } catch (e: any) {
        next(e.message);
    }
});

// create user
router.post("/", async (req, res, next) => {
    try {
        //if user exists, return error
        let user = await prisma.user.findUnique({
            where: { id: req.body.id },
        });
        if (user) {
            res.status(400).send("User already exists");
            return;
        }
        user = await prisma.user.create({
            data: req.body,
        });
        res.json(user);
    } catch (e: any) {
        next(e.message);
    }
});

// update user
router.put("/", async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.body.id },
            data: req.body,
        });
        res.json(user);
    } catch (e: any) {
        next(e.message);
    }
});

// delete user
router.delete("/:id", async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where: { id: req.params.id },
        });
        res.sendStatus(200);
    } catch (e: any) {
        next(e.message);
    }
});




module.exports = router;