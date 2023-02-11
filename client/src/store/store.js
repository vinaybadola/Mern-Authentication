import {create} from 'zustand';  // To store a variable in central store to use it anywhere

/**Creating Hooks */
export const useAuthStore = create((set)=>({
     auth:{
        username: '',
        active:false
     },
     // setUsername is type of action as same as in Redux
     setUsername : (name) => set((state) =>({auth : {...state.auth, username : name}}))
}))

