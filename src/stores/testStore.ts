import axios from 'axios'
import { create } from 'zustand'
import { IsnstanceResult, TestResult } from '~/types'

const defaultValue: TestResult = {
  title: 'Mibre Office',
  dev: {
    front: 13,
    back: 16,
    db: 6,
  },
  test: {
    front: 11,
    back: 15,
    db: 9,
  },
  prod: {
    front: 23,
    back: 25,
    db: 6,
  },
  norm: 60,
}

interface State {
  result: TestResult | null
}

interface Actions {
  getTestResult: (url: string) => Promise<void>
  getMaxSum: () => number
  getSum: (instance: IsnstanceResult) => number
}

const useTestStore = create<State & Actions>((set, get) => ({
  result: defaultValue,
  getTestResult: async (url) =>
    axios.get<TestResult>(url).then((res) => set({ result: res.data })),
  getSum: ({ front, back, db }: IsnstanceResult): number => front + back + db,
  getMaxSum: () => {
    const state = get()
    if (!state.result) return 0
    return Math.max(
      state.getSum(state.result.dev),
      state.getSum(state.result.test),
      state.getSum(state.result.prod),
      state.result.norm
    )
  },
}))

export default useTestStore
