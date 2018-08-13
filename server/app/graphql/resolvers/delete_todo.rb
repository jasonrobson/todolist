class Resolvers::DeleteTodo < GraphQL::Function
  argument :id, !types.ID

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    return unless todo.present?
    todo.destroy
  end
end
