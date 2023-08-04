import { assign } from "lodash";
import { Todo } from "./todos.entity";
import { Todos as TodosModel } from "./todos.model";
import { NotFoundError } from "../../errors/not-found";

export class TodosService {
  // async find(userId: string): Promise<Todo[]> {
  //   return TodosModel.find({
  //     $or: [{ createdBy: userId }, { assignedTo: userId }],
  //   }).populate("createdBy");
  // }
  async find(userId: string, showCompleted: boolean): Promise<Todo[]>;
  async find(userId: string): Promise<Todo[]>;
  async find(userId: string, showCompleted: boolean = false) {
    const now = new Date();
    const filter: any = {
      $or: [{ createdBy: userId }, { assignedTo: userId }],
    };

    if (!showCompleted) {
      filter.completed = false;
    }

    const list = await TodosModel.find(filter)
      .populate("createdBy assignedTo")
      .sort({ dueDate: 1, createdAt: 1 });
    return list;
  }

  async add(todo: Todo, createdBy: string): Promise<Todo> {
    const newTodo = await TodosModel.create({ ...todo, createdBy: createdBy });
    await newTodo.populate("createdBy assignedTo");
    return newTodo;
  }

  private async _getById(id: string) {
    return TodosModel.findOne({ _id: id }).populate("createdBy assignedTo");
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    assign(item, data);
    await item.save();
    return this._getById(id) as Promise<Todo>;
  }
}

export default new TodosService();
