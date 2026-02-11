import type { AuthUser } from "../../../authStorage";

type PrecalcHomePageProps = {
    authUser: AuthUser;
    onBack: () => void;
    onLogout: () => void;
};

function PrecalcHomePage({ authUser, onBack, onLogout }: PrecalcHomePageProps) {
    return (
        <>
            <h1>Precalculus Home</h1>
            <p>Welcome, {authUser.firstName || authUser.username}</p>
            <p>This is the new Precalc landing page.</p>

            <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={onBack}>
                    Back to student dashboard
                </button>
                <button type="button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </>
    );
}

export default PrecalcHomePage;