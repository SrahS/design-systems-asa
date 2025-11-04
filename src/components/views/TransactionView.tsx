"use client";

import { TransactionList } from '@/components/dashboard/TransactionList';
import { mockTransactions } from '@/data/mockData';
import { Search, Filter } from 'lucide-react';

export function TransactionsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Search className="w-4 h-4" />
            Search
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Period</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>All types</option>
              <option>Deposit</option>
              <option>Withdrawal</option>
              <option>Transfer</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>All status</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Amount</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>Any amount</option>
              <option>$0 - $100</option>
              <option>$100 - $1,000</option>
              <option>$1,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>
        <TransactionList transactions={mockTransactions} />
      </div>
    </div>
  );
}
