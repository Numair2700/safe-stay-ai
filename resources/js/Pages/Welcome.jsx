import { Head, Link } from '@inertiajs/react';

export default function Welcome({ canLogin, canRegister }) {
    return (
        <>
            <Head title="Safe-Stay AI — Smart Property Management" />

            <div className="min-h-screen bg-cream flex flex-col">
                {/* Nav */}
                <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-9 h-9 bg-sage-500 rounded-xl">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" />
                                <path d="M9 21V12h6v9" opacity="0.6" />
                            </svg>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                            Safe-Stay <span className="text-sage-500">AI</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {canLogin && (
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-warm-gray hover:text-gray-900 transition-colors"
                            >
                                Log in
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route('register')}
                                className="px-4 py-2 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 transition-colors"
                            >
                                Get started
                            </Link>
                        )}
                    </div>
                </nav>

                {/* Hero */}
                <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-100 text-sage-700 text-xs font-medium rounded-full mb-6">
                        <span className="w-1.5 h-1.5 bg-sage-500 rounded-full"></span>
                        AI-powered property management
                    </div>

                    <h1 className="text-5xl font-bold text-gray-900 max-w-2xl leading-tight mb-5">
                        Your properties,{' '}
                        <span className="text-sage-500">effortlessly</span> managed
                    </h1>

                    <p className="text-lg text-warm-gray max-w-xl leading-relaxed mb-10">
                        Safe-Stay AI gives your guests instant answers from your house manuals
                        and lets you manage maintenance reports — all in one place.
                    </p>

                    <div className="flex items-center gap-4">
                        {canRegister && (
                            <Link
                                href={route('register')}
                                className="px-6 py-3 bg-sage-500 text-white font-medium rounded-xl hover:bg-sage-600 transition-colors shadow-sm"
                            >
                                Start for free
                            </Link>
                        )}
                        {canLogin && (
                            <Link
                                href={route('login')}
                                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                Log in
                            </Link>
                        )}
                    </div>
                </section>

                {/* Features */}
                <section className="px-8 pb-20">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                ),
                                title: 'Property Management',
                                body: 'Add and manage all your properties in one clean dashboard. Upload house manuals and keep everything organised.',
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                ),
                                title: 'AI Concierge',
                                body: 'Guests get instant AI-powered answers based on your house manual — reducing repetitive questions 24/7.',
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                ),
                                title: 'Maintenance Tracking',
                                body: 'Guests report issues directly. You see everything in one place and mark them resolved when done.',
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
                                <div className="flex items-center justify-center w-11 h-11 bg-sage-50 rounded-xl">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                <p className="text-sm text-warm-gray leading-relaxed">{feature.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-6 text-center text-xs text-warm-gray border-t border-gray-100 bg-white">
                    © {new Date().getFullYear()} Safe-Stay AI. All rights reserved.
                </footer>
            </div>
        </>
    );
}
