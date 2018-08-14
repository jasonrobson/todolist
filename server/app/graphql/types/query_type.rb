Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.
  field :searchTodo, function: Resolvers::SearchTodo.new
  field :allTodos, function: Resolvers::SearchAllTodo.new
end
