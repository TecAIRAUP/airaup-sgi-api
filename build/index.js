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
const client_1 = require("@prisma/client");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World!");
}));
app.get("/district", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const districts = yield prisma.district.findMany({
            orderBy: { id: "asc" },
        });
        res.json(districts);
    }
    catch (e) {
        next(e.message);
    }
}));
app.get("/district/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const district = yield prisma.district.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        res.json(district);
    }
    catch (e) {
        next(e.message);
    }
}));
// get all clubs in a district
app.get("/district/:id/clubs", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clubs = yield prisma.club.findMany({
            where: { districtId: parseInt(req.params.id) },
        });
        res.json(clubs);
    }
    catch (e) {
        next(e.message);
    }
}));
app.post("/district", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const district = yield prisma.district.create({
            data: req.body
        });
        res.json(district);
    }
    catch (e) {
        next(e.message);
    }
}));
app.put("/district/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const district = yield prisma.district.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        });
        res.json(district);
    }
    catch (e) {
        next(e.message);
    }
}));
app.delete("/district/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const district = yield prisma.district.delete({
            where: {
                id: parseInt(req.params.id)
            },
        });
        res.json(district);
    }
    catch (e) {
        next(e.message);
    }
}));
app.listen(port, () => {
    console.log("Server is running on port ${port}");
});
