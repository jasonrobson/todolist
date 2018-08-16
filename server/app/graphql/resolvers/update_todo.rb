class Resolvers::UpdateTodo < GraphQL::Function
  argument :id, !types.ID
  argument :todo, Inputs::TodoInput

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    return unless todo.present?
    todo.update_attributes(args[:todo])
    todo
  end
end
