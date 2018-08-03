class Todo < ApplicationRecord
  validates :name, presence: true
  validates :completed, :inclusion => { :in => [false, true]}
end
