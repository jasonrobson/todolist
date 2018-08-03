module Api
	module V1
    class TodosController < ApplicationController
      def index
        todos = Todo.order('created_at DESC');
        render json: todos,status: :ok
      end
      def show
        todo = Todo.find(params[:id])
        render json: todo,status: :ok
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
        todo = Todo.find(params[:id])
        todo.destroy
        render json: todo, status: :ok
      rescue e
        debugger
        render :nothing, status: :unprocessable_entity
      end
      def update
        todo = Todo.find(params[:id])
        if todo.update_attributes(todo_params)
          render json: todo, status: :ok
        else
          render json: todo.errors, status: :unprocessable_entity
        end
      end
      private
      def todo_params
        params.require(:todo).permit(:name, :completed)
      end
		end
	end
end
