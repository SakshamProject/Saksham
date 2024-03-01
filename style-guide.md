
# Coding Conventions
1. All variables must be `const` by default unless they have a reason to change.
2. Do not use `var` by any means.

## Commits
1. All commits must leave the code in running condition. It is okay if tests fail, but the code should not fail to build.
2. Prefix all commit messages with `"<name> | `

## Imports
Local TypeScript(`".ts"`) files should be imported using the `".js"` suffix.

### Example
1. A
```ts
// To import file "../config.ts" use:
import config from "../config.js";
```

# Naming Conventions
## Plurality
1. File names must be singular
2. Router names must be singular
3. REST Endpoints must be plural

## Casing
1. Packages: `lowerCamelCase`
2. Classes: `UpperCamelCase`
3. Functions: `lowerCamelCase`
4. Variables, Parameters: `lowerCamelCase`

### Examples
1. `sevaKendra` (K capital)
2. `typeMaster` (M capital)

## File Names (and Placement)
### Test Files
1. Test files for a file (say, `user.ts`) should be suffixed with `.test.ts`(like so, `user.test.ts`)
2. A test file should be in the same directory or in an immediate subdirectory (called `tests`) of the file being tested.

### Zod Schemas
1. Zod Schema files should be added in the same directory as the file using the schema.
2. Zod Schema files for a file (say, `user.ts`) should be suffixed with `.schema.ts` (like so, `user.schema.ts`)