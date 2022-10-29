import fs from "fs";
import { Cerveja } from "src/cerveja/cerveja.entity";

export class Database {
  private FILENAME = "./cervejas.file.json";
  private readCervejas(): Array<Cerveja> {
    const cervejaTexto = fs.readFileSync(this.FILENAME).toString();
    return JSON.parse(cervejaTexto);
  }

  private saveCervejas(cervejas: Array<Cerveja>) {
    const cervejaTexto = JSON.stringify(cervejas);
    fs.writeFileSync(this.FILENAME, cervejaTexto);
  }

  public getAllCervejas(): Array<Cerveja> {
    return this.readCervejas();
  }

  public includeCerveja(cerveja: Cerveja) {
    const cervejas = this.readCervejas();
    this.saveCervejas([...cervejas, cerveja]);
  }

  public findCerveja(nome: string): Array<Cerveja> {
    const cervejas = this.readCervejas();
    return cervejas.filter((cerveja) =>
      cerveja.nome.toLowerCase().includes(nome.toLowerCase()),
    );
  }

  public updateCerveja(cervejaNova: Cerveja) {
    const cervejas = this.readCervejas();

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
  }
}
