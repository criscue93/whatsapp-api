import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { queryDTO, querySelectDTO, ResponseDTO } from 'src/dto/query.dto';
import { Proyect } from 'src/entitys/proyect.entity';

@Injectable()
export class queryService {
  constructor(
    @Inject('CONNECT_REPOSITORY')
    private victimasRepository: Repository<Proyect>,
  ) {}

  async selectQuery(data: querySelectDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con selectQuery.',
      response: {},
      status: 422,
    };

    let oneResult = true;
    if (data.oneResult !== undefined) {
      oneResult = data.oneResult;
    }

    let select = '*';
    if (data.select) {
      select = data.select;
    }

    let orderByKey = 'id';
    let orderByValue = null;
    if (data.orderBy) {
      orderByKey = data.orderBy.key;
      orderByValue = data.orderBy.value;
    } else {
      orderByValue = 'DESC';
    }

    let where = {
      where: 'True',
      values: {},
    };
    if (data.where) {
      where = data.where;
    }

    // === OPERACION ===
    try {
      const queryReturn = await this.victimasRepository
        .createQueryBuilder()
        .select(select)
        .from(data.table, data.alias)
        .where(where.where, where.values)
        .orderBy(orderByKey, orderByValue)
        .execute();

      if (queryReturn.length > 0) {
        response.error = false;
        response.message = `Se logró obtener un resultado de la tabla ${data.table}.`;
        if (oneResult) {
          response.response = queryReturn[0];
        } else {
          response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
          response.response = queryReturn;
        }
        response.status = 200;
      } else {
        response.message = 'No existen valores.';
      }
    } catch (error) {
      response.message = 'No se logró realizar la Consulta.';
      response.response = {
        errors: { erroSql: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async selectByLimitQuery(data: querySelectDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con selectByLimitQuery.',
      response: {},
      status: 422,
    };

    let oneResult = true;
    if (data.oneResult !== undefined) {
      oneResult = data.oneResult;
    }

    let select = '*';
    if (data.select) {
      select = data.select;
    }

    let limit = 1;
    if (data.limit) {
      limit = data.limit;
    }

    let orderByKey = 'id';
    let orderByValue = null;
    if (data.orderBy) {
      orderByKey = data.orderBy.key;
      orderByValue = data.orderBy.value;
    } else {
      orderByValue = 'DESC';
    }

    let where = {
      where: 'True',
      values: {},
    };
    if (data.where) {
      where = data.where;
    }

    // === OPERACION ===
    try {
      const queryReturn = await this.victimasRepository
        .createQueryBuilder()
        .select(select)
        .from(data.table, data.alias)
        .where(where.where, where.values)
        .orderBy(orderByKey, orderByValue)
        .limit(limit)
        .execute();

      if (queryReturn.length > 0) {
        response.error = false;
        response.message = `Se logró obtener un resultado de la tabla ${data.table}.`;
        if (oneResult) {
          response.response = queryReturn[0];
        } else {
          response.message = `Se logró obtener ${queryReturn.length} resultados de la tabla ${data.table}.`;
          response.response = queryReturn;
        }
        response.status = 200;
      } else {
        response.message = 'No existen valores.';
      }
    } catch (error) {
      response.message = 'No se logró realizar la Consulta.';
      response.response = {
        errors: { erroSql: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async insertQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con insertQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.victimasRepository
        .createQueryBuilder()
        .insert()
        .into(data.table)
        .values(data.values)
        .execute();

      response.error = false;
      response.message = `Se logró registrar en la tabla ${data.table}.`;
      response.response = queryReturn;
      response.status = 200;
    } catch (error) {
      response.message = `No se logró registrar  en la tabla ${data.table}.`;
      response.response = {
        errors: { erroSql: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async updateQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con updateQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.victimasRepository
        .createQueryBuilder()
        .update(data.table)
        .set(data.set)
        .where(data.where.where, data.where.values)
        .execute();

      response.error = false;
      response.message = `Se logró modificar la información de la tabla ${data.table}.`;
      response.response = queryReturn;
      response.status = 200;
    } catch (error) {
      response.message = `No se logró modificar en la tabla ${data.table}.`;
      response.response = {
        errors: { erroSql: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }

  async deleteQuery(data: queryDTO): Promise<ResponseDTO> {
    // === INICIALIZACION DE VARIABLES ===
    const response: ResponseDTO = {
      error: true,
      message: 'Existe problemas con deleteQuery.',
      response: {},
      status: 422,
    };

    // === OPERACION ===
    try {
      const queryReturn = await this.victimasRepository
        .createQueryBuilder()
        .delete()
        .from(data.table)
        .where(data.where.where, data.where.values)
        .execute();

      response.error = false;
      response.message = 'Se logró eliminar el la tabla.';
      response.response = queryReturn;
      response.status = 200;
    } catch (error) {
      response.message = `No se logró eliminar en la tabla ${data.table}.`;
      response.response = {
        errors: { erroSql: [`${error.message}`] },
      };
      response.status = 500;
    }

    // === RESPUESTAS ===
    return response;
  }
}
