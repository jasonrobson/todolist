class Resolvers::UpdateTodo < GraphQL::Function
  argument :id, !types.ID
  argument :name, types.String
  argument :completed, types.Boolean

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    return unless todo.present?
    if args[:name].present?
      todo.name = args[:name] unless args[:name].length == 0
    end
    if args[:completed].present?
      todo.completed = args[:completed]
    end
    todo.save
    todo
  end
end
