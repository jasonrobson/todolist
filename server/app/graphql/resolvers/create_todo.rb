class Resolvers::CreateTodo < GraphQL::Function
  argument :todo, Inputs::TodoInput

  type Types::TodoType

  def call(_obj, args, _ctx)
    Todo.create!(args[:todo])
  end
end
