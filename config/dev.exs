use Mix.Config

config :holy, Holy.Endpoint,
  http: [port: 4000],
  code_reloader: true,
  check_origin: false,
  watchers: []


config :holy, Holy.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(html|js|css|png|jpeg|jpg|gif|svg)$}
    ]
  ]

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20
