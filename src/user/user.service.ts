import { HttpService, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AgendaDoc, PhoneRawData, UserDoc } from './user.interface';
import { UserDocument, User } from '../database/model/user.schema';
import { CreateContactDto, CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
  ) {}

  async getCommonContacts(): Promise<AgendaDoc[]> {
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

  async getContactFromUser(userId: string): Promise<AgendaDoc[]> {
    const user = await this.userModel.findOne({ _id: userId }, { agenda: 1 });
    return user.agenda;
  }

  async saveUser(user: CreateUserDto): Promise<UserDoc> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async createContact(
    contact: CreateContactDto,
    id: string,
  ): Promise<AgendaDoc> {
    const phoneData = await this.phoneInfo(contact.phone);
    contact = {
      ...contact,
      type: phoneData.type,
      internationalCallingCode: phoneData['international-calling-code'],
      location: phoneData.location,
      country: phoneData.country,
      isMobile: phoneData['is-Mobile'],
      prefix: phoneData['prefix-network'],
    };
    await this.userModel.updateOne({ _id: id }, { $push: { agenda: contact } });
    return contact;
  }
  private async phoneInfo(phone: string): Promise<PhoneRawData> {
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
}
