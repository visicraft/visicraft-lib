/**
 * Returns an escaped variant of the provided string, that is safe for Regex
 */
export function escape_regex(string: string): string {
    // source: https://stackoverflow.com/a/6969486

    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
