Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server_error'
  namespace 'api' do
  	namespace 'v1' do
      resources :todos
  	end
  end
end
