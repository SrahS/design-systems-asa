"use client";

import { TransactionList } from "@/components/dashboard/TransactionList";
import { Search, Filter, Plus, X } from "lucide-react";
import { useTransactions } from "@/store/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransactionModal } from "@/components/modals/TransactionModal";
import { TransactionDetailsModal } from "@/components/modals/TransactionDetailsModal";
import { Transaction } from "@/types";


const PAGE_SIZE = 10;
const LOADING_MS = 600;


function LoadingRow() {
  return (
    <div className="mt-3 flex items-center justify-center gap-3 text-neutral-700-on-light">
      <div
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent"
        role="status"
        aria-label="Carregando"
      />
      <span className="text-xs font-medium">Carregando mais transações...</span>
    </div>
  );
}


type TypeFilter = "Todos" | "Deposito" | "Transferência" | "Saque";


export function TransactionsView() {
  const { 
    transactions, 
    deleteTransaction,
    fetchTransactions,
    loading: isInitialLoading,
    error 
  } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);


  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);


  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("Todos");


  const filteredTransactions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return transactions.filter((t) => {
      const matchesType = typeFilter === "Todos" ? true : t.type === typeFilter;

      if (!q) return matchesType;

      const haystack = [
        t.name,
        t.reference,
        t.description ?? "",
        t.type,
        t.date,
        String(t.amount),
        String(t.id),
      ]
        .join(" ")
        .toLowerCase();

      return matchesType && haystack.includes(q);
    });
  }, [transactions, searchTerm, typeFilter]);


  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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
        if (!entry.isIntersecting) return;
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        window.setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredTransactions.length));
          setIsLoadingMore(false);
        }, LOADING_MS);
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

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

  // Handler para deletar com confirmação
  const handleDeleteTransaction = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta transação?')) {
      await deleteTransaction(id);
    }
  };

  const clearSearch = () => setSearchTerm("");
  const resetFilters = () => {
    setTypeFilter("Todos");
    setSearchTerm("");
  };

  // Mostrar erro se houver
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-1200-on-light">
            Todas as Transações
          </h1>
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

        <div className="flex items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            Erro ao carregar transações: {error}
          </p>
        </div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-1200-on-light">
            Todas as Transações
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setShowSearch((v) => !v)}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                border border-color-neutral-300-on-light hover:bg-neutral-200-on-light
                text-neutral-900-on-light
              "
            >
              <Search className="w-4 h-4 text-neutral-700-on-light" />
              Pesquisar
            </button>

            <button
              onClick={() => setShowFilters((v) => !v)}
              className="
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                border border-color-neutral-300-on-light hover:bg-neutral-200-on-light
                text-neutral-900-on-light
              "
            >
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

        {(showSearch || showFilters) && (
          <div className="rounded-lg p-4 bg-white border border-neutral-200-on-light space-y-3">
            {showSearch && (
              <div className="flex items-center gap-3">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, referência, descrição, valor..."
                    className="
                      w-full pl-9 pr-9 py-2 rounded-lg text-sm
                      border border-neutral-200-on-light
                      focus:outline-none focus:ring-2 focus:ring-primary-200-on-light
                    "
                  />
                  {searchTerm ? (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-neutral-200-on-light"
                      aria-label="Limpar busca"
                    >
                      <X className="w-4 h-4 text-neutral-600-on-light" />
                    </button>
                  ) : null}
                </div>
              </div>
            )}

            {showFilters && (
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-neutral-700-on-light">Tipo</span>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                    className="
                      px-3 py-2 rounded-lg text-sm bg-white
                      border border-neutral-200-on-light
                      focus:outline-none focus:ring-2 focus:ring-primary-200-on-light
                    "
                  >
                    <option value="Todos">Todos</option>
                    <option value="Deposito">Depósito</option>
                    <option value="Transferência">Transferência</option>
                    <option value="Saque">Saque</option>
                  </select>
                </div>

                <button
                  onClick={resetFilters}
                  className="
                    md:ml-auto px-3 py-2 rounded-lg text-sm font-medium
                    border border-color-neutral-300-on-light
                    hover:bg-neutral-200-on-light text-neutral-900-on-light
                  "
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg p-6 bg-white border border-neutral-200-on-light">
          <h2 className="text-lg font-semibold mb-4 text-neutral-900-on-light">
            Histórico de Transações ({filteredTransactions.length})
          </h2>

          {/* Loading state ao buscar pela primeira vez */}
          {isInitialLoading && transactions.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-current border-r-transparent"
                  role="status"
                />
                <span className="text-sm text-neutral-600-on-light">
                  Carregando transações...
                </span>
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-center py-8 text-neutral-600-on-light">
              Nenhuma transação encontrada. Comece adicionando uma!
            </p>
          ) : (
            <>
              <TransactionList
                transactions={visibleTransactions}
                onEdit={handleEdit}
                onDelete={handleDeleteTransaction}
                onViewDetails={handleViewDetails}
              />

              <div ref={sentinelRef} className="h-6" />

              {hasMore && isLoadingMore ? <LoadingRow /> : null}

              {!hasMore && filteredTransactions.length > 0 ? (
                <p className="mt-3 text-xs text-neutral-600-on-light">
                  Você chegou ao fim da lista.
                </p>
              ) : null}

              {filteredTransactions.length === 0 && (searchTerm || typeFilter !== "Todos") ? (
                <p className="mt-3 text-xs text-neutral-600-on-light">
                  Nenhuma transação encontrada com os filtros atuais.
                </p>
              ) : null}
            </>
          )}
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
