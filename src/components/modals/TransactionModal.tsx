"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Transaction, transactionType, transactionTypes } from '@/types';
import { useTransactions } from '@/contexts/TransactionContext';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'Depósito' as transactionType,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        name: transaction.name,
        amount: Math.abs(transaction.amount).toString(),
        type: transaction.type,
        description: transaction.description || '',
        date: transaction.date,
      });
    } else {
      setFormData({
        name: '',
        amount: '',
        type: transactionTypes.Deposit,
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount =
      formData.type === transactionTypes.Deposit
        ? parseFloat(formData.amount)
        : -parseFloat(formData.amount);

    if (transaction) {
      updateTransaction(transaction.id, {
        name: formData.name,
        amount,
        type: formData.type,
        description: formData.description,
        date: formData.date,
      });
    } else {
      addTransaction({
        name: formData.name,
        amount,
        type: formData.type,
        description: formData.description,
        date: formData.date,
        reference: 'Ref',
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!transaction;

  const inputClassNames = `
    w-full border rounded-lg px-3 py-2
    border-neutral-300-on-light
    bg-white
    text-neutral-900-on-light
    placeholder:text-neutral-500-on-light
  `;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="
        rounded-lg shadow-xl max-w-md w-full mx-4
        bg-white
      ">
        
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-900-on-light hover:text-neutral-700-on-light">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-family-sans mb-2">
              Tipo de Transação
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputClassNames}
            >
              <option value={transactionTypes.Deposit}>Depósito</option>
              <option value={transactionTypes.Withdrawal}>Saque</option>
              <option value={transactionTypes.Transfer}>Transferência</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-family-sans mb-2">
              Descrição
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ex: Salário, Compras de Supermercado"
              className={inputClassNames}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-family-sans mb-2">
              Valor
            </label>
            <div className="relative">
              <span className="
                absolute left-3 top-2 
                text-neutral-500-on-light
              ">
                R$
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className={`${inputClassNames} pl-9`}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-family-sans mb-2">
              Data
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputClassNames}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-family-sans mb-2">
              Detalhes Adicionais (opcional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange as any}
              placeholder="Adicione quaisquer notas adicionais..."
              rows={3}
              className={inputClassNames}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 px-4 py-2 rounded-lg font-family-sans font-medium transition-colors
                border border-neutral-300-on-light
                text-neutral-700-on-light
                hover:bg-neutral-200-on-light
              "
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-900-on-light text-white rounded-lg hover:bg-primary-800-on-light font-medium"
            >
              {isEditing ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
