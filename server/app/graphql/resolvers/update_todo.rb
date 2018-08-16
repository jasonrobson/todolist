class Resolvers::UpdateTodo < GraphQL::Function
  argument :id, !types.ID
  argument :todo, Inputs::TodoInput

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    return unless todo.present?
    # Todo.update(args[:todo])
    todo.update(name: args[:todo][:name], completed: args[:todo][:completed])
    todo
  end
end
