class CreateTodoItems < ActiveRecord::Migration[5.2]
  def change
    create_table :todo_items do |t|
      t.boolean :completed
      t.string :content

      t.timestamps
    end
  end
end
