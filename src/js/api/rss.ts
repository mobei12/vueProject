import Axios from './http'
import { HttpResponse } from './types'

export class Rss {
	static async getList(url: string): Promise<HttpResponse> {
		return Axios(`/api/rss/getFeedListByURL?url=${url}`, {
			method: 'get',
			responseType: 'json'
		}).then(response => {
			return response
		})
	}
}
