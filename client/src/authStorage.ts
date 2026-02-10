export type UserRole = "student" | "teacher";

const USER_ROLE_STORAGE_KEY = "tutorsite_user_role";

export function getStoredUserRole(): UserRole | null {
    if (typeof window === "undefined") return null;
    const storedRole = localStorage.getItem(USER_ROLE_STORAGE_KEY);
    if (!storedRole) return null;
    return storedRole as UserRole;
}

export function setStoredUserRole(userRole: UserRole | null): void {
    if (typeof window === "undefined") return;

    if (userRole) {
        window.localStorage.setItem(USER_ROLE_STORAGE_KEY, userRole);
        return;
    }

    window.localStorage.removeItem(USER_ROLE_STORAGE_KEY);
}