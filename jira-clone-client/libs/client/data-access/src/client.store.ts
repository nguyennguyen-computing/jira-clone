import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface ClientState {
  loading: boolean;
}

const initialState: ClientState = {
  loading: false,
};

export const ClientStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    return {
      setLoading: (loading: boolean) => {
        patchState(store, { loading });
      },
    };
  })
);
