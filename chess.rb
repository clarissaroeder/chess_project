require "sinatra"
require "sinatra/reloader" if development?
require "sinatra/content_for"
require "tilt/erubis"

configure do
  enable :sessions
  set :session_secret, SecureRandom.hex(32)
  # set :erb, :escape_html => true
end

get "/" do
  erb :index
end

get "/game" do
  erb :game
end
