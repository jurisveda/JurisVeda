import { create } from 'zustand'
import { getLawNotebyId } from '../actions/db'

interface StoreType {
    content: string;
    setContent: (content: string) => void;
    getContentFromDB: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

interface EditorContentStore {
  content: string;
  setContent: (content: string) => void;
}

interface SubscriptionState {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

interface LoadingState{
  loading: boolean;
  setLoading: (value:boolean) => void
}


const useEditNoteStore = create<EditorContentStore>((set,get)=>({
    content: '',
    setContent: (content:string) => {set({content})}
}))

const useAddNoteStore = create<EditorContentStore>((set,get)=>({
    content: '',
    setContent: (content:string) => {set({content})}
}))

const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}))   

const useLoadingStore = create<LoadingState>((set)=>({
  loading: true,
  setLoading : (value) => set(()=>({loading: value}))
}))


// const useLawnotesStore = create<StoreType>((set, get) => ({
//     content: '',
//     loading: false,
//     error: null,
    
//     setContent: (content: string) => {
//         set({ content });
//     },
    
//     getContentFromDB: async (id: string) => {
//         try {
//             set({ loading: true, error: null });
//             const res = await getLawNotebyId(id);
//             set({ content: res?.content, loading: false });
//         } catch (error) {
//             set({ 
//                 error: error instanceof Error ? error.message : 'Failed to fetch content',
//                 loading: false 
//             });
//         }
//     }
// }));


export { useAddNoteStore,useEditNoteStore,useSubscriptionStore,useLoadingStore };
