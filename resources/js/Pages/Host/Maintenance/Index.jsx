import { Head, Link } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

const IssueCard = ({ issue, property, canResolve }) => (
    <div className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-start gap-3 min-w-0">
            <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5 ${
                issue.status === 'open' ? 'bg-amber-100' : 'bg-sage-100'
            }`}>
                {issue.status === 'open' ? (
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <div className="min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{issue.description}</p>
                <p className="text-xs text-warm-gray mt-1">
                    {new Date(issue.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })}
                </p>
            </div>
        </div>
        {canResolve && (
            <Link
                href={route('host.properties.maintenance.resolve', [property.id, issue.id])}
                method="patch"
                as="button"
                className="shrink-0 px-3 py-1.5 bg-sage-500 hover:bg-sage-600 text-white text-xs font-medium rounded-lg transition-colors"
            >
                Mark Resolved
            </Link>
        )}
    </div>
);

export default function Index({ property, openIssues, resolvedIssues }) {
    return (
        <HostLayout title="Maintenance Reports">
            <Head title={`Maintenance — ${property.name}`} />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-warm-gray">
                <Link href={route('host.properties.index')} className="hover:text-sage-600 transition-colors">
                    Properties
                </Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <Link href={route('host.properties.show', property.id)} className="hover:text-sage-600 transition-colors">
                    {property.name}
                </Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-800 font-medium">Maintenance</span>
            </div>

            <div className="max-w-3xl flex flex-col gap-6">

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-amber-50 rounded-xl">
                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-amber-600">{openIssues.length}</p>
                            <p className="text-xs text-warm-gray">Open Issues</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-sage-50 rounded-xl">
                            <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-sage-600">{resolvedIssues.length}</p>
                            <p className="text-xs text-warm-gray">Resolved</p>
                        </div>
                    </div>
                </div>

                {/* Open Issues — SSAI-18 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                        <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                            {openIssues.length} Open
                        </span>
                        <h2 className="text-sm font-semibold text-gray-900">Open Issues</h2>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {openIssues.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                                <svg className="w-8 h-8 text-gray-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-sm text-warm-gray">No open issues — all clear!</p>
                            </div>
                        ) : (
                            openIssues.map(issue => (
                                <IssueCard key={issue.id} issue={issue} property={property} canResolve={true} />
                            ))
                        )}
                    </div>
                </div>

                {/* Resolved History — SSAI-20 */}
                {resolvedIssues.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
                            <span className="inline-flex items-center px-2 py-0.5 bg-sage-50 text-sage-700 text-xs font-medium rounded-full border border-sage-200">
                                {resolvedIssues.length} Resolved
                            </span>
                            <h2 className="text-sm font-semibold text-gray-900">Issue History</h2>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            {resolvedIssues.map(issue => (
                                <IssueCard key={issue.id} issue={issue} property={property} canResolve={false} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </HostLayout>
    );
}
