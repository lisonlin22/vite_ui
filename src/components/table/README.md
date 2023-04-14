# 使用表格

### 二次封装 el-table
项目使用 `element-plus` 中 `el-table`  进行二次封装 

组件对应文件夹 `src/components/table/table.vue`

```javascript
// 目录
components
└── table
    └── table.vue    -------- 二次封装 el-table 表格
```

### 使用 Table

```vue
<template>
	<div id="sqlworkflow">
		<div class="table">
			<s-table
				:tableData="tableData"
				:tableLabel="Label"
				:tableOption="Options"
				@handle-button-click="HandleButtonClick"
				@handle-cell-click="handleCellClick"
				@handle-selection-change="handleSelectionChange"
			>
				<template v-slot:plugin_name="{ row }">
					<el-link type="primary" :underline="false">{{
						row.plugin_name
					}}</el-link>
				</template>
				<!-- 特殊列插槽 -->
				<template v-slot:plugin_status="{ row }">
					<el-tag
						class="ml-2"
						type="success"
						v-if="row.plugin_status == 'init'"
						>执行成功</el-tag
					>
					<el-tag
						class="ml-2"
						type="danger"
						v-else-if="row.plugin_status == 'release'"
						>执行失败</el-tag
					>
					<el-tag class="ml-2" type="danger" v-else>未知结果</el-tag>
				</template>
			</s-table>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, onMounted, ref } from "vue";
	import STable from "@/components/table/table.vue";
	// 插件列表
	const Options = {
		index: true, // 是否显示 index
		index_fixed: "", // index 列固定 right | left
		selection: true, // 行多选
		selection_width: 55, // 行多选列宽度 默认值 55
		// tableHeight: 200,  // 表格行高 默认值：浏览器高度 - 245px
		pagination: true, // 是否分页 true | false
		fixed: "right", // 操作列固定
		width: "130", // 操作列 宽度
		label: "操作", // 操作列 label
		options: [
			// 操作列按钮
			{
				label: "发布", // 按钮名称
				type: "primary", // 样式 primary | success | danger | waring | info
				icon: "el-icon-delete", // icon  暂时未使用
				methods: "log", // 操作方法 传递入参   HandleButtonClick (params: any ) -> params.methods
				confirmBtn: false, // 确认框按钮
				perms: ["user:add"] // 权限判断  默认 remove  | disabled
				render: (row: any): any => {
					// render 渲染 | 根据行数据 返回按钮名称
					if (row.rule_status === "init") {
						return "发布";
					} else if (row.rule_status === "release") {
						return "撤销";
					}
				},
			},
			{
				label: "删除",
				type: "danger",
				icon: "el-icon-delete",
				methods: "edit",
				confirmBtn: true,
			},
		],
		filterCondition: [],
	};
	const Label = [
		{
			label: "插件名称", // 标签名称
			prop: "plugin_name", // 字段
			align: "center", // 对齐
			sortable: true, // 排序
			// width: "150",   // 宽度
			// fixed: "left", // 固定列
			slot: true, // 特殊列 slot 插槽
			// filter: []
		},
		{
			label: "插件类型", // 标签名称
			prop: "plugin_type_name", // 字段
			align: "center", // 对齐
			sortable: true, // 排序
			// min_width: 150,
			// width: "150",   // 宽度
			// fixed: "left", // 固定列
			slot: false, // 特殊列 slot 插槽
		},
		{
			label: "插件状态", // 标签名称
			sortable: true, // 排序
			prop: "plugin_status", // 字段
			align: "center", // 对齐
			slot: true, // 特殊列 slot 插槽
		},
		{
			label: "插件版本", // 标签名称
			prop: "version_name", // 字段
			align: "center", // 对齐
			// sortable: true, // 排序
			width: "150", // 宽度
			// fixed: "left", // 固定列
			slot: false, // 特殊列 slot 插槽
			// filter: []
		},
		{
			label: "关键规则", // 标签名称
			prop: "is_bind_rule", // 字段
			align: "center", // 对齐
			// sortable: true, // 排序
			// width: "150",   // 宽度
			// fixed: "left", // 固定列
			slot: false, // 特殊列 slot 插槽
			// filter: [],
			render: (row: any): any => {
				if (row.is_bind_rule === "no") {
					return "否";
				} else {
					return "是";
				}
			},
		},
		{
			label: "描述", // 标签名称
			prop: "plugin_desc", // 字段
			align: "left", // 对齐
			// sortable: true, // 排序
			min_width: "150",
			// width: "150",   // 宽度
			// fixed: "left", // 固定列
			slot: false, // 特殊列 slot 插槽
			// filter: []
		},
		{
			label: "创建人", // 标签名称
			prop: "created_by", // 字段
			align: "center", // 对齐
			sortable: true, // 排序
			// width: "150",   // 宽度
			// fixed: "left", // 固定列
			slot: false, // 特殊列 slot 插槽
			// filter: []
		},
		{
			label: "创建时间", // 标签名称
			prop: "created_at", // 字段
			align: "center", // 对齐
			// sortable: true, // 排序
			min_width: "170", // 宽度
			// fixed: "left", // 固定列
			// slot: false, // 特殊列 slot 插槽
			// filter: []
		},
	];

	export default defineComponent({
		name: "",
		components: {
			STable,
		},
		setup() {
			// 数据初始化

			const data = {
				plugin_id: 1,
				plugin_version_id: 1,
				plugin_name: "es_cpu",
				plugin_type_name: "pod",
				plugin_status: "release",
				version_name: "V202201250114",
				is_bind_rule: "no",
				plugin_desc: "巡检 es cpu 负载",
				created_by: "felixguan",
				created_at: "2022-01-25T16:10:15+08:00",
			};

			const tableData: any = ref([data]);
			// 处理表格按钮点击
			const HandleButtonClick = (params: any) => {
				if (params.methods == "edit") {
					console.log("edit", params);
				} else if (params.methods == "log") {
					console.log("log", params);
				}
				// console.log(params.methods, params.row.$index, params.row.row.plugin_name)
			};
			// 处理行点击
			const handleCellClick = (params: any) => {
				console.log(params.row);
			};
			// 处理多选
			const handleSelectionChange = (val: any) => {
				console.log(val, "fff");
			};
			onMounted(() => {});
			return {
				HandleButtonClick,
				handleCellClick,
				handleSelectionChange,
				tableData,
				Options,
				Label,
			};
		},
	});
</script>

<style lang="less" scope>
</style>
```