import React, { FormEventHandler } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Setting } from '@/types';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

function Form({ setting, mode = 'create' }: { setting: Setting, mode: string }) {

  const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
    setting_name: setting?.setting_name,
    setting_type: setting?.setting_type ?? 'img_url',
    setting_value: setting?.setting_value
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (mode == 'edit') {
      patch(route('settings.update', { setting: setting }));
    } else {
      post(route('settings.store'));
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
                  <InputLabel htmlFor="name" value="Setting Name" />
                  <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.setting_name as string}
                    onChange={(e) => setData('setting_name', e.target.value)}
                    required
                    isFocused
                    autoComplete="name"
                  />
                  <InputError className="mt-2" message={errors.setting_name} />
                </div>

                <div>
                  <InputLabel htmlFor="setting_type" value="Setting Type" />

                  <select id="type" defaultValue={data.setting_type} name="setting_type" onChange={e => setData('setting_type', `${e.target.value}`)}>
                    {['img_url', 'upload', 'text', 'boolean'].map(item => (
                      <option value={item} selected={data.setting_type == item}>{item}</option>
                    ))}
                  </select>
                  <InputError className="mt-2" message={errors.setting_type} />
                </div>

                <div>
                  <InputLabel htmlFor="setting_value" value="Setting Value" />
                  <TextInput
                    id="setting_value"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.setting_value as string}
                    onChange={(e) => setData('setting_value', e.target.value)}
                    required
                    autoComplete="setting_value"
                  />
                  <InputError className="mt-2" message={errors.setting_value} />
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