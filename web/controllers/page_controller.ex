defmodule Holy.PageController do
  use Holy.Web, :controller

  plug :require_user when not action in [:signin]

  def index(conn, _params) do
    render conn, "index.html"
  end

  def signin(conn, %{"user" => %{"username" => user_id}} = _params) do
    conn
    |> put_session(:user_id, user_id)
    |> redirect(to: page_path(conn, :index))
  end
  def signin(conn, _params) do
    conn
    |> redirect(to: page_path(conn, :index))
  end

  defp require_user(conn, _params) do
    case get_session(conn, :user_id) do
      nil ->
        conn
        |> render("signin.html")
        |> halt()
      user_id ->
        token = Phoenix.Token.sign(conn, "this is salt", user_id)
        conn
        |> assign(:user_id, user_id)
        |> assign(:token, token)
    end
  end
end
