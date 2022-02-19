import { reactive, readonly } from 'vue'

export const createStore = () => {
	const stateStore: { title: string; showLeft: boolean } = reactive({
		title: '主页', //页面标题
		showLeft: false //是否显示返回按钮
	})
	/**
	 * @description 修改标题的方法
	 * @param newVal
	 */
	const editTile = (newVal: string) => {
		stateStore.title = newVal
	}
	/**
	 * @description 修改展示返回按钮的方法
	 * @param newVal
	 */
	const editLeft = (newVal: boolean) => {
		stateStore.showLeft = newVal
	}

	return { increment: editTile, editLeft, stateStore: readonly(stateStore) }
}
