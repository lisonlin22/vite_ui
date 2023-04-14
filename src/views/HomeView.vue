
<template>
	<main>
		<STable
			:tableData="data"
			:tableLabel="Label"
			:tableOption="Option"
			:loading="Loading"
			@handle-button-click="HandleButtonClick"
			:pagination="pagination"
			@handle-size-change="HandleSizeChange"
			@handle-page-change="HandlePageChange"
		></STable>
	</main>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	import STable from '../components/table/table.vue'
	// 工单列表
	const Option = {
		index: true, // 是否显示 index
		// index_fixed: "left", // index 列 固定
		// client_page: false
		selection: true, // 行多选
		selection_width: 55, // 行多选列宽度 默认值 55
		// tableHeight: 200,  // 表格行高 默认值
		pagination: true, // 是否分页
		client_page: false, // 服务器分页
		// pagination_type: "client", // client for server   分页类型
		fixed: 'right', // 操作列固定
		width: '180', // 操作列 宽度
		label: '操作', // 操作列 label
		options: [
			// 操作列按钮
			{
				label: 'Binlog 清理', // 按钮名称
				type: 'danger', // 样式 primary | success | danger | waring | info
				icon: 'el-icon-delete', // icon
				methods: 'binlog', // 操作方法 传递入参
				confirmBtn: false, // 确认框按钮
				perms: ['sql.change_project'], // 权限判断 默认 remove
				render: (row: any): any => {
					// render 渲染 | 根据行数据 返回按钮名称
					if (row.db_type === 'mysql') {
						return 'Binlog 清理'
					} else {
						return null
					}
				}
			},
			{
				label: '测试链接',
				type: 'primary',
				icon: 'el-icon-delete danger',
				perms: ['sql.delete_project'], // 权限判断 默认 remove
				methods: 'check_conn',
				confirmBtn: false
			}
		],
		filterCondition: []
	}
	const Label = [
		{
			label: '实例名称', // 标签名称
			prop: 'instance_name', // 字段
			align: 'center', // 对齐
			sortable: true, // 排序
			min_width: '200', // 宽度
			// fixed: "left", // 固定列
			slot: true, // 特殊列 slot 插槽
			hide: false // 隐藏
			// filter: []
		},
		{
			label: '实例环境', // 标签名称
			prop: 'env', // 字段
			align: 'center', // 对齐
			sortable: true, // 排序
			width: '100', // 宽度
			// fixed: "left", // 固定列
			slot: false // 特殊列 slot 插槽
			// filter: []
		},
		{
			label: '数据库类型', // 标签名称
			prop: 'db_type', // 字段
			align: 'center', // 对齐
			sortable: true, // 排序
			min_width: '100' // 宽度
			// fixed: "left", // 固定列
			// slot: false, // 特殊列 slot 插槽
		},
		{
			label: '实例类型', // 标签名称
			prop: 'type', // 字段
			align: 'center', // 对齐
			// sortable: true, // 排序
			// width: "150", // 宽度
			// fixed: "left", // 固定列
			slot: false // 特殊列 slot 插槽
			// filter: []
		},

		{
			label: '主机', // 标签名称
			prop: 'host', // 字段
			align: 'left', // 对齐
			sortable: false, // 排序
			// min_width: 150,
			// width: "100", // 宽度
			// fixed: "left", // 固定列
			slot: false // 特殊列 slot 插槽
		},
		{
			label: '端口', // 标签名称
			sortable: true, // 排序
			width: '100', // 宽度
			prop: 'port', // 字段
			align: 'center', // 对齐
			slot: false // 特殊列 slot 插槽
		},
		{
			label: '标签', // 标签名称
			prop: 'tags', // 字段
			align: 'left', // 对齐
			sortable: true, // 排序
			min_width: 200,
			// width: "100", // 宽度
			// fixed: "left", // 固定列
			slot: true // 特殊列 slot 插槽
		}
	]
	const Loading = ref(false)
	const data: any = []
	// 分页
	const pagination = ref({
		pagination: true,
		pageSizes: [10, 50, 100, 200, 500, 1000],
		total: 0,
		currentPage: 1,
		pageSize: 50
	})
	const HandleSizeChange = (val: number) => {
		pagination.value.pageSize = val
	}
	const HandlePageChange = (val: number) => {
		pagination.value.currentPage = val
	}
	// 处理表格按钮点击
	const HandleButtonClick = (params: any) => {
		if (params.methods == 'edit') {
			console.log(params.methods)
		}
	}
</script>
