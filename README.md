# Baldaworks meta

Each meta commit pins two projects as Git submodules under `projects/`.

| Project | Purpose |
| --- | --- |
| [Balda](https://github.com/baldaworks/balda) | Self-hosted engineering agent for team chat |
| [Knowl](https://github.com/baldaworks/knowl) | Self-hosted project wiki maintained from source documents |

## Get started

With Git and SSH access to `baldaworks/meta`, clone the workspace and check its pins.

```sh
git clone --recurse-submodules git@github.com:baldaworks/meta.git
cd meta
git submodule status --recursive
```

If you already cloned the repository without its submodules, run `task sync:pins` from the root to initialize the recorded revisions. Use `task sync` to update the workspace to the published meta `main`.

With Task v3.44 or later installed, run `task --list` to see both projects’ commands. The root Taskfile runs `balda:*` tasks in `projects/balda` and `knowl:*` tasks in `projects/knowl`.

See the [workspace runbook](docs/runbooks/workspace.md) to sync checkouts, update a project pin or roll it back.
