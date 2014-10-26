require 'sinatra'
require 'sass'
require 'slim'
require 'words_counted'

get '/' do
  slim :index
end

post '/' do
  options = {}

  unless params[:regexp].empty?
    if regexp = Regexp.try_convert(params[:filter])
      options.merge!({ regexp: regexp })
    end
  end

  unless params[:filter].empty?
    if regexp_filter = Regexp.try_convert(params[:filter])
      options.merge!({ exclude: regexp_filter })
    else
      options.merge!({ exclude: params[:filter] })
    end
  end

  @counter = WordsCounted.count(params[:text], options) unless params[:text].empty?
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
