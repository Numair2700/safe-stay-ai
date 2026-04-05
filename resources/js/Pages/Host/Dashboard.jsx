import { Head, Link } from '@inertiajs/react';
import HostLayout from '@/Layouts/HostLayout';

const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
                <Link href={route('host.properties.show', property.id)}>
                    <h3 className="text-base font-semibold text-gray-900 truncate hover:text-sage-600 transition-colors">{property.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-warm-gray flex items-center gap-1.5">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{property.address}</span>
                </p>
            </div>
            <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-700">
                Active
            </span>
        </div>

        {property.description && (
            <p className="text-sm text-gray-500 line-clamp-2">{property.description}</p>
        )}

        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
            <Link
                href={route('host.properties.edit', property.id)}
                className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </Link>
            <Link
                href={route('host.properties.destroy', property.id)}
                method="delete"
                as="button"
                onBefore={() => confirm('Are you sure you want to delete this property?')}
                className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </Link>
        </div>
    </div>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-sage-50 rounded-2xl">
            <svg className="w-8 h-8 text-sage-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-800">No properties yet</h3>
        <p className="mt-1 text-sm text-warm-gray">Add your first property to get started.</p>
        <Link
            href={route('host.properties.create')}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 transition-colors"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Property
        </Link>
    </div>
);

export default function Dashboard({ properties }) {
    return (
        <HostLayout title="My Properties">
            <Head title="Host Dashboard" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-warm-gray">
                        {properties.length} {properties.length === 1 ? 'property' : 'properties'}
                    </p>
                </div>
                <Link
                    href={route('host.properties.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sage-500 text-white text-sm font-medium rounded-lg hover:bg-sage-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Property
                </Link>
            </div>

            {properties.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </HostLayout>
    );
}
