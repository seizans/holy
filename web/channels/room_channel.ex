defmodule Holy.RoomChannel do
  use Holy.Web, :channel

  def join("room:" <> room_id, _params, socket) do
    {:ok, socket}
  end
end
