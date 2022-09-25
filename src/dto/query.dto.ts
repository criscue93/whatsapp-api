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
    description: 'json de inner y condiciones',
  })
  inner?: innerDTO;

  @ApiProperty({
    description: 'json de where y condiciones',
  })
  where?: whereDTO;

  @ApiProperty({
    description: 'json de order y condiciones',
  })
  order?: orderDTO;
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

class orderDTO {
  @ApiProperty({
    description: 'Order By condicion',
    default: '',
  })
  sortField?: any;

  @ApiProperty({
    description: 'Order By tipo de orden',
    default: '',
  })
  sortType?: any;

  @ApiProperty({
    type: Number,
    description: 'Cantidad de datos a generar.',
    default: 5,
  })
  skip?: number;

  @ApiProperty({
    type: Number,
    description: 'limite de la consulta',
    default: 100,
  })
  limit?: number;
}

class innerDTO {
  @ApiProperty({
    type: String,
    description: 'left join a una tabla',
    default: '',
  })
  leftInner1?: string;

  @ApiProperty({
    type: String,
    description: 'alias de la tabla del inner',
    default: '',
  })
  innerAlias1?: string;

  @ApiProperty({
    type: String,
    description: 'condición del inner',
    default: '',
  })
  innerCondicion1?: string;

  @ApiProperty({
    type: String,
    description: 'left join a una tabla',
    default: '',
  })
  leftInner2?: string;

  @ApiProperty({
    type: String,
    description: 'alias de la tabla del inner',
    default: '',
  })
  innerAlias2?: string;

  @ApiProperty({
    type: String,
    description: 'condición del inner',
    default: '',
  })
  innerCondicion2?: string;

  @ApiProperty({
    type: String,
    description: 'left join a una tabla',
    default: '',
  })
  leftInner3?: string;

  @ApiProperty({
    type: String,
    description: 'alias de la tabla del inner',
    default: '',
  })
  innerAlias3?: string;

  @ApiProperty({
    type: String,
    description: 'condición del inner',
    default: '',
  })
  innerCondicion3?: string;
}
