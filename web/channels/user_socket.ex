defmodule Holy.UserSocket do
  use Phoenix.Socket

  channel "room:*", Holy.RoomChannel
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"user_id" => "3"} = _params, socket) do
    :error
  end
  def connect(%{"user_id" => user_id} = _params, socket) do
    {:ok, assign(socket, :user_id, user_id)}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Holy.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
