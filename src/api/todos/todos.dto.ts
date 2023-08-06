import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { IsUserId } from "../../utils/customs.validator";
import { ObjectId } from "mongoose";

export class AddTodosDTO {
  @IsString()
  title: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dueDate?: Date;

  @IsMongoId()
  @IsOptional()
  @Validate(IsUserId)
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
  @Validate(IsUserId)
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
