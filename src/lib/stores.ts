import type { Definitions } from "@/types/article-search"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  // loading: boolean
  coins: number
  tickets: number
  purchasedArticles: Definitions["Article"][]
}

type Actions = {
  // Pass a negative amount to subtract
  updateCoins: (amount: number) => void
  updateTickets: (amount: number) => void
  addPurchasedArticles: (article: Definitions["Article"]) => void
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      // Initial state
      loading: true,
      coins: 100000,
      tickets: 0,
      purchasedArticles: [],

      // Actions
      updateCoins: (amount) =>
        set((state) => ({ coins: state.coins + amount })),
      updateTickets: (amount) =>
        set((state) => ({ tickets: state.tickets + amount })),
      addPurchasedArticles: (article) =>
        set((state) => ({
          purchasedArticles: [article, ...state.purchasedArticles],
        })),
    }),
    // Persist some state in localStorage
    {
      name: "userStorage",
      partialize: ({ coins, tickets, purchasedArticles }) => ({
        coins,
        tickets,
        purchasedArticles,
      }),
    },
  ),
)
