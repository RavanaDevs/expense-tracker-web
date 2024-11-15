'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CURRENCY } from '@/app/constants';
import { CurrencyPosition } from '@/app/types';

interface CurrencySettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CurrencySettingsDialog({ isOpen, onClose }: CurrencySettingsDialogProps) {
  const [settings, setSettings] = useState({
    symbol: CURRENCY.symbol,
    code: CURRENCY.code,
    position: CURRENCY.position,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update currency settings in your app state/storage
    console.log('New currency settings:', settings);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="bg-slate-50 px-6 py-4 border-b border-slate-200"
                >
                  <h3 className="text-lg font-medium text-slate-900">
                    Currency Settings
                  </h3>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency Symbol
                    </label>
                    <input
                      type="text"
                      value={settings.symbol}
                      onChange={(e) => setSettings({ ...settings, symbol: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                      placeholder="$, €, ¥"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency Code
                    </label>
                    <input
                      type="text"
                      value={settings.code}
                      onChange={(e) => setSettings({ ...settings, code: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                      placeholder="USD, EUR, JPY"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Symbol Position
                    </label>
                    <select
                      value={settings.position}
                      onChange={(e) => setSettings({ ...settings, position: e.target.value as CurrencyPosition })}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                    >
                      <option value="before">Before amount ($100)</option>
                      <option value="after">After amount (100$)</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 