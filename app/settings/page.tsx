'use client';

import { useState } from 'react';
import CurrencySettingsDialog from '../components/settings/CurrencySettingsDialog';

export default function SettingsPage() {
  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">Settings</h2>
        
        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            onClick={() => setIsCurrencyDialogOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900">Currency Settings</h3>
                <p className="text-sm text-slate-500 mt-1">Configure your preferred currency display</p>
              </div>
              <span className="text-slate-400">→</span>
            </div>
          </div>
        </div>
      </div>

      <CurrencySettingsDialog
        isOpen={isCurrencyDialogOpen}
        onClose={() => setIsCurrencyDialogOpen(false)}
      />
    </div>
  );
} 