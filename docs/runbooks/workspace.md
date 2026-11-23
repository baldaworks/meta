# Working with the Baldaworks meta repository

## Get the pinned projects

```sh
git clone --recurse-submodules git@github.com:baldaworks/meta.git
cd meta
```

## Sync an existing workspace to the published pins

Start at the meta root. Check for local changes and submodule commits you want to keep.

```sh
git status --short --branch
git submodule foreach --recursive 'git status --short --branch'
```

Commit or stash edits in the repository that owns them. If a submodule has local commits on a detached HEAD, give them a branch name before updating. Then fast-forward the meta repository, refresh the configured submodule URLs, and check out the revisions recorded in the new meta commit.

```sh
git switch main &&
  git pull --ff-only origin main &&
  git submodule sync --recursive &&
  git submodule update --init --recursive &&
  git submodule status --recursive
```

A leading space means the checkout matches its pin. A minus sign means the submodule needs initialization. A plus sign means its checkout differs from the pin. Review local work before updating it.

If the pull reports divergent history, inspect `git log --oneline --left-right main...origin/main` and reconcile the local commits before retrying. If a submodule download fails, check access to its URL in `.gitmodules`, then rerun the sync and update commands.

## Sync a sibling project checkout

The standalone checkouts at `~/Projects/balda` and `~/Projects/knowl` share their project remotes with the submodules. Each checkout has its own branch and working tree. To refresh remote refs while continuing work on the current branch, run this from the meta root for the desired project.

```sh
project=knowl
git -C "../$project" fetch origin &&
  git -C "../$project" status --short --branch
```

When you want to update the sibling's local `main`, first save any working changes there. Then run

```sh
git -C "../$project" switch main &&
  git -C "../$project" merge --ff-only origin/main
```

To bring a sibling change into the shared workspace, publish it through the project's usual workflow. Once it lands on the project's `main`, follow the pin update below.

## Find the project tools

Run `task --list` at the workspace root to see both projects' tasks. Use the project prefix to run a task in its submodule directory.

```sh
task balda:arch-lint
task knowl:wiki:validate
```

Balda provides tasks for local development, architecture checks and runtime inspection. See its [runtime guide](../../projects/balda/docs/balda.md). Knowl provides wiki generation and validation tasks. See its [local setup](../../projects/knowl/docs/local.md) and [operations guide](../../projects/knowl/docs/operations.md).

## Update one pin

From a clean meta checkout, choose either project and fetch its published main branch. The example updates Balda.

```sh
project=balda
git -C "projects/$project" fetch origin main &&
  git -C "projects/$project" switch --detach FETCH_HEAD
git diff --submodule=log -- "projects/$project"
```

After reviewing the commits and verifying the intended revision, record the pin in the meta repository.

```sh
git add -- "projects/$project"
git diff --cached --submodule=log
git commit -m "chore: update $project pin"
```

Publish the meta commit through the usual review or push workflow. Other workspaces can then pick it up with the [workspace sync procedure](#sync-an-existing-workspace-to-the-published-pins).

To undo a published pin update, revert its meta commit and run `git submodule update --init --recursive` to check out the restored revision.
