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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const mongoose = require('mongoose');
const db_1 = require("./db");
const auth_1 = require("./auth");
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: zod_1.z.string().min(3, { message: 'password must be at least 3 characters long' })
});
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const zodData = signupSchema.parse(req.body);
        const username = zodData.username;
        const password = zodData.password;
        yield db_1.userModel.create({
            username,
            password
        });
        res.status(201).json({
            msg: 'Signed up successfully'
        });
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            res.status(400).json({
                msg: ((_a = e.errors[0]) === null || _a === void 0 ? void 0 : _a.message) + ' ' + ((_b = e.errors[1]) === null || _b === void 0 ? void 0 : _b.message)
            });
            console.log(e.errors);
            return;
        }
        res.status(400).json({
            msg: 'Username already exists, Please Log in.'
        });
    }
}));
app.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.userModel.findOne({
        username,
        password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.JWT_SECRET);
        res.json({
            token: token
        });
    }
    else {
        res.status(401).json({
            msg: 'wrong credentials'
        });
    }
}));
app.post('/content', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    yield db_1.contentModel.create({
        link, type, title,
        //@ts-ignore
        userId: req.id,
        tags: []
    });
    res.json({
        msg: 'content added'
    });
}));
app.get('/content', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const content = yield db_1.contentModel.find({
        userId: userId
    }).populate('userId', 'username ');
    res.json({
        content
    });
}));
app.delete('/content', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteMany({
        //@ts-ignore
        userId: req.id,
        _id: contentId
    });
    res.json({
        msg: 'deleted'
    });
}));
app.post('/share', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const linkExists = yield db_1.linkModel.findOne({
        //@ts-ignore
        userId: req.id,
    });
    if (linkExists) {
        const hash = linkExists.hash;
        res.json({
            link: 'share/' + hash
        });
        return;
    }
    if (share === true) {
        let hash = '';
        const random = 'qwertyuiopasdfghjklzxcvbnm1234567890';
        for (let i = 0; i < 10; i++) {
            hash += random[Math.floor(Math.random() * random.length)];
        }
        try {
            yield db_1.linkModel.create({
                hash: hash,
                //@ts-ignore
                userId: req.id
            });
            res.json({
                link: 'share/' + hash
            });
            return;
        }
        catch (e) {
            console.log(e);
        }
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.id,
        });
        res.json({
            msg: 'sharing off'
        });
        return;
    }
}));
app.get('/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(404).json({
            msg: 'link does not exist'
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(process.env.MONGO_URL);
        app.listen(3000);
        console.log(`you're connected now to Port 3000`);
    });
}
main();
