import { PropRules } from '../dict';
import type { PropRule } from '../types';
import { request } from '/@/cool/service/request';

// 获取匹配规则
export async function getRules() {
	const eps: { components: PropRule[] } = await request({
		url: '/dev/app/base/comm/param',
		params: {
			key: 'epsFieldType'
		}
	});

	const arr = eps!.components.map(e => {
		return {
			...e,
			...e.render
		};
	});

	PropRules.unshift(...arr);
}
