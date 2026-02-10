type StudentDashboardProps = {
    onLogout: () => void;
};

function StudentDashboard({ onLogout }: StudentDashboardProps) {
    return (
        <>
            <h1>Student Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
        </>
    );
}

export default StudentDashboard;