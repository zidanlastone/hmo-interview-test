import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Menu, } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react'

function DeleteMenu({ className, item, onComplete }: { className?: string, item?: Menu, onComplete: () => void }) {

  const { data, delete: destroy, reset, processing, setData, errors, recentlySuccessful, wasSuccessful } = useForm<{ name?: string }>({
    name: item?.name
  });

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    if (item != undefined) {
      destroy(route('menus.destroy', { menu: item.id }), {
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
        <h2 className="text-lg font-medium text-gray-900">Menu</h2>
        <p className="mt-1 text-sm text-gray-600">
          Are you sure want to delete this menu? {data.name}
        </p>
      </header>
      <form onSubmit={deleteUser} className="mt-6 space-y-6">

        <div>
          <InputLabel htmlFor="image" value="Menu" />
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

export default DeleteMenu