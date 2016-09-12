defmodule Holy.RoomChannel do
  use Holy.Web, :channel

  def join("room:" <> "3", _params, socket) do
    {:error, :this_is_error_reason}
  end
  def join("room:" <> room_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("attack", _params, socket) do
    room_id = "005"
    attack = Holy.RoomWorker.attack(room_id)
    IO.inspect attack
    {:reply, :ok, socket}
  end
end
