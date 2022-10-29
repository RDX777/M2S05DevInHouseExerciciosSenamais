import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum TipoCerveja {
  LARGER,
  PILSEN,
  WIZEN,
  IPA,
}

export class Cerveja {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  nomeCervejaria: string;

  @IsNotEmpty()
  @IsEnum(TipoCerveja)
  tipo: TipoCerveja;
}
