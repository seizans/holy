defmodule Holy.AuthController do
  use Holy.Web, :controller

  @token_salt "this is salt"

  defp auth(conn) do
    # TODO(seizans): Authorized Header にも対応する
    case conn.req_cookies["token"] do
      nil ->
        {:error, :no_cookie}
      token ->
        case Phoenix.Token.verify(conn, @token_salt, token) do
          {:ok, user_id} ->
            {:ok, user_id}
          {:error, invalid} ->
            {:error, invalid}
        end
    end
  end

  def me(conn, _params) do
    case auth(conn) do
      {:ok, user_id} ->
        conn
        |> json(%{user_id: user_id})
      {:error, _reason} ->
        conn
        |> put_status(401)
        |> json(%{error: "Not authenticated"})
    end
  end

  def signin(conn, %{"user_id" => user_id} = _params) do
    # TODO(seizans): 本来はここに認証ロジックが入る
    token = Phoenix.Token.sign(conn, @token_salt, user_id)
    conn
    |> put_resp_cookie("token", token)
    |> put_status(204)
    |> json(%{})
  end
  def signin(conn, _params) do
    IO.inspect _params
    conn
    |> json(%{error: "Authentication failed"})
  end
end
