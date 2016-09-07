defmodule Holy.BattleController do
  use Holy.Web, :controller

  def join(conn, %{"user_id" => user_id} = _params) do
    conn
    |> json(%{user_id: user_id})
  end
end
