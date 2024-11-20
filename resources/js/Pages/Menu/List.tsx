import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Menu } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteMenu from './DeleteMenu';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function List({ menus }: { menus: Menu[] }) {

  const [showDeleteDialog, setShowDeleteDialog] = useState<{ item?: Menu, show: boolean }>({ item: undefined, show: false });
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Menu
        </h2>
      }
    >
      <Head title="Menu" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <NavLink href={route('menus.create')} active={false}>Create New Item</NavLink>
              <table
                className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead
                  className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Route</th>
                    <th scope="col" className="px-6 py-4">Type</th>
                    <th scope="col" className="px-6 py-4">Try</th>
                    <th scope="col" className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map(item => (
                    <tr className="border-b border-neutral-200 dark:border-white/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.route}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.type}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <NavLink
                          href={item.type == 'name' ? route(item.route) : item.route}
                          active={item.type == 'name' ? route().current(item.route) : false}
                        >
                          {item.name}
                        </NavLink>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <ResponsiveNavLink href={route('menus.edit', { menu: item.id })}> Edit</ResponsiveNavLink>
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
        <DeleteMenu item={showDeleteDialog.item} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg" onComplete={() => setShowDeleteDialog({ item: undefined, show: false })} />
      </Modal>
    </AuthenticatedLayout >
  );
}
