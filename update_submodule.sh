#!/bin/bash

# a script to update all the submoduel script
submodules=$(find . -mindepth 2 -name .git | xargs -n 1 dirname)

function current_branch() {
  ref=$(git symbolic-ref HEAD 2> /dev/null) || \
  ref=$(git rev-parse --short HEAD 2> /dev/null) || return
  echo ${ref#refs/heads/}
}

for mod in $submodules
do
    # current version
    echo current version of $mod `(cd $mod && current_branch)`
    echo updating
    case $mod in
        "mjpegcanvas/www/mjpegcanvas")
            (cd $mod && git fetch --all && git checkout stable)
            echo updated version of $mod `(cd $mod && current_branch)`
            ;;
        *)
            (cd $mod && git fetch --all && git checkout devel)
            echo updated version of $mod `(cd $mod && current_branch)`
            ;;
    esac
done

