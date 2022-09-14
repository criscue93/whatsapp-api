import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
  @ApiProperty({
    type: Boolean,
    description: 'ERROR debe ser booleano.',
    default: true,
  })
  error: boolean;

  @ApiProperty({
    type: String,
    description: 'MESSAGE debe ser cadena.',
    default: 'Mensaje del servicio',
  })
  message: string;

  @ApiProperty({
    description: 'RESPONSE puede tomar cualquier valor.',
    default: 'Cualquier valor.',
  })
  response: any;

  @ApiProperty({
    type: Number,
    description: 'STATUS debe ser número entero.',
    default: 422,
  })
  status: number;
}

export class queryDTO {
  @ApiProperty({
    type: String,
    description: 'nombre de la tabla a insertar',
    default: '',
  })
  table: string;

  @ApiProperty({
    description: 'valores a ser insertados',
  })
  values?: any;

  @ApiProperty({
    description: 'valores de la consulta para actualizar',
  })
  set?: any;

  @ApiProperty({
    description: 'json de where y where Value',
  })
  where?: whereDTO;
}

export class querySelectDTO {
  @ApiProperty({
    type: String,
    description: 'nombre de la tabla',
    default: '',
  })
  table: string;

  @ApiProperty({
    type: String,
    description: 'alias de la tabla',
    default: '',
  })
  alias: string;

  @ApiProperty({
    description: 'valores Seleccionados',
  })
  select?: any;

  @ApiProperty({
    description: 'json de where y where Value',
  })
  where: whereDTO;

  @ApiProperty({
    description: 'Order By',
  })
  orderBy?: { key: string; value: 'DESC' | 'ASC' };

  @ApiProperty({
    type: Boolean,
    description: 'ERROR debe ser booleano.',
    default: true,
  })
  oneResult?: boolean;

  @ApiProperty({
    type: Number,
    description: 'limite de la consulta',
    default: 1,
  })
  limit?: number;
}

class whereDTO {
  @ApiProperty({
    description: 'consulta SQL',
  })
  where: string;

  @ApiProperty({
    description: 'valores de la consulta',
  })
  values: any;
}
