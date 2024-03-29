import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { connectUnisat } from './thunks'

const initialState: WallterSliceState = {
  balance: {
    confirmed: 0,
    unconfirmed: 0,
    total: 0
  },
  publicKey: '',
  address: null,
  connected: false,
  network: 'livenet',
  status: 'idle',
  unisatInstalled: false,
  wallterType: undefined
}

export const wallterSlice = createSlice({
  name: 'wallter',
  initialState,
  reducers: {
    handleAccountsChanged:(state,action: PayloadAction<{address:string}>)=>{
      state.address=action.payload.address
    },
    setNetwork:(state,action: PayloadAction<{network:NetworkType}>)=>{
        state.network = action.payload.network 
    },
    disconnect:(state)=>{
      state.connected=false
      state.address = null
    },
    setUnisatInstalled:(state,action: PayloadAction<{unisatInstalled:boolean}>)=>{
      state.unisatInstalled = action.payload.unisatInstalled
    },
    setAddress:(state,action: PayloadAction<{address:string}>)=>{
      state.address = action.payload.address
      state.connected = true
    },
    setPublicKey:(state,action: PayloadAction<{publicKey:string}>)=>{
      state.publicKey = action.payload.publicKey
    },
    setBalance:(state,action: PayloadAction<{balance:any}>)=>{
      state.balance = action.payload.balance
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectUnisat.pending, (state,action) => {
        state.wallterType = action.meta.arg
        state.status = 'loading'
      })
      .addCase(connectUnisat.fulfilled, (state, action) => {
        state.status = 'idle'
        state.wallterType = action.payload.type
        state.connected = !!action.payload.address 
        state.address = action.payload.address
        state.network = action.payload.network
      })
  },
})

export type WallterType = 'unsat' | 'okx' |  undefined
type NetworkType = string 
export interface WallterSliceState {
  balance: {
    confirmed:number,
    unconfirmed:number,
    total:number
  },
  publicKey:string,
  unisatInstalled:boolean
  wallterType:WallterType
  status: 'idle' | 'loading' | 'failed'
  address:string | null,
  connected:boolean,
  network:NetworkType
}
