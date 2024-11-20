import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { User } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react'

function AdminDeleteUserForm({ className, user, onComplete }: { className?: string, user?: User, onComplete: () => void }) {

  const emailInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, delete: destroy, reset, processing, progress, recentlySuccessful, wasSuccessful } = useForm({
    email: user?.email || '',
    email_confirmation: '',
  });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    if (user != undefined) {
      destroy(route('users.destroy', { user: user.id }), {
        preserveScroll: true,
        onSuccess: () => reset(),
        onError: (errors) => {
          if (errors.email) {
            reset('email', 'email_confirmation');
            emailInput.current?.focus();
          }
        },
      });
    }
  };

  useEffect(() => {
    if (wasSuccessful) {
      if (typeof onComplete == 'function') {
        setTimeout(onComplete, 2000)
      }
    }
  }, [wasSuccessful])


  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete User</h2>

        <p className="mt-1 text-sm text-gray-600">
          Apakah Anda yakin ingin menghapus User ini?
        </p>

      </header>
      <form onSubmit={deleteUser} className="mt-6 space-y-6">

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e) => setData('email', e.target.value)}
            required
            disabled
          />
          <InputError message={errors.email} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email Confirmation" />
          <TextInput
            id="email"
            type="email"
            name="email_confirmation"
            value={data.email_confirmation}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e) => setData('email_confirmation', e.target.value)}
            required
          />
          <InputError message={errors.email_confirmation} className="mt-2" />
        </div>
        <div className="flex items-center gap-4">
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
          <PrimaryButton disabled={processing}>Delete</PrimaryButton>
        </div>
      </form>
    </section>
  )
}

export default AdminDeleteUserForm