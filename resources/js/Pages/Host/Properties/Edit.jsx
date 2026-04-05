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

            <div className="max-w-2xl">
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
