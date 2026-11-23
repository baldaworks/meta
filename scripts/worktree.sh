#!/bin/sh
set -eu

fail() {
    echo "$*" >&2
    exit 1
}

projects=$(cd "$WT_PROJECTS_DIR" && pwd -P)
repo="$projects/$WT_PROJECT"
test -e "$repo/.git" || fail "Standalone clone missing at $repo"
if [ "$1" = list ]; then
    exec git -C "$repo" worktree list
fi

case "$WT_WORK" in
    ''|[!a-zA-Z0-9]*|*[!a-zA-Z0-9._-]*) fail "WORK must be a single name starting with a letter or digit." ;;
esac
tree="$projects/.worktrees/$WT_WORK/$WT_PROJECT"

case "$1" in
    add)
        case "$WT_BASE" in
            main)
                git -C "$repo" fetch origin refs/heads/main
                revision=$(git -C "$repo" rev-parse FETCH_HEAD)
                ;;
            pin)
                revision=$(git rev-parse "HEAD:projects/$WT_PROJECT")
                if ! git -C "$repo" cat-file -e "$revision^{commit}" 2>/dev/null; then
                    git -C "$repo" fetch origin "$revision"
                fi
                ;;
            *) fail "BASE must be main or pin." ;;
        esac
        exec git -C "$repo" worktree add -b "feature/$WT_WORK" "$tree" "$revision"
        ;;
    remove)
        exec git -C "$repo" worktree remove "$tree"
        ;;
    run)
        test -f "$tree/.git" || fail "Missing worktree at $tree"
        owner=$(git -C "$repo" rev-parse --path-format=absolute --git-common-dir)
        actual=$(git -C "$tree" rev-parse --path-format=absolute --git-common-dir)
        test "$actual" = "$owner" || fail "$tree belongs to another repository"
        cd "$tree"
        for file in Taskfile.yml Taskfile.yaml taskfile.yml taskfile.yaml Taskfile.dist.yml Taskfile.dist.yaml taskfile.dist.yml taskfile.dist.yaml; do
            if [ -f "$file" ]; then
                printf 'Running %s in %s\n' "$WT_TARGET" "$PWD"
                case "$WT_TARGET" in ''|-*) fail "TARGET must be a project task name." ;; esac
                exec task --taskfile "./$file" "$WT_TARGET"
            fi
        done
        fail "No project Taskfile at $tree"
        ;;
    *) fail "Unknown worktree operation: $1" ;;
esac
