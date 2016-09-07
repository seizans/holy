defmodule Holy do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec
    children = [
      supervisor(Holy.Endpoint, []),
    ]
    opts = [strategy: :one_for_one, name: Holy.Supervisor]
    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    Holy.Endpoint.config_change(changed, removed)
    :ok
  end
end
