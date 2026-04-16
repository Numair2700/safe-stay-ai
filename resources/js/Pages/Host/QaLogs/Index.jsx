import { Head, Link } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

export default function Index({ property, qaLogs }) {
    return (
        <HostLayout title="Q&A Log">
            <Head title={`Q&A Log — ${property.name}`} />

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
                <span className="text-gray-800 font-medium">Q&A Log</span>
            </div>

            <div className="max-w-3xl flex flex-col gap-6">

                {/* Stats */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-sage-50 rounded-xl">
                        <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-gray-800">{qaLogs.length}</p>
                        <p className="text-xs text-warm-gray">Total questions asked</p>
                    </div>
                </div>

                {/* Logs */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50">
                        <h2 className="text-sm font-semibold text-gray-900">Guest Questions</h2>
                        <p className="text-xs text-warm-gray mt-0.5">All questions guests asked via the AI concierge</p>
                    </div>

                    {qaLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg className="w-10 h-10 text-gray-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <p className="text-sm text-warm-gray">No questions asked yet.</p>
                            <p className="text-xs text-gray-400 mt-1">Questions from guests will appear here.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {qaLogs.map(log => (
                                <div key={log.id} className="p-6 flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-lg shrink-0 mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-warm-gray mb-1">Guest</p>
                                            <p className="text-sm text-gray-800">{log.question}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 ml-10">
                                        <div className="flex items-center justify-center w-7 h-7 bg-sage-100 rounded-lg shrink-0 mt-0.5">
                                            <svg className="w-3.5 h-3.5 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-sage-600 mb-1">AI Concierge</p>
                                            <p className="text-sm text-gray-700 leading-relaxed">{log.answer}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 text-right">
                                        {new Date(log.created_at).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </HostLayout>
    );
}
