import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  isMongoId,
} from "class-validator";

export class AddTodosDTO {
  @IsString()
  title: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;

  @IsMongoId()
  @IsOptional()
  assignedTo: string;
}

export class SetComplete {
  @IsMongoId()
  id: string;
}
