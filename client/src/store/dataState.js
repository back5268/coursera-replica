import { create } from 'zustand';

const useDataState = create((set, get) => ({
  courses: [],
  users: [],
  setUsers: (users) => set({ users }),
  setCourses: (courses) => set({ courses })
}));

const getDataState = () => useDataState.getState();
export { useDataState, getDataState };