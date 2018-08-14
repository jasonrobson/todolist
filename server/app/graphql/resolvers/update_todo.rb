class Resolvers::UpdateTodo < GraphQL::Function
  argument :id, !types.ID
  argument :todo, Inputs::TodoInput

  type Types::TodoType

  def call(_obj, args, _ctx)
    todo = Todo.find_by(id: args[:id])
    return unless todo.present?
    todo.name = args[:todo][:name] unless args[:todo][:name].length == 0
    todo.completed = args[:todo][:completed]
    todo.save
    todo
  end
end
