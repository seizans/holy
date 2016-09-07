use Mix.Config

config :holy, Holy.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "LfNLpIQnnPnzOoTd5l9KwZ3uVz/Swv6tlzTbmBbxwl0jDJIAf5USz/IZ3LBMG7Oz",
  # TODO(seizans): ちゃんと設定する
  render_errors: [view: Holy.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Holy.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

import_config "#{Mix.env}.exs"
