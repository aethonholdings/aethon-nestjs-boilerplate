import { ExampleGetDTO } from "./example.get.dto";
import { OmitType } from "@nestjs/swagger";

export class ExampleCreateDTO extends OmitType(ExampleGetDTO, ["id"]) {}
