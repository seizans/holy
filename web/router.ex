defmodule Holy.Router do
  use Holy.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_cookies
  end

  scope "/api", Holy do
    pipe_through :api

    post "/me", AuthController, :me
    post "/signin", AuthController, :signin

    post "/create", BattleController, :create
    post "/join", BattleController, :join
  end
end
