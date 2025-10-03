"use client";

import { useEffect, useState } from "react";

interface School {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    schoolName: string;
    schoolAddress: string;
    portfolio: string;
    zone: string;
    createdAt: string;
}

export default function SchoolsPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
        try {
            const res = await fetch("/api/schools");
            const data = await res.json();

            if (data.success) {
            setSchools(data.schools);
            }
        } catch (error) {
            console.error("Error fetching schools:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchSchools();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Registered Schools
            </h1>

            {loading ? (
                <p>Loading schools...</p>
            ) : schools.length === 0 ? (
                <p className="text-gray-500">No schools registered yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead>
                        <tr className="bg-green-700 text-white">
                            <th className="px-4 py-2 text-left">School Name</th>
                            <th className="px-4 py-2 text-left">Proprietor</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Phone</th>
                            <th className="px-4 py-2 text-left">Zone</th>
                            <th className="px-4 py-2 text-left">Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {schools.map((school) => (
                            <tr key={school.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{school.schoolName}</td>
                            <td className="px-4 py-2">
                                {school.firstName} {school.lastName} (
                                {school.portfolio})
                            </td>
                            <td className="px-4 py-2">{school.email}</td>
                            <td className="px-4 py-2">{school.phone}</td>
                            <td className="px-4 py-2">{school.zone}</td>
                            <td className="px-4 py-2">
                                {new Date(school.createdAt).toLocaleDateString()}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
