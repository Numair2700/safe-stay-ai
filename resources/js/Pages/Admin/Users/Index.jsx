export default function Index({ users }) {
    return (
        <div>
            <h1>Admin - User Management</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} — {user.role}</li>
                ))}
            </ul>
        </div>
    );
}
