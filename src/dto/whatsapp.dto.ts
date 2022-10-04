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
  numero: number;

  @IsString({ message: 'Subject tiene que ser una cadena.' })
  @IsDefined({ message: 'Subject es obligatorio.' })
  @MinLength(1, {
    message: 'Subject debe contener al menos 1 caracter.',
  })
  @ApiProperty()
  mensaje: string;

  @ApiProperty()
  adjuntos: any[];

  @IsInt({ message: 'El id del funcionario tiene que ser un número' })
  @ApiProperty()
  funcionarioId: number;

  @IsDefined({ message: 'El nombre de la aplicación es obligatorio' })
  @IsString({ message: 'El nombre de la aplicación debe ser una cadena' })
  @ApiProperty()
  aplicacion: string;

  @ApiProperty()
  @IsBoolean()
  guardar: boolean;
}
