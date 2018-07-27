class TodoItem < ApplicationRecord
  validates :name, presence: true
  validates :completed, presence: true
end
