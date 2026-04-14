export default function Index({ property, openIssues, resolvedIssues }) {
    return (
        <div>
            <h1>Maintenance Issues — {property.name}</h1>
            <h2>Open ({openIssues.length})</h2>
            <ul>
                {openIssues.map((issue) => (
                    <li key={issue.id}>{issue.description}</li>
                ))}
            </ul>
            <h2>Resolved ({resolvedIssues.length})</h2>
            <ul>
                {resolvedIssues.map((issue) => (
                    <li key={issue.id}>{issue.description}</li>
                ))}
            </ul>
        </div>
    );
}
