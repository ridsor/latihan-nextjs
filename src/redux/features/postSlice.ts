import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

const base_url = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const getPosts = createAsyncThunk("post/getPosts", async () =>
  fetch(base_url).then((res) => res.json())
);

const postEntity = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

const post = createSlice({
  name: "post",
  initialState: postEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        postEntity.setAll(state, action.payload);
      }
    ),
});

export const postSelectors = postEntity.getSelectors<RootState>(
  (state) => state.post
);
export default post.reducer;
