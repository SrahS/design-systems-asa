"use client";

import { useState } from "react";
import { Plus } from "lucide-react";


import { Transaction } from "@/types";
import { TransactionList } from "../dashboard/TransactionTypeCharts";
import { TransactionModal } from "../modals/TransactionModal";

export const TransactionsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mockTransactions = [
        {
            id: 1,
            name: "Mercadinho da Esquina",
            amount: -150.50,
            type: "Despesa",
            date: "2026-05-20",
            reference: "REF-001"
        },
        {
            id: 2,
            name: "Aposentadoria",
            amount: 3200.00,
            type: "Receita",
            date: "2026-05-05",
            reference: "REF-002"
        }
    ] as unknown as Transaction[];

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto focus:outline-none" tabIndex={-1}>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Suas Transações
                    </h2>
                    <p className="mt-1 text-lg text-gray-600">
                        Acompanhe todas as suas entradas e saídas.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
            inline-flex min-h-[56px] items-center justify-center gap-2 
            rounded-xl bg-primary px-6 text-lg font-bold text-white shadow-md 
            transition-colors hover:bg-primary-hover focus:ring-4 focus:ring-primary/40
          "
                    aria-label="Adicionar nova transação"
                >
                    <Plus className="h-6 w-6" aria-hidden="true" />
                    Nova Transação
                </button>
            </div>

            <section aria-label="Lista de transações">
                <TransactionList
                    transactions={mockTransactions}
                    onEdit={(t) => console.log("Editar transação:", t)}
                    onDelete={(id) => console.log("Excluir transação:", id)}
                    onViewDetails={(t) => console.log("Ver detalhes:", t)}
                />
            </section>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </main>
    );
};