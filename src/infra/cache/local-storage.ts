import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdapter implements SetStorage {
	set (key: string, value: Record<string, unknown>): void {
		localStorage.setItem(key, JSON.stringify(value));
	}
}
