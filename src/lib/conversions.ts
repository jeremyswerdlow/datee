/**
 * Converts a relative path to a resouce within the `public` directory to its
 * absolute path based on the environment's BASE_URL.
 * @param relativePath the path within `public` directory to the resource.
 * @returns the full path.
 */
export const convertRelativePublicPathToAbsolute = (relativePath: string) => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

    return baseUrl + "/" + relativePath.replace(/^\//, "");
};
