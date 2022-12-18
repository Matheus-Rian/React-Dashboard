import { LocalStorageAdapter } from '@/infra/cache/local-storage';
import { SetStorage } from '@/data/protocols/cache/set-storage';

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter();
