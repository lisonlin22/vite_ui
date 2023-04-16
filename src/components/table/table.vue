<template>
	<el-table
		:data="
			tableOption.client_page
				? tableData.slice(
						(pagination.currentPage - 1) * pagination.pageSize,
						pagination.currentPage * pagination.pageSize
				  )
				: tableData
		"
		ref="table"
		style="width: 100%"
		stripe
		:height="tableOption.tableHeight ? tableOption.tableHeight : TableHeight"
		@cell-click="handleCellClick"
		@selection-change="handleSelectionChange"
		v-loading="loading"
		element-loading-text="正在加载..."
		empty-text="找不到任何数据"
	>
		<!-- 展开列 -->
		<el-table-column type="expand" v-if="tableOption.expand">
			<!--优先使用插槽-->
			<template #default="props">
				<slot :name="tableOption.expand_name" v-bind="props" />
			</template>
		</el-table-column>
		<!-- 多选列 -->
		<el-table-column
			type="selection"
			:width="tableOption.selection_width ? tableOption.selection_width : 55"
			v-if="tableOption.selection"
		/>
		<!-- 索引列 -->
		<el-table-column
			type="index"
			width="80"
			label="序号"
			align="center"
			v-if="tableOption.index"
			:fixed="tableOption.index_fixed ? tableOption.index_fixed : false"
		></el-table-column>

		<!-- 正式列 -->
		<el-table-column
			v-for="item in Label"
			:width="item.width ? item.width : ''"
			:min-width="item.min_width ? item.min_width : ''"
			:key="item.label"
			:align="item.align"
			:label="item.label"
			:prop="item.prop"
			:sortable="item.sortable ? true : false"
			:fixed="item.fixed ? item.fixed : false"
		>
			<!-- :filters="item.filter ? item.filter : ''" -->
			<template #default="props" v-if="item.expand">
				<p>{{ props.row[item.prop] }}</p>
			</template>
			<template v-slot="scope" v-else>
				<!--优先使用插槽-->
				<slot v-if="item.slot" :name="item.prop" v-bind="scope" />

				<!-- render -->
				<span v-else-if="item.render">{{ item.render(scope.row) }}</span>

				<!-- 原始输出 -->
				<span v-else>{{ scope.row[item.prop] }}</span>
			</template>
		</el-table-column>

		<!-- 操作字段 -->
		<el-table-column
			v-if="tableOption.label"
			:fixed="tableOption.fixed"
			:width="tableOption.width"
			:label="tableOption.label"
			align="center"
		>
			<template v-slot="scope">
				<!-- :class="item.icon" -->
				<template v-for="(item, index) in tableOption.options" :key="index">
					<!-- 判断是否权限控制 -->
					<template v-if="item.perms">
						<span v-remove="item.perms">
							<span v-if="item.confirmBtn">
								<el-popconfirm
									confirm-button-text="确定"
									cancel-button-text="取消"
									:title="`你确定要${item.render ? item.render(scope.row) : item.label}吗?`"
									@confirm="handleButtonClick(item.methods, scope, index)"
								>
									<template #reference>
										<el-link :type="item.type" class="action" size="small">
											<span v-if="item.render">{{ item.render(scope.row) }}</span>
											<span v-else> {{ item.label }}</span>
										</el-link>
									</template>
								</el-popconfirm>
							</span>
							<span v-else>
								<el-link
									@click.stop="handleButtonClick(item.methods, scope, index)"
									:type="item.type"
									class="action"
									size="small"
								>
									<span v-if="item.render">{{ item.render(scope.row) }}</span>
									<span v-else> {{ item.label }}</span></el-link
								>
							</span>
						</span>
					</template>

					<template v-else>
						<span v-if="item.confirmBtn">
							<el-popconfirm
								confirm-button-text="确定"
								cancel-button-text="取消"
								:title="`你确定要${item.render ? item.render(scope.row) : item.label}吗?`"
								@confirm="handleButtonClick(item.methods, scope, index)"
							>
								<template #reference>
									<el-link :type="item.type" class="action" size="small">
										<span v-if="item.render">{{ item.render(scope.row) }}</span>
										<span v-else> {{ item.label }}</span>
									</el-link>
								</template>
							</el-popconfirm>
						</span>
						<span v-else>
							<el-link
								@click.stop="handleButtonClick(item.methods, scope, index)"
								:type="item.type"
								class="action"
								size="small"
							>
								<span v-if="item.render">{{ item.render(scope.row) }}</span>
								<span v-else> {{ item.label }}</span></el-link
							>
						</span>
					</template>
				</template>
				<!-- <el-button

                    v-for="(item, index) in tableOption.options"
                    :class="item.icon"
                    :type="item.type"
                    :key="index"
                    class="action"
                    size="small"
                    @click.stop="handleButtonClick(item.methods, scope.row, index)"
                ></el-button>-->
			</template>
		</el-table-column>

		<!--分页-->
		<!-- 翻页组件 -->
	</el-table>
	<div v-if="pagination.pagination && tableOption.pagination" class="pagination">
		<el-pagination
			:page-sizes="pagination.pageSizes"
			:page-size="pagination.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="tableOption.client_page ? tableData.length : pagination.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
	</div>
