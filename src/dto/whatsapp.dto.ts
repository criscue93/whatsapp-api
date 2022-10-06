import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';

export class whatsappDTO {
  @IsInt({ message: 'El número de destino tienen que ser un número.' })
  @IsDefined({ message: 'El número de destino son obligatorios.' })
  @ApiProperty()
  celular: number;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  @ApiProperty()
  mensaje: string;

  @ApiProperty()
  adjuntos: any[];

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;
}

export class searchDTO {
  @IsInt({ message: 'El número de destino tienen que ser un número.' })
  @IsDefined({ message: 'El número de destino son obligatorios.' })
  @ApiProperty()
  celular: number;
}
