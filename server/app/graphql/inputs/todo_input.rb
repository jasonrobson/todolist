Inputs::TodoInput = GraphQL::InputObjectType.define do
  name 'TodoInput'
  description 'Todo attributes'

  argument :name, !types.String
  argument :completed, !types.Boolean
end
