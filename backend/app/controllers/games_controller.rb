class GamesController < ApplicationController
    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def new
        @game = Game.new
    end

    def edit 
    end

    # POST/games.json
    def create
        @game = Game.new(game_params)
        respond_to do |format|
            if @game.save
                format.html {redirect_to, notice: 'Game was succesfully created'}
                format.json {render :show, status: :created, location: @game}
            else
                format.html {render :new}
                format.json {render json: @game.errors, status: :unprocessable_entity}
            end
        end
    end

    # PATCH/toys/1.json
    def update
        respond_to do |format|
            if @game.update(game_params)
                format.html {redirect_to @game, notice: "Game successfully updated."}
                format.json {render :show, status: :ok, location: @game}
            else
                format.html {render :edit}
                format.json {render json: @game.errors, status: :unprocessable_entity}
            end
        end
    end


    private
    def set_game
        @game = Game.find(params[:id])
    end

    def game_params
        params.require(:game).permit(:points, :level, :winstatus)
    end
end
