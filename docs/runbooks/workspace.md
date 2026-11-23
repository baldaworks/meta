# Workspace operations

For the first checkout, follow the [README](../../README.md#get-started). Run the commands below from the meta root.

## Sync the workspace

Before switching revisions, check for local work in the meta repository and its submodules.

```sh
git status --short --branch
git submodule foreach --recursive 'git status --short --branch'
```

Commit or stash edits in the checkout that owns them. If a detached submodule has commits you want to keep, create a branch there first.

Run `task sync` to switch meta to `main`, fast-forward it, and apply its pins. To apply the pins already recorded in your checkout, run `task sync:pins`.

- **Unpublished meta commits:** inspect `git log --oneline --left-right main...FETCH_HEAD` and reconcile the commits before retrying.
- **Submodule download failed:** check access to the URL in `.gitmodules`, then retry `task sync:pins`.
- **Unexpected checkout:** run `git submodule status --recursive`. A leading space means the pin matches, `-` means uninitialized, `+` means a different commit, and `U` means a merge conflict.

## Sync a standalone checkout

Use the [sibling tasks](../../README.md#sync-commands) for clones under `~/Projects`. Save local edits before `sibling:sync` switches branches. If the local and remote branches have diverged, inspect their history in the standalone checkout before retrying. Changes enter the shared workspace when you publish a new pin.

## Update a project pin

Start from a clean, initialized workspace. After the project change lands on its published `main`, fetch and review the revision to pin. Use `project=balda` or `project=knowl`.

```sh
project=balda
git -C "projects/$project" fetch origin main &&
  git -C "projects/$project" switch --detach FETCH_HEAD &&
  git diff --submodule=log -- "projects/$project"
```

After verifying the revision, record it in meta and publish the commit.

```sh
git add -- "projects/$project"
git diff --cached --submodule=log
git commit -m "chore: update $project pin"
```

To roll back a published pin, run `git revert <pin-update-commit>` in meta, apply the restored pins with `task sync:pins`, and publish the revert.
