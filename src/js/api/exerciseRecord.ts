import Axios from "./http";
import { HttpResponse } from "./types";

interface Params {
	user_id: String; //用户id
	duration: Number; //运动用时,秒
	number_of_times: Number; //运动分的次数
	number_of_breaks: Number; //休息的次数
	single_time: Number; //单次休息的时间s秒
	exercise_type: String; //运动类型
}
//封装ExerciseRecord类型的接口方法
export class ExerciseRecord {
	/**
	 * @return {HttpResponse} result
	 */
	static async save(params: Params): Promise<HttpResponse> {
		return Axios("/api/exerciseRecord/saveRecord", {
			method: "get",
			responseType: "json",
			params: {
				...params
			}
		}).then(response => {
			return response;
		});
	}
	static async find(params: { user_id: string }): Promise<HttpResponse> {
		return Axios("/api/exerciseRecord/find", {
			method: "get",
			responseType: "json",
			params: {
				...params
			}
		}).then(response => {
			return response;
		});
	}
}
