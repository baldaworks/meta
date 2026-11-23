# Workspace operations

Run these tasks from the meta root. For the first checkout, see the [README](../../README.md#get-started).

## Sync the workspace

Check for local work before switching revisions. Preserve any edits or detached commits you want to keep.

```sh
task sync:status
task sync
```

`task sync` fast-forwards meta `main` and applies its pins. If it reports unpublished commits, `task sync:status` shows how local and remote main differ. To initialize submodules, retry a failed download, or return to the recorded pins after previewing a change, run

```sh
task sync:pins
```

## Sync a standalone checkout

Fetch updates in the standalone clone and show its current branch status.

```sh
task sync:sibling:fetch PROJECT=knowl
```

To switch the standalone clone to `main` and fast-forward it, run

```sh
task sync:sibling PROJECT=knowl
```

Both commands accept any project in the [workspace project list](../../README.md). They look under `~/Projects` by default. Pass `PROJECTS_DIR=/path/to/projects` for another location.

## Change a shared pin

Start from the published pins. To preview the change to Balda's published `main`, run

```sh
task sync:pin:update PROJECT=balda
```

For a rollback, preview the previous Balda revision in meta's history instead.

```sh
task sync:pin:rollback PROJECT=balda
```

Review the displayed commits. To discard the preview, run `task sync:pins`. To record it and publish the current meta branch, run

```sh
task sync:pin:record PROJECT=balda
task sync:publish
```

Use the same `PROJECT` value throughout for the project you want to pin.
