import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { Model } from 'mongoose';
import { IResponse } from './interfaces/IResponse';
import { Whatsapp, WhatsappDocument } from './schemas/whatsapp.schema';
import { searchDTO, whatsappDTO } from './dto/whatsapp.dto';
import * as qrcode from 'qrcode-terminal';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Whatsapp.name, 'whatsapp')
    private smsDocument: Model<WhatsappDocument>,
  ) {}

  private client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
  });

  getPing(): IResponse {
    return {
      error: false,
      message:
        'Bienvenido a WHATSAPP - API, basado ​​en principios REST, devuelve metadatos JSON - Copyright © Ing. Cristian Cueto Vargas',
      response: {
        nameApp: 'WHATSAPP - API',
        version: '0.0.1',
        dateTimeServer: DateTime.now().toISO(),
      },
      status: 200,
    };
  }

  async qrLogin(): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de qrLogin',
      response: {},
      status: 422,
    };

    try {
      this.client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
      });

      this.client.on('ready', () => {
        console.log('Client is ready!');
      });

      this.client.initialize();

      response.error = false;
      response.message = 'Se logró generar el QR del login correctamente';
      response.response = this.client;
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async searchUser(data: searchDTO): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de sendMessage',
      response: {},
      status: 422,
    };

    const number = `${data.celular}@c.us`;
    const answer = this.client.getNumberId(number);
    const respuesta = await answer.then((res) => res);

    if (respuesta === null) {
      response.message = 'El número no tiene cuenta en whatsapp.';
    } else {
      response.error = false;
      response.message = 'El número tiene cuenta de whatsapp.';
      response.status = 200;
    }

    return response;
  }

  async sendMessage(data: whatsappDTO): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existen problemas con el servicio de sendMessage',
      response: {},
      status: 422,
    };

    try {
      const number = `${data.celular}@c.us`;
      const sms = data.mensaje;
      this.client.sendMessage(number, sms);

      if (data.adjuntos.length > 0) {
        let condi = 0;
        while (data.adjuntos[condi] != undefined) {
          const adjunto = new MessageMedia(
            data.adjuntos[condi]['tipo'],
            data.adjuntos[condi]['base64'],
            data.adjuntos[condi]['nombre'],
          );
          this.client.sendMessage(number, adjunto);
          condi++;
        }
      }

      response.error = false;
      response.message = 'Se logró enviar el mensaje correctamente';
      response.response = {};
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }

  async saveLogs(data: any): Promise<IResponse> {
    const response: IResponse = {
      error: true,
      message: 'Existe problemas con el servicio saveLogs.',
      response: {},
      status: 422,
    };

    try {
      const log = new this.smsDocument(data);
      await log.save();

      response.error = false;
      response.message = 'Se registraron los logs correctamente';
      response.response = {};
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return response;
  }
}
