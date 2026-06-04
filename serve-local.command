#!/bin/zsh
cd "$(dirname "$0")"
echo "Dive Refresh local preview:"
echo "  http://127.0.0.1:8765/"
echo
python3 -m http.server 8765 --bind 127.0.0.1
