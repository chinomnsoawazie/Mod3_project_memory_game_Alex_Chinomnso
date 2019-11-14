class UsersController < ApplicationController
    before_action :set_toy, only: [:show, :edit, :update, :destroy]
    def index
        @users = User.all
        render json: @users
    end
    
    def show
        @user = User.find(params[:id])
        render json: @user
    end

    def new
        @user = User.new
    end

    def edit 
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            render json: @user, status: 201
        else 
            render json: {errors: @user.errors.full_messages}, status: 401
        end 
        # respond_to do |format|
        #     if @user.save
        #         format.html { redirect_to @user, notice: 'User successfully created.'}
        #         format.json {render :show, status: :created, location: @user}
        #     else
        #         format.html {render :new}
        #         format.json {render json: @user.errors, status: :unprocessable_entity}
        #     end
        # end
    end

    


    private
    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
