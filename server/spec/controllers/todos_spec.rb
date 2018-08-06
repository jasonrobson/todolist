require 'rails_helper'

describe Api::V1::TodosController do
  let(:todo) { create(:todo) }

  describe '#index' do

    subject { get :index  }

    it 'returns valid JSON' do
      expect(response).to be_successful
    end
  end

  describe '#show' do

    subject { get :show, params: { id: todo.to_param }  }

    it 'returns valid JSON' do
      expect(response).to be_successful
    end
  end

  describe '#create' do

    subject { get :create, params: todo.to_param }

    it 'returns valid JSON' do
      expect(response).to be_successful
    end
  end

  describe '#update' do

    subject { get :update, params: { id: todo.to_param }  }

    it 'returns valid JSON' do
      expect(response).to be_successful
    end
  end

  describe '#destroy' do

    subject { get :destroy, params: { id: todo.to_param } }

    it 'returns valid JSON' do
      expect(response).to be_successful
    end
  end
end
