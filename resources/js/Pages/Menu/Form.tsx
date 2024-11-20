import React, { FormEventHandler } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Menu } from '@/types';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

function Form({ menu, mode = 'create' }: { menu: Menu, mode: string }) {

  const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
    name: menu?.name,
    route: menu?.route,
    type: menu?.type,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (mode == 'edit') {
      patch(route('menus.update', { menu: menu }));
    } else {
      post(route('menus.store'));
    }

  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Form {mode} Menu
        </h2>
      }
    >
      <Head title="Form Menu" />

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
                  <InputLabel htmlFor="route" value="Route" />
                  <TextInput
                    id="route"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.route as string}
                    onChange={(e) => setData('route', e.target.value)}
                    required
                    autoComplete="route"
                  />
                  <InputError className="mt-2" message={errors.route} />
                </div>




                <div>
                  <InputLabel htmlFor="type" value="Type" />

                  <select id="type" name="type" onChange={e => setData('type', `${e.target.value}`)}>
                    {['href', 'name'].map(item => (
                      <option value={item} selected={data.type == item}>{item}</option>
                    ))}
                  </select>
                  <InputError className="mt-2" message={errors.type} />
                </div>

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

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}

export default Form