import { useState } from 'react';

export enum PageState {
  DEFAULT = 'DEFAULT',
  LOADING = 'LOADING',
  NETWORK_ERROR = 'NETWORK_ERROR',
  GENERIC_ERROR = 'GENERIC_ERROR',
}

export function usePageState(initialState: PageState = PageState.DEFAULT) {
  const [state, setState] = useState<PageState>(initialState);

  return { state, setState };
}
