import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  isMongoId,
} from "class-validator";
import { isBoolean } from "lodash";

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

export class AssignDTOParam {
  @IsMongoId()
  id: string;
}
export class AssignDTOBody {
  @IsMongoId()
  userId: string;
}

export class ListValidate {
  @IsBoolean()
  @Transform(({ value }) => {
    if (value.toLowerCase() == "true") {
      return true;
    }
    if (value.toLowerCase() == "false") {
      return false;
    }
    return value;
  })
  showCompleted: boolean;
}
