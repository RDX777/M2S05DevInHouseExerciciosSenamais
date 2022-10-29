import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
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

  public async coletaTodasCervejas(page: number, size: number) {
    const pagina = page || 0;
    const tamanho = size || 10;
    const inicio = pagina * tamanho;
    const fim = inicio + tamanho;

    const listaCervejas = await this.database.getAllCervejas();

    if (listaCervejas.length <= tamanho) {
      return listaCervejas;
    }

    return listaCervejas.slice(inicio, fim);
  }

  public async coletaCerveja(nomeCerveja: string) {
    const cerveja = await this.database.findCerveja(nomeCerveja);
    if (!cerveja) {
      throw new NotFoundException({
        statusCode: 404,
        message: "Cerveja não encontrada",
      });
    }
    return cerveja;
  }
}
