import { Head, Link, useForm } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

const FormField = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {children}
        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
);

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        description: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('host.properties.store'));
    }

    return (
        <HostLayout title="Add Property">
            <Head title="Add Property" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-warm-gray">
                <Link href={route('host.properties.index')} className="hover:text-sage-600 transition-colors">
                    Properties
                </Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-800 font-medium">New Property</span>
            </div>

            <div className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <FormField label="Property Name *" error={errors.name}>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Seaside Cottage"
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
                            />
                        </FormField>

                        <FormField label="Address *" error={errors.address}>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="e.g. 12 Ocean Drive, Brighton, BN1 1AA"
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition"
                            />
                        </FormField>

                        <FormField label="Description" error={errors.description}>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Briefly describe the property for your records…"
                                className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent transition resize-none"
                            />
                        </FormField>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 disabled:opacity-60 transition-colors"
                            >
                                {processing ? 'Creating…' : 'Create Property'}
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
