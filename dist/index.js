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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _bot, _commandPattern;
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
// To do add config file
const TOKEN = "1598758468:AAFxiBZ7CiSHpEY68Fd7OglbcqkKk0QmOoE";
const marvinRegex = /(_marvin)|(_m)\s.*/;
class BotService {
    constructor() {
        _bot.set(this, void 0);
        _commandPattern.set(this, void 0);
        // Load token from config
        console.info("Loading telegram bot config");
        __classPrivateFieldSet(this, _bot, new telegraf_1.Telegraf(TOKEN));
        __classPrivateFieldSet(this, _commandPattern, marvinRegex);
        console.info("Registering bot commands");
        this.registerBot();
    }
    launchBot() {
        console.info("Launching bot service");
        __classPrivateFieldGet(this, _bot).launch();
        console.info("Bot service successfully launched");
    }
    registerBot() {
        __classPrivateFieldGet(this, _bot).hears(__classPrivateFieldGet(this, _commandPattern), this.processMessage);
    }
    processMessage(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = context.message;
            console.log(message.text);
        });
    }
}
_bot = new WeakMap(), _commandPattern = new WeakMap();
const service = new BotService();
service.launchBot();
//# sourceMappingURL=index.js.map