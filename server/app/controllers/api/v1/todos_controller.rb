module Api
	module V1
    class TodosController < ApplicationController
      def index
        todos = Todo.order('created_at DESC');
        render json: todos,status: :ok
      end
      def show
        todo = Todo.find_by(id: params[:id])
        if todo.present?
          render json: todo, status: :ok
        else
          render json: {
            error: 'Todo with id #{params[:id]} not found.'
          }, status: :not_found
        end
      end
      def create
        todo = Todo.new(todo_params)
        if todo.save
          render json: todo, status: :ok
        else
          render json: todo.errors, status: :unprocessable_entity
        end
      end
      def destroy
        todo = Todo.find_by(id: params[:id])
        if todo.present?
          todo.destroy
          render json: todo, status: :ok
        else
          render json: {
            error: 'Todo with id #{params[:id]} not found.'
          }, status: :not_found
        end
      end
      def update
        todo = Todo.find_by(id: params[:id])
        if todo.present?
          if todo.update_attributes(todo_params)
            render json: todo, status: :ok
          else
            render json: todo.errors, status: :unprocessable_entity
          end
        else
          render json: {
            error: 'Todo with id #{params[:id]} not found.'
          }, status: :not_found
        end
      end
      private
      def todo_params
        params.require(:todo).permit(:name, :completed)
      end
		end
	end
end
