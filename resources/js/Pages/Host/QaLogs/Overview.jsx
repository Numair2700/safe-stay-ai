import { Head, Link } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

export default function Overview({ properties, totalCount }) {
    const allLogs = properties.flatMap(p =>
        p.qa_logs.map(log => ({ ...log, property: p }))
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <HostLayout title="Q&A Logs">
            <Head title="Q&A Logs" />

            <div className="max-w-4xl flex flex-col gap-6">

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-warm-gray font-medium uppercase tracking-wide">Total Questions</p>
                        <p className="text-3xl font-semibold text-gray-800 mt-1">{totalCount}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <p className="text-xs text-warm-gray font-medium uppercase tracking-wide">Properties</p>
                        <p className="text-3xl font-semibold text-gray-800 mt-1">{properties.length}</p>
                    </div>
                </div>

                {/* Logs */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50">
                        <h2 className="text-sm font-semibold text-gray-900">All Guest Questions</h2>
                        <p className="text-xs text-warm-gray mt-0.5">Questions asked across all your properties</p>
                    </div>

                    {allLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg className="w-10 h-10 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <p className="text-sm text-warm-gray">No questions asked yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {allLogs.map(log => (
                                <div key={log.id} className="px-6 py-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-medium text-gray-800">{log.question}</p>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Link
                                                href={route('host.properties.qa-logs.index', log.property.id)}
                                                className="text-xs text-sage-600 hover:underline font-medium"
                                            >
                                                {log.property.name}
                                            </Link>
                                            <span className="text-gray-300">·</span>
                                            <span className="text-xs text-warm-gray">
                                                {new Date(log.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">{log.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </HostLayout>
    );
}
