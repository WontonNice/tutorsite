import { useMemo, useState } from "react";
import type { AuthUser } from "../authStorage";

type StudentDashboardProps = {
    authUser: AuthUser;
    onLogout: () => void;
};

function StudentDashboard({ authUser, onLogout }: StudentDashboardProps) {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const selectedCourseLabel = useMemo(() => {
        if (!selectedCourse) return "";

        return selectedCourse;
    }, [selectedCourse]);

    if (selectedCourse) {
        return (
            <>
                <h1>{selectedCourseLabel}</h1>
                <p>Course: {selectedCourse}</p>

                <button
                    type="button"
                    onClick={() => {
                        setSelectedCourse(null);
                    }}
                >
                    Back to student dashboard
                </button>
            </>
        );
    }

    return (
        <>
            <h1>Student Dashboard</h1>
            <p>Welcome, {authUser.firstName || authUser.username}</p>

            <table style={{ borderCollapse: "collapse", marginBottom: 16 }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: 8 }}>Enrolled Courses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid #ddd", padding: 8 }}>
                            {authUser.enrolledCourses.length === 0 ? (
                                <span>please enroll in a course</span>
                            ) : (
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {authUser.enrolledCourses.map((course) => (
                                        <button
                                            type="button"
                                            key={course}
                                            onClick={() => {
                                                setSelectedCourse(course);
                                            }}
                                        >
                                            {course}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={onLogout}>Logout</button>
        </>
    );
}

export default StudentDashboard;