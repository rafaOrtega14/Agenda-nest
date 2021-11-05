"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../database/model/user.schema");
let UserService = class UserService {
    constructor(userModel, httpService) {
        this.userModel = userModel;
        this.httpService = httpService;
    }
    async getCommonContacts() {
        const users = await this.userModel.aggregate([
            {
                $addFields: {
                    agendas: {
                        $map: {
                            input: { $setIntersection: ['$agenda.sphone', '$agenda.phone'] },
                            in: {
                                $arrayElemAt: [
                                    '$agenda',
                                    { $indexOfArray: ['$agenda.phone', '$$this'] },
                                ],
                            },
                        },
                    },
                },
            },
        ]);
        return users[users.length - 1].agendas;
    }
    async getContactFromUser(userId) {
        const user = await this.userModel.findOne({ _id: userId }, { agenda: 1 });
        return user.agenda;
    }
    async saveUser(user) {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
    async createContact(contact, id) {
        const phoneData = await this.phoneInfo(contact.phone);
        contact = Object.assign(Object.assign({}, contact), { type: phoneData.type, internationalCallingCode: phoneData['international-calling-code'], location: phoneData.location, country: phoneData.country, isMobile: phoneData['is-Mobile'], prefix: phoneData['prefix-network'] });
        await this.userModel.updateOne({ _id: id }, { $push: { agenda: contact } });
        return contact;
    }
    async phoneInfo(phone) {
        const url = process.env.NEUTRINOAPI_URL;
        const response = await this.httpService
            .post(url, {
            number: phone,
            'user-id': process.env.NEUTRINOAPI_USER,
            'api-key': process.env.NEUTRINOAPI_KEY,
        })
            .toPromise();
        return response.data;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        common_1.HttpService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map