import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';

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


export default function Portal({ property, manuals }) {
    const { url } = usePage();
    const hasManual = manuals.length > 0;

    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hello! Ask me anything about your stay.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const [maintenanceDesc, setMaintenanceDesc] = useState('');
    const [maintenanceLoading, setMaintenanceLoading] = useState(false);
    const [maintenanceSuccess, setMaintenanceSuccess] = useState(false);
    const [maintenanceError, setMaintenanceError] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const sendQuestion = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const question = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: question }]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(url.replace('/portal', '/concierge'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

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

                    {/* AI Concierge — Live Chat UI */}
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
                            <div className="flex flex-col gap-4">
                                {/* Messages container */}
                                <div className="bg-gray-50 rounded-lg p-4 h-72 overflow-y-auto flex flex-col gap-3">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                                                    msg.role === 'user'
                                                        ? 'bg-sage-500 text-white rounded-br-none'
                                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white text-gray-800 px-4 py-2 rounded-xl border border-gray-200 rounded-bl-none flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input form */}
                                <form onSubmit={sendQuestion} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        disabled={loading}
                                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 disabled:bg-gray-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !input.trim()}
                                        className="bg-sage-500 hover:bg-sage-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                                <p className="text-sm text-warm-gray">No house manual uploaded yet.</p>
                                <p className="text-xs text-gray-400">Contact your host for information about your stay.</p>
                            </div>
                        )}
                    </SectionCard>

                    {/* Maintenance Report */}
                    <SectionCard
                        icon={
                            <svg className="w-5 h-5 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        }
                        title="Report a Maintenance Issue"
                        subtitle="Let your host know what needs attention"
                    >
                        {maintenanceSuccess ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                                <div className="flex items-center justify-center w-14 h-14 bg-sage-50 rounded-2xl">
                                    <svg className="w-7 h-7 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Issue reported successfully</p>
                                    <p className="text-xs text-warm-gray mt-0.5">Your host has been notified.</p>
                                </div>
                                <button
                                    onClick={() => { setMaintenanceSuccess(false); setMaintenanceDesc(''); }}
                                    className="text-xs text-sage-600 hover:underline"
                                >
                                    Report another issue
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (!maintenanceDesc.trim() || maintenanceLoading) return;
                                    setMaintenanceLoading(true);
                                    setMaintenanceError('');
                                    try {
                                        const res = await fetch(url.replace('/portal', '/maintenance'), {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                                            },
                                            body: JSON.stringify({ description: maintenanceDesc }),
                                        });
                                        if (!res.ok) throw new Error('Failed');
                                        setMaintenanceSuccess(true);
                                    } catch {
                                        setMaintenanceError('Something went wrong. Please try again.');
                                    } finally {
                                        setMaintenanceLoading(false);
                                    }
                                }}
                                className="flex flex-col gap-3"
                            >
                                <textarea
                                    value={maintenanceDesc}
                                    onChange={(e) => setMaintenanceDesc(e.target.value)}
                                    placeholder="Describe the issue (e.g. the kitchen tap is leaking)..."
                                    rows={4}
                                    maxLength={1000}
                                    disabled={maintenanceLoading}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500 resize-none disabled:bg-gray-50"
                                />
                                {maintenanceError && (
                                    <p className="text-xs text-red-500">{maintenanceError}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={maintenanceLoading || !maintenanceDesc.trim()}
                                    className="self-end bg-sage-500 hover:bg-sage-600 disabled:bg-gray-300 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
                                >
                                    {maintenanceLoading ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </form>
                        )}
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
