import { Head, Link, useForm } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';
import { useRef } from 'react';

const ManualCard = ({ manual, property }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 bg-sage-100 rounded-lg shrink-0">
                <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{manual.filename}</p>
                <p className="text-xs text-warm-gray">
                    {manual.content.length.toLocaleString()} characters
                </p>
            </div>
        </div>
        <Link
            href={route('host.properties.manuals.destroy', [property.id, manual.id])}
            method="delete"
            as="button"
            onBefore={() => confirm('Delete this manual?')}
            className="ml-4 flex items-center gap-1 text-xs text-red-400 hover:text-red-600 font-medium transition-colors shrink-0"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
        </Link>
    </div>
);

const UploadForm = ({ property }) => {
    const fileRef = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({ manual: null });

    function submit(e) {
        e.preventDefault();
        post(route('host.properties.manuals.store', property.id), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileRef.current) fileRef.current.value = '';
            },
        });
    }

    return (
        <form onSubmit={submit} className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">Upload house manual (.txt)</label>
            <div className="flex items-center gap-3">
                <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,text/plain"
                    onChange={(e) => setData('manual', e.target.files[0])}
                    className="flex-1 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200 file:cursor-pointer transition"
                />
                <button
                    type="submit"
                    disabled={processing || !data.manual}
                    className="px-4 py-2 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 disabled:opacity-50 transition-colors shrink-0"
                >
                    {processing ? 'Uploading…' : 'Upload'}
                </button>
            </div>
            {errors.manual && (
                <p className="text-xs text-red-500">{errors.manual}</p>
            )}
            <p className="text-xs text-warm-gray">Plain text files only (.txt), max 5 MB.</p>
        </form>
    );
};

export default function Show({ property, manuals }) {
    return (
        <HostLayout title={property.name}>
            <Head title={property.name} />

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

            <div className="max-w-3xl flex flex-col gap-6">
                {/* Property info card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{property.name}</h2>
                            <p className="text-sm text-warm-gray flex items-center gap-1.5 mt-1">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {property.address}
                            </p>
                        </div>
                        <Link
                            href={route('host.properties.edit', property.id)}
                            className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </Link>
                    </div>
                    {property.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
                    )}
                </div>

                {/* House Manuals card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">House Manuals</h3>
                        <p className="text-sm text-warm-gray mt-0.5">
                            Guests will use these to get AI-powered answers.
                        </p>
                    </div>

                    {/* Existing manuals */}
                    {manuals.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {manuals.map((manual) => (
                                <ManualCard key={manual.id} manual={manual} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-sm text-warm-gray">No manuals uploaded yet.</p>
                        </div>
                    )}

                    {/* Upload form */}
                    <div className="pt-4 border-t border-gray-100">
                        <UploadForm property={property} />
                    </div>
                </div>
            </div>
        </HostLayout>
    );
}
