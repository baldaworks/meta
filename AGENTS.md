# Baldaworks workspace

- Follow the instructions in the pinned project's `AGENTS.md` when editing product code under `projects/`.
- For feature work, create a project worktree with `task worktree:add`, follow its checked-out `AGENTS.md`, and run its tasks with `task worktree:run`. Namespaced project tasks in meta operate on the pinned checkout.
- Run every workspace operation through the root `Taskfile.yml`, including project operations exposed through namespaced tasks. If a task is missing, add it first. Use the corresponding `task` command in runbooks and examples.
- Publish the product commit before updating its pin in meta. Keep shared procedures in the [workspace runbook](docs/runbooks/workspace.md).
