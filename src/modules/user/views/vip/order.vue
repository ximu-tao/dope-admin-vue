<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="搜索关键字" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="user-vip-order" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { reactive } from "vue";

const { service } = useCool();

// 选项
const options = reactive({
	payStatus: [
		{ label: "待支付", value: 1, type: "success" },
		{ label: "已支付", value: 2, type: "danger" }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "价格",
			prop: "price",
			hook: "number",
			component: { name: "el-input-number" },
			required: true
		},
		{
			label: "商品标题",
			prop: "title",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "支付渠道",
			prop: "payWay",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "支付流水号",
			prop: "outTradeNo",
			component: { name: "el-input", props: { clearable: true } }
		},
		{
			label: "支付状态",
			prop: "payStatus",
			component: { name: "el-radio-group", options: options.payStatus },
			value: 1,
			required: true
		},
		{
			label: "开通的会员ID",
			prop: "vipId",
			component: {
				name: "remote-select",
				props: { namespace: "admin/user/vip/info", multiple: false, field: "title" }
			},
			required: true
		},
		{
			label: "客户端类型",
			prop: "terminal",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		},
		{
			label: "开通时长（天）",
			prop: "day",
			component: {
				name: "el-date-picker",
				props: { type: "date", valueFormat: "YYYY-MM-DD" }
			}
		},
		{
			label: "用户ID",
			prop: "userId",
			component: { name: "el-input", props: { clearable: true } },
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "价格", prop: "price", minWidth: 140 },
		{ label: "商品标题", prop: "title", minWidth: 140 },
		{ label: "支付渠道", prop: "payWay", minWidth: 140 },
		{ label: "支付流水号", prop: "outTradeNo", minWidth: 140 },
		{ label: "支付状态", prop: "payStatus", dict: options.payStatus, minWidth: 120 },
		{ label: "开通的会员ID", prop: "vipId" },
		{ label: "客户端类型", prop: "terminal", minWidth: 140 },
		{
			label: "开通时长（天）",
			prop: "day",
			minWidth: 140,
			sortable: "custom",
			component: { name: "cl-date-text" }
		},
		{ label: "用户ID", prop: "userId", minWidth: 140 },
		{
			label: "创建时间",
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" }
		},
		{
			label: "更新时间",
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" }
		},
		{ type: "op", buttons: ["info", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.user.vip.order
	},
	(app) => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
