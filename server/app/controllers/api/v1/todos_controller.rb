module Api
	module V1
    class TodosController < ApplicationController

      def index
        todos = Todo.order('created_at DESC');
        render json: todos,status: :ok
      end

      def show
        todo = Todo.find_by(id: params[:id])
        if found?(todo)
          render json: todo, status: :ok
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
        if found?(todo)
          todo.destroy
          render json: todo, status: :ok
        end
      end

      def update
        todo = Todo.find_by(id: params[:id])
        if found?(todo)
          if todo.update_attributes(todo_params)
            render json: todo, status: :ok
          else
            render json: todo.errors, status: :unprocessable_entity
          end
        end
      end

      private

      def found?(todo)
        if todo.blank?
          render json: {
            error: "Todo with id #{params[:id]} not found."
          }, status: :not_found
        end

        todo.present?
      end

      def todo_params
        params.require(:todo).permit(:name, :completed)
      end
		end
	end
end
