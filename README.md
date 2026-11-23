# Baldaworks meta

Each meta commit pins two projects as Git submodules under `projects/`.

| Project | Purpose |
| --- | --- |
| [Balda](https://github.com/baldaworks/balda) | Self-hosted engineering agent for team chat |
| [Knowl](https://github.com/baldaworks/knowl) | Self-hosted project wiki maintained from source documents |

## Get started

Clone `baldaworks/meta` with your Git client. From the checkout root, use [Task](https://taskfile.dev/) v3.44 or later to initialize the pinned projects and list available operations.

```sh
task sync:pins
task --list
```

## Sync commands

Run these commands from the workspace root.

| Command | Effect |
| --- | --- |
| `task sync` | Switch to meta `main`, fast-forward to the published revision, and check out its project pins. |
| `task sync:pins` | Initialize or update submodules to the pins recorded in the meta index. |
| `task sync:sibling:fetch PROJECT=knowl` | Fetch updates in the standalone Knowl clone and show its current branch status. |
| `task sync:sibling PROJECT=knowl` | Fetch updates in the standalone Knowl clone, switch it to `main`, and fast-forward it. |

Both sibling commands accept `PROJECT=balda` or `PROJECT=knowl` and look for the clone under `~/Projects`. Pass `PROJECTS_DIR=/path/to/projects` to use another parent directory.

For project tasks, use the `balda:` or `knowl:` prefix from the workspace root, for example `task balda:arch-lint` or `task knowl:wiki:validate`.

The [workspace runbook](docs/runbooks/workspace.md) covers sync failures, pin updates and rollback.
