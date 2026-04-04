/** Path to the breed detail page (name is URL-encoded). */
export function breedDetailPath(breedName: string): string {
	return `/breeds/${encodeURIComponent(breedName)}`;
}
