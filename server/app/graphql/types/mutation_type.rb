Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createTodo, function: Resolvers::CreateTodo.new
  field :updateTodo, function: Resolvers::UpdateTodo.new
  field :deleteTodo, function: Resolvers::DeleteTodo.new
end
