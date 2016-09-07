defmodule Holy.Router do
  use Holy.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Holy do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Holy do
    pipe_through :api

    post "/join", BattleController, :join
  end
end
