import Axios from "./http";
import { HttpResponse } from "./types";
/**
 * @interface loginParams -登录参数
 * @property {string} username -用户名
 * @property {string} password -用户密码
 */
interface LoginParams {
	username: string;
	password: string;
}
//封装User类型的接口方法
export class UserService {
	/**
	 * @description 查询User的信息
	 * @param {number} teamId - 所要查询的团队ID
	 * @return {HttpResponse} result
	 */
	static async login(params: LoginParams): Promise<HttpResponse> {
		return Axios("/api/user/login", {
			method: "get",
			responseType: "json",
			params: {
				...params
			}
		}).then(response => {
			return response;
		});
	}

	static async resgister(params: LoginParams): Promise<HttpResponse> {
		return Axios("/api/user/register", {
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
