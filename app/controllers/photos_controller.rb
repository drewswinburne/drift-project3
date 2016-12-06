class PhotosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @photos = Photo.all
    render json: @photos

  end

  def new
  end

  def create
    @photo = Photo.new(photo_params)
    puts @photo.inspect
    if @photo.save
      render json: @photo.to_json, status: :created
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

private
  def photo_params
      params.require(:photo).permit(:photoUrl, :color, :year, :car_id)
    end

end
