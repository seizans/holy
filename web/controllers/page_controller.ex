defmodule Holy.PageController do
  use Holy.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
