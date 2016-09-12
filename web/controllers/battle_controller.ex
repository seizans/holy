defmodule Holy.BattleController do
  use Holy.Web, :controller

  @todo """
  Supervisor.start_child の返り値は以下で、room_id が dup な場合をケアする
  on_start_child ::
  {:ok, child} |
  {:ok, child, info :: term} |
  {:error, {:already_started, child} | :already_present | term}
  """
  def create(conn, _params) do
    # TODO(seizans): room_id の生成を精査する
    room_id = "005"
    case Supervisor.start_child(Holy.RoomSupervisor, [room_id]) do
      {:ok, pid} ->
        IO.inspect(pid)
        # TODO(seizans): create と join はセットなのでそうする
        conn
        |> put_status(201)
        |> json(%{room_id: room_id})
      {:error, {:already_started, pid}} ->
        conn
        |> put_status(400)
        |> json(%{error: "Room already present"})
    end
  end

  def join(conn, %{"user_id" => user_id} = _params) do
    room_id = "005"
    token = Phoenix.Token.sign(Holy.Endpoint, "this is salt", user_id)
    conn
    |> json(%{token: token})
  end
end