</template>
<script lang="ts" setup>
	// 二次封装 table
	import { computed, onMounted, ref } from 'vue'

	const props = defineProps({
		loading: {
			type: Boolean,
			default: false
		},
		// 表格高度
		tableHeight: {
			type: String,
			default: '450'
		},
		// 表格数据
		tableData: {
			type: Array,
			default: []
		},
		// 表头样式
		tableLabel: {
			type: Array,
			default: []
		},
		// 表格控制
		tableOption: {
			type: Object,
			default: () => {
				return {
					stripe: false, // 是否为斑马纹 table
					highlightCurrentRow: false, // 是否要高亮当前行
					border: false,
					index: true,
					client_page: true // 默认 client
				}
			}
		},
		// 分页控制
		pagination: {
			type: Object,
			default: () => {
				return {
					pagination: true,
					pageSizes: [10, 50, 100, 200, 500, 1000, 2000],
					total: 0,
					currentPage: 1,
					pageSize: 50
				}
			}
		}
	})
	const emits = defineEmits([
		'handle-button-click',
		'handle-cell-click',
		'handle-selection-change',
		'handle-size-change',
		'handle-page-change'
	])
	// 处理操作按钮
	const handleButtonClick = (methods: String, row: any, index: Number) => {
		emits('handle-button-click', {
			methods: methods,
			row: row,
			index: index
		})
	}
	// 处理行点击
	const handleCellClick = (row: any, column: any, cell: any, event: any) => {
		emits('handle-cell-click', { row, column, cell, event })
	}
	// 处理多选
	const handleSelectionChange = (val: any) => {
		emits('handle-selection-change', val)
	}

	// 处理分页
	const handleSizeChange = (val: number) => {
		// 判断是否客户端分页
		if (props.tableOption.client_page) {
			props.pagination.pageSize = val
		} else {
			emits('handle-size-change', val)
		}
	}
	const handleCurrentChange = (val: number) => {
		// 判断是否客户端分页
		if (props.tableOption.client_page) {
			props.pagination.currentPage = val
		} else {
			emits('handle-page-change', val)
		}
	}

	onMounted(() => {
		if (props.tableOption.client_page) {
			props.pagination.total = props.pagination.tableData.length
		}
	})
	// 计算高度
	// const { TableHeight } = mapState()

	const TableHeight = ref(450)
	// 动态显示
	const Label: any = computed(() => {
		return props.tableLabel.filter((item: any) => {
			return !item.hide
			// return item.show;
		})
		// return;
	})
</script>

<style lang="less" scope>
	.action {
		margin: 0px 5px;
		cursor: pointer;
	}
	.pagination {
		margin-top: 10px;
	}
</style>
