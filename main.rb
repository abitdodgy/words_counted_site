require 'sinatra'
require 'slim'
require 'words_counted'

get '/' do
  slim :index
end

post '/' do
  @counter = WordsCounted.count(params[:text]) unless params[:text].empty?
  slim :index
end

get '/styles.css' do
  scss :styles
end
