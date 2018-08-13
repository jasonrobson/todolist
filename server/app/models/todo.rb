class Todo < ApplicationRecord
  validates :name, presence: true
  validates :completed, :inclusion => { :in => [false, true]}

  def self.nil_todo
    Todo.new(name: '', completed: false)
  end

end
