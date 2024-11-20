import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Menu, Setting, } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react'

function DeleteSetting({ className, item, onComplete }: { className?: string, item?: Setting, onComplete: () => void }) {

  const { data, delete: destroy, reset, processing, setData, errors, recentlySuccessful, wasSuccessful } = useForm<{ name?: string }>({
    name: item?.setting_name
  });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    if (item != undefined) {
      destroy(route('settings.destroy', { setting: item.id }), {
        preserveScroll: true,
        onSuccess: () => reset(),
        onError: (errors) => {
          console.log(errors)
        },
      });
    }
  };

  useEffect(() => {
    if (wasSuccessful) {
      if (typeof onComplete == 'function') {
        onComplete();
      }
    }
  }, [wasSuccessful])

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Setting</h2>
        <p className="mt-1 text-sm text-gray-600">
          Are you sure want to delete this setting? {data.name}
        </p>
      </header>
      <form onSubmit={deleteUser} className="mt-6 space-y-6">

        <div>
          <InputLabel htmlFor="image" value="Setting" />
          <TextInput
            id="image"
            type="text"
            name="title"
            value={data.name}
            className="my-2 block w-full"
            autoComplete="menu"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Delete</PrimaryButton>
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
    </section>
  )
}

export default DeleteSetting