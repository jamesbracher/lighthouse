# Working rules for agents

- Before changing behaviour, write a failing test.
- Before saying a change is done, run tests, lint and the type check
  (`npm test`, `npm run lint`, `npm run typecheck`).
- If a check fails, do not push.
- Commit after each small change.
- Ask before adding a library.
- Before you push, run the app locally (`npm run dev`) and wait for the
  user to check it.
