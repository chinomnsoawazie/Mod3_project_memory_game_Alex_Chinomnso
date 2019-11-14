class UsersController < ApplicationController
    before_action :set_user, only: [:show]
    def index
        @users = User.all
        render json: @users
    end
    
    def show
        @user = User.find(params[:id])
        render json: @user
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            render json: @user, status: 201
        else 
            render json: {errors: @user.errors.full_messages}, status: 401
        end 
    end

    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
