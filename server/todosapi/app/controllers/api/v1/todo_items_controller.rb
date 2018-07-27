module Api
	module V1
    class TodoItemsController < ApplicationController
      #listar todos os todos
      def index
        todos = TodoItem.order('created_at DESC');
        render json: {status: 'SUCCESS', message:'Todos carregados', data:todos},status: :ok
      end
		end
	end
end
