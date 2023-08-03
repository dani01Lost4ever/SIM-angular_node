import { assign } from "lodash";
import { Todo } from "./todos.entity";
import { Todos as TodosModel } from "./todos.model";
import { NotFoundError } from "../../errors/not-found";

export class TodosService {
  async find(userId: string): Promise<Todo[]> {
    return TodosModel.find({
      $or: [{ createdBy: userId }, { assignedTo: userId }],
    }).populate("createdBy");
  }

  //   async getById(id: string, userId: string): Promise<Todo | null> {
  //     return this._getById(id, userId);
  //   }

  //   private async _getById(id: string, userId: string) {
  //     return TodosModel.findOne({ _id: id, user: userId }).populate("todos");
  //   }

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
    return item;
  }

  //   async remove(id: string, userId: string): Promise<void> {
  //     const item = await this._getById(id, userId);
  //     if (!item) {
  //       throw new NotFoundError();
  //     }
  //     await item.deleteOne();
  //   }
}

export default new TodosService();
