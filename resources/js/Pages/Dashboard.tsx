import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ userCount, userActive }: { userCount: number, userActive: number }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>

                        <div className="flex flex-row gap-5 justify-center m-10">
                            <div className="bg-blue-500 p-10 text-center rounded-md text-white">
                                <h1 className='text-lg'>{userCount}</h1>
                                Penguna Terdaftar
                            </div>
                            <div className="bg-blue-500 p-10 text-center rounded-md text-white">
                                <h1 className='text-lg'>{userActive}</h1>
                                Penguna Aktif
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
