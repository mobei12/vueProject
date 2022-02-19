import { PersistentStore, Store } from './main'
export const STORE_NAME = 'MAIN_STORE'
interface STORE extends Object {
	title: string
}

class MainStore extends PersistentStore<STORE> {
	protected data(): STORE {
		return {
			title: ''
		}
	}
	/**
	 * @description  修改标题
	 * @param {string} newValue - 标题
	 */
	editTitle(newValue: string) {
		this.state.title = newValue
	}
}

export const mainStore = new MainStore(STORE_NAME)
