import { getCatalogs } from "@/services/api";
import { CustomCatalogType } from "@/types/customCatalog";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const imagesCompare: { [key: string]: string } = {
  ["Инди-заряд"]: "/img/playlist03.png",
  ["Танцевальные хиты"]: "/img/playlist02.png",
  ["Плейлист дня"]: "/img/playlist01.png",
};

type CustomCatalogStateType = {
  currentCatalog?: string;
  customCatalogs?: CustomCatalogType[];
};

const initialState: CustomCatalogStateType = {
  currentCatalog: undefined,
  customCatalogs: undefined,
};

export const getCustomCatalogs = createAsyncThunk(
  "customCatalog/getCustomCatalogs",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCatalogs();
      return data.map((playlist) => {
        return {
          ...playlist,
          imagePath: imagesCompare[playlist.name] || "",
        };
      });
    } catch (err) {
      return rejectWithValue("Ошибка получения списка подборки");
    }
  }
);

const customCatalogSlice = createSlice({
  name: "customCatalog",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCustomCatalogs.fulfilled, (state, action) => {
      state.customCatalogs = action.payload;
    });
    builder.addCase(getCustomCatalogs.rejected, (state, action) => {
      state.customCatalogs = [];
      console.error(action.payload);
    });
  },
});

export const customCatalogReducer = customCatalogSlice.reducer;
