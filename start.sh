#!/bin/sh
set -e

/app/backend-server &
backend_pid=$!
npm run dev -- --host 0.0.0.0 --port 3000 &
frontend_pid=$!

trap 'kill "$backend_pid" "$frontend_pid" 2>/dev/null || true' INT TERM
wait "$frontend_pid"
