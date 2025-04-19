import { PropRules } from '../dict';
import type { PropRule } from '../types';
import { request } from '/@/cool/service/request';

// 获取匹配规则
export async function getRules() {
	const res: string = await request({
		url: '/dev/app/base/comm/param',
		params: {
			key: 'epsFieldType'
		}
	});

	const eps: { components: PropRule[] } = JSON.parse( res );

	const arr = eps!.components.map(e => {
		return {
			...e,
			...e.render
		};
	});

	PropRules.unshift(...arr);
}
