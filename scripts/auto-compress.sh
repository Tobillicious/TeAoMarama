#!/bin/bash
# Auto-compress when message count exceeds threshold
MESSAGE_COUNT=$(wc -l < conversation.log 2>/dev/null || echo "0")
if [ "$MESSAGE_COUNT" -gt "50" ]; then
  echo "🗜️ Auto-compressing $(($MESSAGE_COUNT - 50)) messages"
  tail -n 50 conversation.log > conversation.tmp
  mv conversation.tmp conversation.log
fi
