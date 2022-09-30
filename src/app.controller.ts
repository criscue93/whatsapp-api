import { Body, Controller, Get, Post, Res, Version } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { whatsappDTO } from './dto/whatsapp.dto';
import { validate } from 'class-validator';

@ApiTags('INICIO')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Permite verificar si el servicio está funcionando.',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  getPing(@Res() res: Response) {
    const response = this.appService.getPing();

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Get('/login/qr')
  @ApiOperation({
    summary: 'Servicio para el login de whatsapp',
  })
  async loginWhatsapp(@Res() res: Response) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador loginWhatsapp',
      response: {},
      status: 422,
    };

    try {
      response = await this.appService.qrLogin();

      response.error = false;
      response.message = 'Se logró generar el QR del login correctamente';
      response.response = {};
      response.status = 200;
    } catch (error) {
      response.response = error;
      response.status = 500;
    }

    return res.status(response.status).json(response);
  }

  @Version('1')
  @Post('/send')
  @ApiOperation({
    summary: 'Servicio enviar mensajes por correo',
  })
  async sendMessage(@Res() res: Response, @Body() body: whatsappDTO) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador sendMessage',
      response: {},
      status: 422,
    };

    const data = new whatsappDTO();
    data.numero = body.numero;
    data.mensaje = body.mensaje;
    data.funcionarioId = body.funcionarioId;
    data.aplicacion = body.aplicacion;
    data.guardar = body.guardar;

    const valid = await validate(data);
    if (valid.length > 0) {
      const errorArray = valid.map((o) => ({
        [o.property]: Object.values(o.constraints),
      }));

      response.error = true;
      response.message = 'Error de validación';
      response.response = errorArray;
      response.status = 406;
    } else {
      try {
        response = await this.appService.sendMessage(data);

        let estadoEnvio = false;
        if (response.error === false) {
          estadoEnvio = true;

          response.error = false;
          response.message = 'Se logró enviar el sms correctamente';
          response.response = {};
          response.status = 200;
        } else {
          response.error = false;
          response.message = 'No se logró enviar el sms correctamente';
          response.response = response.response['moreInfo'];
          response.status = 422;
        }

        if (data.guardar === true) {
          const logs = {
            origen: {
              numero: process.env.FROM_SEND,
              app_nombre: data.aplicacion,
              funcionario: data.funcionarioId,
            },
            destino: {
              numero: data.numero,
              mensaje: data.mensaje,
              fichero: false,
            },
            enviado: estadoEnvio,
          };

          await this.appService.saveLogs(logs);
        }
      } catch (error) {
        response.response = error;
        response.status = 500;
      }
    }

    return res.status(response.status).json(response);
  }
}
