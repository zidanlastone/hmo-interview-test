import Modal from '@/Components/Modal';
import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminDeleteUserForm from './AdminDeleteUserForm';

export default function List({ users }: { users: User[] }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: User, show: boolean }>({ item: undefined, show: false });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <NavLink href={route('users.create')} active={false}>Create New Item</NavLink>
                            <table
                                className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                <thead
                                    className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Login Status</th>
                                        <th scope="col" className="px-6 py-4">Login Time</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(item => (
                                        <tr className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.login_status}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.is_logged_in}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <ResponsiveNavLink href={route('users.edit', { user: item.id })}> Edit</ResponsiveNavLink>
                                                <button type="button" className="px-3 py-1 mr-1 bg-red-500 rounded-md text-white" onClick={() => setShowDeleteDialog({ item: item, show: true })}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDeleteDialog.show} onClose={() => setShowDeleteDialog({ item: undefined, show: false })}>
                <AdminDeleteUserForm user={showDeleteDialog.item} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg" onComplete={() => setShowDeleteDialog({ item: undefined, show: false })} />
            </Modal>
        </AuthenticatedLayout >
    );
}
