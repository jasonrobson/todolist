module Api
	module V1
    class TodoItemsController < ApplicationController
      #listar todos os todos
      def index
        todos = TodoItem.order('created_at DESC');
        render json: {status: 'SUCCESS', message:'Todos carregados', data:todos},status: :ok
      end
      def show
        todo = TodoItem.find(params[:id])
        render json: {status: 'SUCCESS', message:'Todo carregado', data:todo},status: :ok
      end
      def create
        todo = TodoItem.new(todo_params)
        if todo.save
          render json: {status: 'SUCCESS', message: 'Todo criado', data: todo}, status: :ok
        else
          render json: {status: 'ERROR', message: 'Todo nao salvo', data: todo.errors}, status: :unprocessable_entity
        end
      end
      def destroy
        todo = TodoItem.find(params[:id])
        todo.destroy
        render json: {status: 'SUCCESS', message: 'Todo deletado', data:todo}, status: :ok
      end
      def update
        todo = TodoItem.find(params[:id])
        if todo.update_attributes(todo_params)
          render json: {status: 'SUCCESS', message: 'Todo atualizado', data:todo}, status: :ok
        else
          render json: {status: 'ERROR', message: 'Todo nao atualizado', data:todo.errors}, status: :unprocessable_entity
        end
      end
      private
      def todo_params
        params.require(:todo_item).permit(:name, :completed)
      end
		end
	end
end
