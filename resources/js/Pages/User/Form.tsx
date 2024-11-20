import React, { FormEventHandler } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { User } from '@/types';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { toLocalDatetime } from '@/utils/date';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import ConditionalRender from '@/Components/ConditionalRender';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';

function Form({ user, mode = 'create' }: { user: User, mode: string }) {

  const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
    name: user?.name,
    email: user?.email,
    email_verified_at: user?.email_verified_at,
    password: '',
    password_confirmation: ''
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (mode == 'edit') {
      patch(route('users.update', { user: user }));
    } else {
      post(route('users.store'));
    }

  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Form {mode} User
        </h2>
      }
    >
      <Head title="Form User" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                <div>
                  <InputLabel htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name as string}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                  />
                  <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                  <InputLabel htmlFor="user_email" value="Email" />
                  <TextInput
                    id="user_email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email as string}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                  />
                  <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                  <InputLabel htmlFor="email_verified_at" value="Email Verified At" />
                  <TextInput
                    id="email_verified_at"
                    type="datetime-local"
                    className="mt-1 block w-full"
                    value={toLocalDatetime(data.email_verified_at)}
                    onChange={(e) => setData('email_verified_at', e.target.value)}
                    required
                    autoComplete="date"
                  />
                  <InputError className="mt-2" message={errors.email_verified_at} />
                </div>

                <ConditionalRender condition={mode == 'create'}>

                  <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="mt-1 block w-full"
                      autoComplete="new-password"
                      onChange={(e) => setData('password', e.target.value)}
                      required
                    />

                    <InputError message={errors.password} className="mt-2" />
                  </div>
                </ConditionalRender>

                <ConditionalRender condition={mode == 'create'}>
                  <div className="mt-4">
                    <InputLabel
                      htmlFor="password_confirmation"
                      value="Confirm Password"
                    />

                    <TextInput
                      id="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      value={data.password_confirmation}
                      className="mt-1 block w-full"
                      autoComplete="new-password"
                      onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                      }
                      required
                    />

                    <InputError
                      message={errors.password_confirmation}
                      className="mt-2"
                    />
                  </div>
                </ConditionalRender>


                <div className="flex items-center gap-4">
                  <PrimaryButton disabled={processing}>Save</PrimaryButton>
                  <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                  >
                    <p className="text-sm text-gray-600">Saved.</p>
                  </Transition>
                </div>

              </form>

              <br />

              <hr />

              <ConditionalRender condition={mode == 'edit'}>
                <UpdatePasswordForm className="max-w-xl mt-5" />
              </ConditionalRender>

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Form