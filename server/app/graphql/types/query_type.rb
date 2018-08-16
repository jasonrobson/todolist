Types::QueryType = GraphQL::ObjectType.define do
  name "Query"

  field :searchTodo, function: Resolvers::SearchTodo.new
  field :allTodos, function: Resolvers::SearchAllTodo.new
end
