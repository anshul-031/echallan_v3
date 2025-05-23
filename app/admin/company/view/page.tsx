'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BuildingOfficeIcon, XMarkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import toast from 'react-hot-toast';
import type { Company } from '@/app/types/user';

export default function ViewCompany() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const companyId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<Company | null>(null);
    useEffect(() => {
        if (!companyId) {
            router.push('/admin/company');
            return;
        }
        fetchCompany();
    }, [companyId]);

    const fetchCompany = async () => {
        try {
            const response = await fetch(`/api/admin/company/${companyId}`);
            if (!response.ok) throw new Error('Failed to fetch company');
            const data = await response.json();
            setCompany(data);
        } catch (error) {
            toast.error('Failed to load company details');
            router.push('/admin/company');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (!company) {
        return <div className="flex items-center justify-center min-h-screen">Company not found</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900">Company Details</h2>
                        <button
                            onClick={() => router.push('/admin/company')}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Column - Company Logo and Basic Info */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center aspect-square">
                                <div className="w-48 h-48 relative mb-6">
                                    <div
                                        className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center relative"
                                    >
                                        {company.image ? (
                                            <Image
                                                src={company.image}
                                                alt={company.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <BuildingOfficeIcon className="w-24 h-24 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">{company.name}</h3>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                                    <p className="text-gray-600">{company.email}</p>
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <MapPinIcon className="h-4 w-4 text-gray-500" />
                                    <p className="text-gray-600">{company.address}</p>
                                </div>
                                <span
                                    className={`px-4 py-1 text-sm font-semibold rounded-full ${company.status
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {company.status ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        {/* Right Column - Company Details Grid */}
                        <div className="lg:w-2/3 space-y-8">
                            {/* Owner Details */}
                            <div className="bg-gray-100 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Owner Details</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">Name:</span>
                                        <span className="text-sm text-gray-900">{company.ownerName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">Phone:</span>
                                        <span className="text-sm text-gray-900">{company.ownerPhone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="bg-gray-100 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Contact Details</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">Name:</span>
                                        <span className="text-sm text-gray-900">{company.contactName}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">Phone:</span>
                                        <span className="text-sm text-gray-900">{company.contactPhone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Registration Details */}
                            <div className="bg-gray-100 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Registration Details</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">GSTIN:</span>
                                        <span className="text-sm text-gray-900">{company.gstin || '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">PAN:</span>
                                        <span className="text-sm text-gray-900">{company.pan || '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-20">CIN:</span>
                                        <span className="text-sm text-gray-900">{company.cin || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="bg-gray-100 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4">Timeline</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-28">Created At:</span>
                                        <span className="text-sm text-gray-900">
                                            {company.created_at
                                                ? new Date(company.created_at).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 w-28">Last Updated:</span>
                                        <span className="text-sm text-gray-900">
                                            {company.updated_at
                                                ? new Date(company.updated_at).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                                : '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}