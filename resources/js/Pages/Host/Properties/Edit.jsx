import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

const FormField = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {children}
        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);

export default function Edit({ property }) {
    const [copied, setCopied] = useState(false);
    const guestPortalPath = route('guest.portal', property.id, false);
    const guestPortalUrl = `${window.location.origin}${guestPortalPath}`;

    const copyGuestLink = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(guestPortalUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { data, setData, put, processing, errors } = useForm({
        name: property.name,
        address: property.address,
        description: property.description ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('host.properties.update', property.id));
    }

    return (
        <HostLayout title="Edit Property">
            <Head title="Edit Property" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-warm-gray">
                <Link href={route('host.properties.index')} className="hover:text-sage-600 transition-colors">
                    Properties
                </Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-800 font-medium">{property.name}</span>
            </div>

            <div className="max-w-2xl flex flex-col gap-6">
                {/* Guest Link Panel */}
                <div className="bg-sage-50 rounded-xl border border-sage-100 p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-sage-800">Guest Portal Link</h3>
                        <p className="text-xs text-sage-600 mt-0.5">Share this link directly with your guests so they can access manuals and ask questions.</p>
                        <p className="mt-2 text-xs text-sage-800 break-all">{guestPortalUrl}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                        <a
                            href={guestPortalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-white text-sage-700 border border-sage-200 hover:bg-white transition-colors"
                        >
                            Open
                        </a>
                        <button
                            type="button"
                            onClick={copyGuestLink}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                copied ? 'bg-sage-600 text-white' : 'bg-white text-sage-700 border border-sage-200 hover:bg-white'
                            }`}
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    Copy Link
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <FormField label="Property Name *" error={errors.name}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
                            />
                        </FormField>

                        <FormField label="Address *" error={errors.address}>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
                            />
                        </FormField>

                        <FormField label="Description" error={errors.description}>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition resize-none"
                            />
                        </FormField>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 disabled:opacity-60 transition-colors"
                            >
                                {processing ? 'Saving…' : 'Save Changes'}
                            </button>
                            <Link
                                href={route('host.properties.index')}
                                className="px-5 py-2.5 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </HostLayout>
    );
}
