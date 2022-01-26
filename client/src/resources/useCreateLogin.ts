
import axios from 'axios';
import { useMutation } from 'react-query'
import { login } from '.././utils/auth';
import Constants from '../constants/constants';

export const useCreateLogin = () => {
	let permission = ''
	return useMutation((values: any) => {
		return axios.post(`${Constants.apiPath}api/auth/`, values)
	}, {
		onSuccess: (data:any) => {
			
			const role = data.data.role;
			const name = data.data.name;
			login({ "token": data.data.token, "role": data.data.role, "user_id": data.data._id, "name": name, "permission": permission });
		},
		onError: () => {
			console.log('erorr')
		}
	})
}