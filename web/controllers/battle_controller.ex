defmodule Holy.BattleController do
  use Holy.Web, :controller

  def join(conn, %{"user_id" => user_id} = _params) do
    token = Phoenix.Token.sign(Holy.Endpoint, "this is salt", user_id)
    conn
    |> json(%{token: token})
  end
end
