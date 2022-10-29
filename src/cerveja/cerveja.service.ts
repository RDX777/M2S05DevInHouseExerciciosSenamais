import { Injectable, ConflictException } from "@nestjs/common";
import { Database } from "src/database/database";
import { Cerveja } from "./cerveja.entity";

@Injectable()
export class CervejaService {
  constructor(private database: Database) { }

  public async criarCerveja(cerveja: Cerveja): Promise<Cerveja> {
    const cevejaExiste = await this.database.findCerveja(cerveja.nome);
    if (cevejaExiste) {
      throw new ConflictException({
        statusCode: 409,
        message: "Já existe uma cerveja com este nome",
      });
    }
    this.database.includeCerveja(cerveja);
    return cerveja;
  }
}
