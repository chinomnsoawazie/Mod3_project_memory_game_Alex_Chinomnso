class GamesController < ApplicationController
    
    def index
        @games = Game.all
        render json: @games
    end

    def show
        @game = Game.find(params[:id])
        render json: @game
    end

    def create
        @game = Game.create(game_params)
        if @game.valid?
            render json: @game, status: 201
        else 
            render json: {errors: @game.errors.full_messages}, status: 401
        end 
    end
    
    def update
        respond_to do |format|
            if @game.update(game_params)
                format.json {render :show, status: :ok, location: @game}
            else
                format.json {render json: @game.errors, status: :unprocessable_entity}
            end
        end
    end
    
private
    def set_game
        @game = Game.find(params[:id])
    end
    
    def game_params
        params.require(:game).permit(:points, :level, :winstatus, :user_id)
    end
end
