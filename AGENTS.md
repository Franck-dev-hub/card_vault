# Issues

Issues must be written in French.
Most contributors are French speakers and not all are fluent in English.

# Language

- Default: **British English** (colour, behaviour, initialise, centre, etc.)
- Never use em dashes. Use commas, semicolons, colons, or full stops instead.

# pnpm audit / CVE management

pnpm v11 audit has non-obvious behaviour. Always read `doc/frontend/pnpm-audit.md` before modifying CVE configs, adding ignores, or changing the audit workflow.

# Git commits

## Format

```
[Type] Short, clear message
```

## Types

`Feature`, `Chore`, `Fix`, `Hotfix`, `Refactor`, `Doc`, `Test`, `Style`, `Release`, `WIP`

## Ticket ID

When work is tracked externally, the ticket ID must appear in both the branch name and every commit message on that branch.

```
[Type] #ID Description
```

The ticket ID ties every commit to its originating task. Commits without a ticket ID are only acceptable for untracked work (internal chores, exploratory spikes).

## Message rules

- Start with a verb.
- Keep it short, max 70 characters.
- Describe *what* changed, not *how*.