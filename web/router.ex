defmodule Holy.Router do
  use Holy.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Holy do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    post "/signin", PageController, :signin
  end

  scope "/api", Holy do
    pipe_through :api

    post "/create", BattleController, :create
    post "/join", BattleController, :join
  end
end
