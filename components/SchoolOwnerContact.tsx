"use client";

import { Mail, Phone } from "lucide-react";

interface Props {
    name?: string;
    email: string;
    phone: string | null;
    portfolio?: string;
}

export default function SchoolOwnerContactDetails({ name, email, phone, portfolio }: Props) {
    return (
        <div className="bg-white shadow rounded-xl p-6">
            <div className="">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    { portfolio ? `Contact ${portfolio}` : "School Owner Contact" }
                </h3>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        { name ?? `${name}` }
                    </h3>
                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 bg-green-50 text-green-600 rounded-xl">
                            <Mail className="w-4 h-4 text-green-600" />
                        </div>
                        <a
                        href={`mailto:${email}`}
                        className="text-gray-700 hover:text-green-600 hover:underline break-all"
                        >
                        {email}
                        </a>
                    </div>

                    {/* Phone */}
                    {phone && (
                        <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 bg-green-50 text-green-600 rounded-xl">
                            <Phone className="w-4 h-4" />
                        </div>
                        <a
                            href={`tel:${phone}`}
                            className="text-gray-700 hover:text-green-600 hover:underline"
                        >
                            {phone}
                        </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
