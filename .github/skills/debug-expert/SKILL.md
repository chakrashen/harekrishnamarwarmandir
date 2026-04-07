---
name: debug-expert
description: "Identify bugs, explain root causes, provide corrected code, and improve reliability and code quality. Use for runtime errors, logic bugs, API failures, performance regressions, and maintainability cleanup in Next.js and JavaScript projects."
argument-hint: "Provide failing behavior, error message, affected file, and expected result."
user-invocable: true
---

# Debug Expert

## Outcome
Deliver stable, clean, and working code by:
- Reproducing and isolating issues
- Explaining why the bug happens
- Applying minimal and safe fixes
- Improving logic and readability where needed
- Verifying the fix with clear checks

## When To Use
Use this skill when you need:
- Bug fixing in UI, API, or backend logic
- Error explanation with exact root cause
- Refactor of fragile code paths
- Regression prevention after a fix

## Inputs To Collect
1. Error details: exact message, stack trace, environment
2. Reproduction steps: what action causes the bug
3. Expected behavior: what should happen instead
4. Impact scope: affected pages, users, or features
5. Constraints: no API changes, minimal patch, deadline sensitivity

## Workflow
1. Reproduce and scope
- Recreate the issue from reported steps.
- Confirm whether it is deterministic or intermittent.
- Define impacted files, functions, and user journeys.

2. Analyze root cause
- Inspect code path from input to failure point.
- Validate assumptions around nullability, async state, and data shapes.
- Check API contracts and edge cases.

3. Implement targeted fix
- Prefer smallest safe change that resolves the root cause.
- Keep existing behavior intact for unaffected paths.
- Add concise comments only where logic is non-obvious.

4. Improve code quality
- Remove dead branches and redundant logic.
- Strengthen validation and error messages.
- Improve naming and structure when it increases clarity.

5. Verify and guard
- Re-test original reproduction steps.
- Test adjacent scenarios and edge cases.
- Add or suggest tests to prevent recurrence.

## Decision Logic
1. If issue is user-blocking or payment-related:
- Patch immediately with minimal risk, then follow with hardening.

2. If issue is low severity but architectural:
- Create incremental refactor plan with checkpoints.

3. If issue cannot be reproduced:
- Add diagnostic logs and narrow hypotheses before changing logic.

## Quality Checks
1. Root cause is explicitly identified, not guessed.
2. Fix is minimal, readable, and scoped.
3. No unrelated behavior is changed.
4. Error handling is clearer after fix.
5. Validation covers known bad inputs.
6. Regression risk is assessed and mitigated.

## Deliverables
1. Bug summary with root cause
2. Corrected code patch
3. Verification checklist and results
4. Follow-up improvements or tests

## Example Prompts
- Use /debug-expert to fix payment callback errors and explain root cause.
- Use /debug-expert to resolve form validation bug in booking flow.
- Use /debug-expert to investigate API 500 error and provide safe patch.
