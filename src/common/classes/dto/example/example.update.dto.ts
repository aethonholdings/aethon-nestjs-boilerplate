import { ExampleGetDTO } from "./example.get.dto";
import { OmitType, PartialType } from "@nestjs/swagger";

export class ExampleUpdateDTO extends PartialType(OmitType(ExampleGetDTO, ["id"])) {}
