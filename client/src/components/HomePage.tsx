import { useState } from "react";
import type { FormEvent } from "react";

type AuthMode = "login" | "register";

const API_BASE =
    import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8080";

async function parseResponseBody(response: Response) {
    const responseText = await response.text();
    if (!responseText) return null;

    try {
        return JSON.parse(responseText) as Record<string, unknown>;
    } catch {
        return { raw: responseText } as Record<string, unknown>;
    }
}

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : String(error);
}

function HomePage() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isRegister = mode === "register";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        const endpoint = isRegister ? "/register" : "/login";
        const payload = isRegister
            ? { username, password, firstName, lastName }
            : { username, password };

        const requestUrl = `${API_BASE}${endpoint}`;

        try {
            const response = await fetch(requestUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await parseResponseBody(response);

            if (!response.ok) {
                const serverError =
                    (typeof result?.error === "string" && result.error) ||
                    (typeof result?.message === "string" && result.message) ||
                    (result?.raw && typeof result.raw === "string" && result.raw) ||
                    `HTTP ${response.status}`;

                setMessage(`${requestUrl} -> ${serverError}`);
                return;
            }

            setMessage(isRegister ? "Registration successful!" : "Login successful!");
        } catch (error) {
            setMessage(
                `Could not reach backend at ${API_BASE}. ${getErrorMessage(error)}`
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <section
                style={{
                    width: "100%",
                    maxWidth: 420,
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 24,
                }}
            >
                <h1 style={{ marginTop: 0 }}>
                    {isRegister ? "Create Account" : "Login"}
                </h1>

                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    <button type="button" onClick={() => setMode("login")}>
                        Login
                    </button>
                    <button type="button" onClick={() => setMode("register")}>
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    {isRegister && (
                        <>
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            />
                        </>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Please wait..." : isRegister ? "Register" : "Login"}
                    </button>
                </form>

                {message && (
                    <p style={{ marginBottom: 0, marginTop: 14 }} aria-live="polite">
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default HomePage;