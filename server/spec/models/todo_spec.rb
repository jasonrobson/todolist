require 'rails_helper'

describe Todo do
  let(:todo) { create(:todo) }

  describe 'validations' do
    subject { todo }
    it { should validate_presence_of(:name) }
    it { expect(todo.completed).to eq(false) }
  end
end
