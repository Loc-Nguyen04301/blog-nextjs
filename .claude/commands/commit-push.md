Commit all staged and unstaged changes, then push to the main branch.

## Steps

1. Run `git status` to see what changed.
2. Run `git add -A` to stage all changes.
3. If the user provided a message in `$ARGUMENTS`, use it as the commit message. Otherwise, look at the diff and write a concise commit message that describes what changed (follow the recent commit style in this repo).
4. Commit with the message.
5. Run `git push origin main`.
6. Report the commit hash and push result.

## Rules

- Never skip pre-commit hooks (`--no-verify`).
- Never force-push (`--force`).
- If `git push` fails because the remote has new commits, run `git pull --rebase origin main` first, then push again.
- If there is nothing to commit, say so and stop.
