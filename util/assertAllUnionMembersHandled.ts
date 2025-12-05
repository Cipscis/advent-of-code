/**
 * TypeScript utility to help make sure every type of a union is handled.
 *
 * Causes a TypeScript compiler error if the argument provided has union types remaining.
 *
 * Should be used alongside type narrowing techniques such as `if`/`else if` blocks, `switch`/`case` blocks, or early returns.
 *
 * @throws {RangeError} if encountered at runtime.
 *
 * @example
 * ```typescript
 * declare const type = 'A' | 'B';
 *
 * if (type === 'A') {
 *     // Do something
 * } else {
 *     assertAllUnionMembersHandled(type);
 *     // ^Argument of type `'B'` is not assignable to parameter of type `never`.
 * }
 * ```
 */
export function assertAllUnionMembersHandled(x: never): never
export function assertAllUnionMembersHandled(x: unknown): never {
	throw new RangeError(`Encountered unexpected value ${x}).`);
}