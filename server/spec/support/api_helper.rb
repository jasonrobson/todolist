#https://www.thegreatcodeadventure.com/better-rails-5-api-controller-tests-with-rspec-shared-examples/

module ApiHelper
  include Rack::Test::Methods

  def app
    Rails.application
  end
end
