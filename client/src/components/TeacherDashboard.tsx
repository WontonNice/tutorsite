type TeacherDashboardProps = {
    onLogout: () => void;
};

function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
    return (
        <>
            <h1>Teacher Dashboard</h1>
            <button onClick={onLogout}>Logout</button>
        </>
    );
}

export default TeacherDashboard;
