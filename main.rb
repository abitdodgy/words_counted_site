require 'sinatra'
require 'sass'
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

helpers do
  def id_from(string)
    string.downcase.gsub(/\s/, '-')
  end

  def class_for_index(i)
    i > 3 ? 'hidden' : nil
  end

  def collapsed?(array)
    array.size > 3
  end
end
