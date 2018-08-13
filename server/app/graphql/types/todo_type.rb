Types::TodoType = GraphQL::ObjectType.define do
  name 'Todo'

  field :id, !types.ID
  field :name, !types.String
  field :completed, !types.Boolean
end
