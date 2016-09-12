defmodule Holy.RoomWorker do
  use GenServer

  def attack(room_id) do
    case :global.whereis_name("room:#{room_id}") do
      :undefined ->
        {:error, :undefined}
      pid ->
        GenServer.call(:attack, pid)
    end
  end

  def start_link(room_id) do
    GenServer.start_link(__MODULE__, room_id, name: {:global, "room:#{room_id}"})
  end

  def init(_room_id) do
    # TODO(seizans): state をちゃんと持たせる
    state = %{hps: [%{name: "enemy", hp: 100},
                    %{name: "ally1", hp: 20},
                    %{name: "ally2", hp: 15},
                    %{name: "ally3", hp: 30}]}
    {:ok, state}
  end

  def handle_call(:attack, _from, %{hps: hps} = state) do
    {:reply, hps, state}
  end
end
