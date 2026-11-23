# Working with the Baldaworks meta repository

## Get the pinned projects

```sh
git clone --recurse-submodules git@github.com:baldaworks/meta.git
cd meta
```

In an existing checkout, commit or stash any local work inside each submodule before switching revisions. From the meta root, run

```sh
git pull --ff-only
git submodule sync --recursive
git submodule update --init --recursive
git submodule status --recursive
```

A leading space means the checkout matches its pin. A minus sign means the submodule needs initialization. A plus sign means its checkout differs from the pin. Review local work before updating it.

## Find the project tools

Run `task --list` at the workspace root to see both projects' tasks. Use the project prefix to run a task in its submodule directory.

```sh
task balda:arch-lint
task knowl:wiki:validate
```

Balda provides tasks for local development, architecture checks and runtime inspection. See its [runtime guide](../../balda/docs/balda.md). Knowl provides wiki generation and validation tasks. See its [local setup](../../knowl/docs/local.md) and [operations guide](../../knowl/docs/operations.md).

## Update one pin

From a clean meta checkout, choose either project and fetch its published main branch. The example updates Balda.

```sh
project=balda
git -C "$project" fetch origin main &&
  git -C "$project" switch --detach FETCH_HEAD
git diff --submodule=log -- "$project"
```

After reviewing the commits and verifying the intended revision, record the pin in the meta repository.

```sh
git add -- "$project"
git diff --cached --submodule=log
git commit -m "chore: update $project pin"
```

To undo a published pin update, revert its meta commit and run `git submodule update --init --recursive` to check out the restored revision.
