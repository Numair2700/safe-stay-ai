import { Head, Link } from '@inertiajs/react';

const SectionCard = ({ icon, title, subtitle, children }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
            <div className="flex items-center justify-center w-9 h-9 bg-sage-50 rounded-lg shrink-0">
                {icon}
            </div>
            <div>
                <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
                {subtitle && <p className="text-xs text-warm-gray">{subtitle}</p>}
            </div>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const ComingSoonBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-50 text-sage-600 text-xs font-medium rounded-full border border-sage-200">
        <span className="w-1.5 h-1.5 bg-sage-400 rounded-full animate-pulse"></span>
        Coming soon
    </span>
);

export default function Portal({ property, manuals }) {
    const hasManual = manuals.length > 0;

    return (
        <>
            <Head title={`${property.name} — Guest Portal`} />

            <div className="min-h-screen bg-cream flex flex-col">

                {/* Header */}
                <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
                    <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex items-center justify-center w-9 h-9 bg-sage-500 rounded-xl shrink-0">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" />
                                    <path d="M9 21V12h6v9" opacity="0.6" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{property.name}</p>
                                <p className="text-xs text-warm-gray truncate">{property.address}</p>
                            </div>
                        </div>
                        <span className="shrink-0 inline-flex items-center px-2.5 py-1 bg-sage-50 text-sage-700 text-xs font-medium rounded-full border border-sage-200">
                            Guest Portal
                        </span>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 flex flex-col gap-5">

                    {/* Welcome banner */}
                    <div className="bg-sage-500 rounded-xl p-6 text-white">
                        <h1 className="text-xl font-semibold mb-1">Welcome to {property.name}</h1>
                        {property.description ? (
                            <p className="text-sm text-white/80 leading-relaxed">{property.description}</p>
                        ) : (
                            <p className="text-sm text-white/80">
                                Use this portal to get instant answers about your stay and report any issues.
                            </p>
                        )}
                    </div>

                    {/* AI Concierge — placeholder for Batch 7 */}
                    <SectionCard
                        icon={
                            <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        }
                        title="AI Concierge"
                        subtitle="Ask anything about your stay"
                    >
                        {hasManual ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                                <div className="flex items-center justify-center w-14 h-14 bg-sage-50 rounded-2xl">
                                    <svg className="w-7 h-7 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">AI chat is on its way</p>
                                    <p className="text-xs text-warm-gray mt-0.5">
                                        Your host has uploaded {manuals.length} manual{manuals.length > 1 ? 's' : ''}.
                                        The AI concierge will answer your questions shortly.
                                    </p>
                                </div>
                                <ComingSoonBadge />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                                <p className="text-sm text-warm-gray">No house manual uploaded yet.</p>
                                <p className="text-xs text-gray-400">Contact your host for information about your stay.</p>
                            </div>
                        )}
                    </SectionCard>

                    {/* Maintenance Report — placeholder for Batch 9 */}
                    <SectionCard
                        icon={
                            <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        }
                        title="Report a Maintenance Issue"
                        subtitle="Let your host know what needs attention"
                    >
                        <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                            <div className="flex items-center justify-center w-14 h-14 bg-sage-50 rounded-2xl">
                                <svg className="w-7 h-7 text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Maintenance reporting coming soon</p>
                                <p className="text-xs text-warm-gray mt-0.5">
                                    You'll be able to report issues directly from this page.
                                </p>
                            </div>
                            <ComingSoonBadge />
                        </div>
                    </SectionCard>

                </main>

                {/* Footer */}
                <footer className="py-5 text-center text-xs text-warm-gray border-t border-gray-100 bg-white">
                    Powered by <span className="text-sage-600 font-medium">Safe-Stay AI</span>
                </footer>

            </div>
        </>
    );
}
