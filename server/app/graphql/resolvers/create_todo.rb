class Resolvers::CreateTodo < GraphQL::Function
  argument :todo, Inputs::TodoInput

  type Types::TodoType

  def call(_obj, args, _ctx)
    # Todo.create!(args[:todo])
    Todo.create!(name: args[:todo][:name], completed: args[:todo][:completed])
  end
end
