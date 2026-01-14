"use client";

import { TransactionList } from '@/components/dashboard/TransactionList';
import { Search, Filter, Plus } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TransactionModal } from '@/components/modals/TransactionModal';
import { TransactionDetailsModal } from '@/components/modals/TransactionDetailsModal';
import { Transaction } from '@/types';

const PAGE_SIZE = 10;
const LOADING_MS = 600;

function LoadingRow() {
  return (
    <div className="mt-3 flex items-center justify-center gap-3 text-neutral-700-on-light">
      <div
        className="
          inline-block h-5 w-5 animate-spin rounded-full
          border-2 border-current border-r-transparent
        "
        role="status"
        aria-label="Carregando"
      />
      <span className="text-xs font-medium">Carregando mais transações...</span>
    </div>
  );
}

export function TransactionsView() {
  const { transactions, deleteTransaction } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const [filters, setFilters] = useState({
    type: 'Todos os tipos',
    status: 'Todos os status',
  });

  const filteredTransactions = useMemo(() => {
    return transactions;
  }, [transactions]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // novo: controla feedback visual entre páginas
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setIsLoadingMore(false);
  }, [filteredTransactions]);

  const visibleTransactions = useMemo(() => {
    return filteredTransactions.slice(0, visibleCount);
  }, [filteredTransactions, visibleCount]);

  const hasMore = visibleCount < filteredTransactions.length;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // usa isIntersecting pra saber se o sentinela entrou na viewport [web:90]
        if (!entry.isIntersecting) return;
        if (isLoadingMore) return; // evita disparos duplicados

        setIsLoadingMore(true);

        window.setTimeout(() => {
          setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredTransactions.length));
          setIsLoadingMore(false);
        }, LOADING_MS);
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    ); // IntersectionObserver e opções [web:88]

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, filteredTransactions.length, isLoadingMore]);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleNewTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-1200-on-light">
            Todas as Transações
          </h1>

          <div className="flex gap-3">
            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light
              hover:bg-neutral-200-on-light
              text-neutral-900-on-light
            ">
              <Search className="w-4 h-4 text-neutral-700-on-light" />
              Pesquisar
            </button>

            <button className="
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
              border border-color-neutral-300-on-light
              hover:bg-neutral-200-on-light
              text-neutral-900-on-light
            ">
              <Filter className="w-4 h-4 text-neutral-700-on-light" />
              Filtrar
            </button>

            <button
              onClick={handleNewTransaction}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                bg-primary-900-on-light hover:bg-primary-800-on-light text-white
              "
            >
              <Plus className="w-4 h-4" />
              Adicionar Transação
            </button>
          </div>
        </div>

        <div className="rounded-lg p-6 bg-white border border-neutral-200-on-light">
          <h2 className="text-lg font-semibold mb-4 text-neutral-900-on-light">
            Histórico de Transações ({filteredTransactions.length})
          </h2>

          <TransactionList
            transactions={visibleTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            onViewDetails={handleViewDetails}
          />

          <div ref={sentinelRef} className="h-6" />
          {hasMore && isLoadingMore ? <LoadingRow /> : null}
          {!hasMore ? (
            <p className="mt-3 text-xs text-neutral-600-on-light">
              Você chegou ao fim da lista.
            </p>
          ) : null}
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />

      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </>
  );
}
