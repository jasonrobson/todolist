class Resolvers::SearchTodo < GraphQL::Function
  argument :id, !types.ID

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    todo.nil? ? Todo.nil_todo : todo
  end
end
