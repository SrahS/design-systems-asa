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
    border-color-neutral-300-on-light dark:border-color-neutral-700-on-dark
    bg-white dark:bg-primary-neutral-950-on-dark
    text-neutral-900-on-light dark:text-neutral-100-on-dark
    focus:ring-2 focus:ring-color-primary-500-on-light dark:focus:ring-color-primary-dark-500-on-dark focus:border-transparent
    placeholder:text-neutral-500-on-light dark:placeholder:text-neutral-600-on-dark
  `;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="
        rounded-lg shadow-xl max-w-md w-full mx-4
        bg-white dark:bg-primary-neutral-950-on-dark
      ">
        
        {/* Header */}
        <div className="
          flex items-center justify-between border-b p-6
          border-color-neutral-200-on-light dark:border-color-neutral-900-on-dark
        ">
          <h2 className="
            text-xl font-bold 
            text-neutral-900-on-light dark:text-neutral-100-on-dark
          ">
            {isEditing ? 'Editar Transação' : 'Nova Transação'}
          </h2>
          <button
            onClick={onClose}
            className="
              text-neutral-500-on-light dark:text-neutral-400-on-dark
              hover:text-neutral-700-on-light dark:hover:text-neutral-200-on-dark
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Campo: Tipo de Transação */}
          <div>
            <label className="
              block text-sm font-family-sans mb-2
              text-neutral-700-on-light dark:text-neutral-300-on-dark
            ">
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

          {/* Campo: Descrição */}
          <div>
            <label className="
              block text-sm font-family-sans mb-2
              text-neutral-700-on-light dark:text-neutral-300-on-dark
            ">
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

          {/* Campo: Valor */}
          <div>
            <label className="
              block text-sm font-family-sans mb-2
              text-neutral-700-on-light dark:text-neutral-300-on-dark
            ">
              Valor
            </label>
            <div className="relative">
              <span className="
                absolute left-3 top-2 
                text-neutral-500-on-light dark:text-neutral-600-on-dark
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

          {/* Campo: Data */}
          <div>
            <label className="
              block text-sm font-family-sans mb-2
              text-neutral-700-on-light dark:text-neutral-300-on-dark
            ">
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

          {/* Campo: Detalhes Adicionais (opcional) */}
          <div>
            <label className="
              block text-sm font-family-sans mb-2
              text-neutral-700-on-light dark:text-neutral-300-on-dark
            ">
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
                border border-color-neutral-300-on-light dark:border-color-neutral-700-on-dark
                text-neutral-700-on-light dark:text-neutral-300-on-dark
                hover:bg-primary-neutral-50-on-light dark:hover:bg-primary-neutral-900-on-dark
              "
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-primary-600-on-light text-white rounded-lg hover:bg-primary-primary-700-on-light font-medium"
            >
              {isEditing ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
