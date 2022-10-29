import { readFile, writeFile } from "fs/promises";
import { Injectable, ConflictException } from "@nestjs/common";
import { Cerveja } from "src/cerveja/cerveja.entity";

@Injectable()
export class Database {
  private FILENAME = "./src/database/cervejas.file.json";
  private async readCervejas(): Promise<Cerveja[]> {
    const cervejaTexto = await readFile(this.FILENAME, "utf-8");
    return JSON.parse(cervejaTexto);
  }

  private saveCervejas(cervejas: Array<Cerveja>) {
    const cervejaTexto = JSON.stringify(cervejas);
    writeFile(this.FILENAME, cervejaTexto);
  }

  public async getAllCervejas(): Promise<Cerveja[]> {
    return await this.readCervejas();
  }

  public async includeCerveja(cerveja: Cerveja) {
    const cervejas = await this.readCervejas();
    await this.saveCervejas([...cervejas, cerveja]);
    return cerveja;
  }

  public async findCerveja(nome: string) {
    const cervejas = await this.readCervejas();
    return cervejas.find(
      (cerveja) => cerveja.nome.toLowerCase() === nome.toLowerCase(),
    );
  }

  public async updateCerveja(cervejaNova: Cerveja): Promise<Cerveja> {
    const cervejas = await this.readCervejas();

    const cervejasNovas = cervejas.map((cerveja) => {
      if (cervejaNova.nome.toLowerCase() === cerveja.nome.toLowerCase()) {
        cerveja.nome = cervejaNova.nome || cerveja.nome;
        cerveja.descricao = cervejaNova.descricao || cerveja.descricao;
        cerveja.nomeCervejaria =
          cervejaNova.nomeCervejaria || cerveja.nomeCervejaria;
        cerveja.tipo = cervejaNova.tipo || cerveja.tipo;
      }
      return cerveja;
    });
    if (cervejasNovas) {
      this.saveCervejas(cervejasNovas);
    }
    return cervejaNova;
  }
}
