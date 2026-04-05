import { Link, usePage } from '@inertiajs/react';

const NavItem = ({ href, active, title, children }) => (
    <Link
        href={href}
        title={title}
        className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
            active
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
    >
        {children}
    </Link>
);

export default function HostLayout({ title, children }) {
    const { auth, flash } = usePage().props;

    return (
        <div className="flex min-h-screen bg-cream">
            {/* Icon-only sidebar */}
            <aside className="flex flex-col items-center w-20 py-6 bg-sage-500 shrink-0 gap-2">
                {/* Logo mark */}
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white/20 rounded-xl">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 12L12 3l9 9v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" />
                        <path d="M9 21V12h6v9" opacity="0.6" />
                    </svg>
                </div>

                {/* Nav items */}
                <NavItem
                    href={route('host.properties.index')}
                    active={route().current('host.properties.*')}
                    title="Properties"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </NavItem>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Profile */}
                <NavItem href={route('profile.edit')} title="Profile">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </NavItem>

                {/* Logout */}
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    title="Log Out"
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </Link>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Top bar */}
                <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
                    <div>
                        {title && (
                            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sage-100 text-sage-700 text-sm font-medium">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-warm-gray font-medium">{auth.user.name}</span>
                    </div>
                </header>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-8 mt-4 px-4 py-3 bg-sage-50 border border-sage-200 text-sage-700 rounded-xl text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-8 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                        {flash.error}
                    </div>
                )}

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
