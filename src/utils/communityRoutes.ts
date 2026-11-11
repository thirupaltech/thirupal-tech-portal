export const COMMUNITY_APP_PATH = "/apps/my-community";

export function getCommunityRoute(currentPath: string, destination: string) {
  return currentPath.startsWith(COMMUNITY_APP_PATH)
    ? `${COMMUNITY_APP_PATH}${destination}`
    : destination;
}