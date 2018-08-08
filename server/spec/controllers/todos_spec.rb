require 'rails_helper'

describe Api::V1::TodosController do
  let(:todo) { create(:todo) }

  describe "GET 'index' " do
    it "returns a successful 200 response" do
        get :index, format: :json
      expect(response).to be_success
    end

    it "returns all the todos" do
      FactoryGirl.create_list(:todo, 5)
      get :index, format: :json
      parsed_response = JSON.parse(response.body)
      expect(parsed_response.length).to eq(5)
    end
  end

  describe "GET 'show' " do
    it "returns a successful 200 response" do
      get :show, format: :json, params: { id: todo.id }
      expect(response).to be_success
    end

    it "returns an existing todo" do
      get :show, format: :json, params: { id: todo.id }
      parsed_response = JSON.parse(response.body).to_json
      expect(parsed_response).to eq(todo.to_json)
    end

    it "returns an non existing todo" do
      get :show, format: :json, params: { id: '-1' }
      expect(response.status).to eq(404)
    end
  end

  describe '#create' do
    it 'returns status 200' do
      post :create, params: {todo:{name:"The Dictator", completed:false}}
      expect(response).to be_successful
    end
    it 'returns valid JSON' do
      newtodo = {todo:{name:"The Dictator", completed:true}}
      post :create, params: newtodo
      expect(response).to be_successful
      expect(response.body).to_not eq(nil)
    end
    it 'returns invalid JSON' do
      newtodo = {todo:{ completed:true}}
      post :create, params: newtodo
      expect(response).to_not be_successful
      expect(response.body).to_not eq(nil)
    end
  end

  describe '#update' do
    it 'returns valid JSON' do
      newTodo = create(:todo)
      put :update, params: {todo:{name:"The Dictator", completed:true}, id: 1}
      parsed_response = JSON.parse(response.body)
      expect(response).to be_successful
    end
    it 'tries to update a non existing todo' do
      put :update, params: {todo:{name:"The Dictator", completed:true}, id: 1}
      parsed_response = JSON.parse(response.body)
      expect(response).to_not be_successful
      expect(response.status).to eq(404)
    end
  end

  describe '#destroy' do
    it 'deletes an existing todo' do
      delete :destroy, params: { id: todo.to_param }
      expect(Todo.all.length).to eq(0)
    end
    it 'tries to delete a non existing todo' do
      delete :destroy, params: { id: '-1' }
      expect(response).to_not be_successful
      expect(response.status).to eq(404)
    end
  end
end
