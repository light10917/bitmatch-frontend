/* Instruments */
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk"

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchDetailThunk = createAppAsyncThunk(
  "wallter/connectUnisat",
  async (_,{getState}) => {
  }
)
