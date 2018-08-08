class ErrorsController < ApplicationController
  def internal_server_error
    render json: {
      status: 500,
      error: :internal_server_error,
      message: 'Houston we have a problem'
    }, status: 500
  end
end
