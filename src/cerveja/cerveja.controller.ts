import {
  Body,
  Query,
  Param,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-response-builder";
import { Cerveja } from "./cerveja.entity";
import { CervejaService } from "./cerveja.service";

@Controller("cervejas")
export class CervejaController {
  constructor(private service: CervejaService) { }

  @Post()
  public async adicionaCerveja(
    @Body() cerveja: Cerveja,
  ): Promise<NestResponse> {
    const cervejaCriada = await this.service.criarCerveja(cerveja);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/cervejas/${cervejaCriada.nome}` })
      .withBody(cervejaCriada)
      .build();
  }

  @Get()
  public async buscaCervejas(
    @Query("page") page: number,
    @Query("size") size: number,
  ) {
    return await this.service.coletaTodasCervejas(page, size);
  }

  @Get(":nomeCerveja")
  public async buscaCerveja(@Param("nomeCerveja") nomeCerveja: string) {
    const cerveja = await this.service.coletaCerveja(nomeCerveja);
    return cerveja;
  }

  @Patch()
  public async editaCerveja(@Body() cerveja: Cerveja) {
    const cervejaeditada = await this.service.editarUmaCerveja(cerveja);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `/cervejas/${cervejaeditada.nome}` })
      .withBody(cervejaeditada)
      .build();
  }
}
