#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  readonly hook_name="$0"
  debug "starting $hook_name..."

  if [ -f ~/.huskyrc ]; then
    debug "~/.huskyrc is present, source it"
    . ~/.huskyrc
  fi

  export readonly husky_skip_init=1
  sh -e "$hook_name" "$@"
  exitCode="$?"
  unset husky_skip_init
  exit "$exitCode"
fi