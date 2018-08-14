class Resolvers::SearchAllTodo < GraphQL::Function
  type !types[Types::TodoType]

  def call(_obj, _args, _ctx)
    Todo.all
  end
end
