# Baldaworks meta

Each meta commit pins the workspace projects as Git submodules under `projects/`.

| Repository | Purpose |
| --- | --- |
| [acpbench](https://github.com/baldaworks/acpbench) | Benchmark ACP servers over stdio |
| [acpboss](https://github.com/baldaworks/acpboss) | Route requests to multiple ACP providers |
| [acpchat](https://github.com/baldaworks/acpchat) | Chat with ACP agents in the terminal |
| [acpdump](https://github.com/baldaworks/acpdump) | Inspect ACP agent capabilities |
| [acprun](https://github.com/baldaworks/acprun) | Discover and run agents from the ACP Registry |
| [balda](https://github.com/baldaworks/balda) | Self-hosted engineering agent for team chat |
| [boyan](https://github.com/baldaworks/boyan) | Temporal memory for AI agents |
| [callee](https://github.com/baldaworks/callee) | Run Markdown-defined agents and workflows over ACP |
| [codex-acp](https://github.com/baldaworks/codex-acp) | Connect Codex to ACP clients |
| [go-actorlayer](https://github.com/baldaworks/go-actorlayer) | Go runtime for message routing, retries and settlement |
| [hostplugin](https://github.com/baldaworks/hostplugin) | Build portable plugins for coding agents |
| [knowl](https://github.com/baldaworks/knowl) | Self-hosted project wiki maintained from source documents |
| [mcpdump](https://github.com/baldaworks/mcpdump) | Inspect stdio MCP servers and their capabilities |
| [prism](https://github.com/baldaworks/prism) | Manage software delivery workflows with Beads |
| [prism-callee](https://github.com/baldaworks/prism-callee) | Run Prism workflows through Callee agents |
| [promptkitty](https://github.com/baldaworks/promptkitty) | Discover and assemble PromptKit prompts and workflows |

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

Both sibling commands accept any project listed above and look for the clone under `~/Projects`. Pass `PROJECTS_DIR=/path/to/projects` to use another parent directory.

For project tasks, use the project name as the task prefix from the workspace root, for example `task balda:arch-lint` or `task acpchat:test`. Only projects with a Taskfile expose product tasks.

The [workspace runbook](docs/runbooks/workspace.md) covers sync failures, pin updates and rollback.

For feature development, create a separate project checkout with `task worktree:add PROJECT=balda WORK=chat-fix`. See the [worktree runbook](docs/runbooks/workspace.md#work-on-a-project-branch) for testing, cross-project changes and cleanup.
