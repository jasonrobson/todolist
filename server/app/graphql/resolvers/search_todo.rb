class Resolvers::SearchTodo < GraphQL::Function
  argument :id, !types.ID

  type Types::TodoType

  def call(_obj, args, _ctx)
    Todo.find_by(id: args[:id])
  end
end
