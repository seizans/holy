defmodule Holy.UserSocket do
  use Phoenix.Socket

  channel "room:*", Holy.RoomChannel
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(%{"token" => token} = _params, socket) do
    case Phoenix.Token.verify(Holy.Endpoint, "this is salt", token) do
      {:ok, user_id} ->
        {:ok, assign(socket, :user_id, user_id)}
      {:error, _invalid} ->
        IO.inspect _invalid
        :error
    end
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
