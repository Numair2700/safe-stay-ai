import { Head, Link } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'open'
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-sage-50 text-sage-700 border border-sage-200'
    }`}>
        {status === 'open' ? 'Open' : 'Resolved'}
    </span>
);

export default function Overview({ properties, openCount }) {
    const allIssues = properties.flatMap(p =>
        p.maintenance_issues.map(issue => ({ ...issue, property: p }))
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <HostLayout title="Maintenance Reports">
            <Head title="Maintenance Reports" />

            <div className="max-w-4xl flex flex-col gap-6">
                {/* Summary */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-warm-gray font-medium uppercase tracking-wide">Open Issues</p>
                        <p className="text-3xl font-semibold text-amber-600 mt-1">{openCount}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-warm-gray font-medium uppercase tracking-wide">Total Issues</p>
                        <p className="text-3xl font-semibold text-gray-800 mt-1">{allIssues.length}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-warm-gray font-medium uppercase tracking-wide">Properties</p>
                        <p className="text-3xl font-semibold text-gray-800 mt-1">{properties.length}</p>
                    </div>
                </div>

                {/* Issues list */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900">All Reports</h2>
                    </div>

                    {allIssues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg className="w-10 h-10 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-warm-gray">No maintenance issues reported yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {allIssues.map(issue => (
                                <div key={issue.id} className="flex items-start justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <p className="text-sm text-gray-800 leading-snug">{issue.description}</p>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('host.properties.maintenance.index', issue.property.id)}
                                                className="text-xs text-sage-600 hover:underline font-medium"
                                            >
                                                {issue.property.name}
                                            </Link>
                                            <span className="text-gray-300">·</span>
                                            <span className="text-xs text-warm-gray">
                                                {new Date(issue.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <StatusBadge status={issue.status} />
                                        {issue.status === 'open' && (
                                            <Link
                                                href={route('host.properties.maintenance.index', issue.property.id)}
                                                className="text-xs text-sage-600 hover:text-sage-700 font-medium"
                                            >
                                                Manage →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </HostLayout>
    );
}
