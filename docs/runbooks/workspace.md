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

## Work on a project branch

Keep the meta checkout at its recorded pins. Create feature worktrees from the standalone clone at `~/Projects/<project>`. Pass `PROJECTS_DIR` on each command if your clones live elsewhere.

```sh
task worktree:add PROJECT=balda WORK=chat-fix
task worktree:list PROJECT=balda
task worktree:run PROJECT=balda WORK=chat-fix TARGET=arch-lint
task worktree:beads PROJECT=balda WORK=chat-fix -- ready --json
task worktree:git PROJECT=balda WORK=chat-fix -- status --short --branch
```

The first command fetches the project's published `main` and creates branch `feature/chat-fix` at `~/Projects/.worktrees/chat-fix/balda`. Use a distinct work name for each feature. To reproduce the exact Balda revision in the current meta commit, create a separate worktree with `BASE=pin`.

```sh
task worktree:add PROJECT=balda WORK=reproduce-chat BASE=pin
```

For a change spanning projects, reuse the work name across those projects. Each project gets its own branch and pull request. Run checks against each worktree and point any integration test at those checkouts.

```sh
task worktree:add PROJECT=knowl WORK=chat-fix
task worktree:run PROJECT=knowl WORK=chat-fix TARGET=wiki:validate
```

`worktree:run` uses the Taskfile in the selected worktree. Root commands such as `task balda:arch-lint` still use the pinned checkout. For projects without a Taskfile, add, list and remove are available.

After merging the project branches, [update their shared pins](#change-a-shared-pin). Remove each clean worktree when finished. Removal keeps the local branch and stops if the worktree has pending changes.

```sh
task worktree:remove PROJECT=balda WORK=chat-fix
task worktree:remove PROJECT=knowl WORK=chat-fix
```

## Install agent skills

Run `task apm:install` to install the locked skills in the project. Run `task apm:install GLOBAL=true` to install the packages declared in `apm.yml` for the current Codex user. Both commands require the APM CLI. After changing `apm.yml`, run `task apm:lock` and commit both the manifest and lockfile.

[Stitch skills guide](https://stitch.google.com/docs/skills/get-started/)


## Balda Backoffice UI

Install the workspace skills with `task apm:install` and use `balda-backoffice` when designing, implementing or reviewing Backoffice changes. Look up the route and state in the [Balda Backoffice Stitch project](https://stitch.withgoogle.com/projects/4792710364374043045). Make design changes there first, then compare the implementation in the Balda worktree against those screens using Playwright. The import tasks are for explicitly requested baselines.

Use `task backoffice:preview` to serve the pinned QA application. For a requested baseline import, `task backoffice:stitch:import` captures the checked-in synthetic QA export and uploads pending routes. To resume an interrupted upload from the existing capture, run `task backoffice:stitch:upload`.
