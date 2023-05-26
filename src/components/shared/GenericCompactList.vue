<template>
	<div id="generic-compact-list-component">
		<div v-if="headers_.length > 0" class="table-wrapper">
			<div class="table">
				<table>
					<thead>
						<tr>
							<th v-for="(header, h) in headers_" :key="h">
								{{ header }}
							</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(item, i) in items" :key="i">
							<td v-for="(key, k) in keys_" :key="k">
								{{ renderValue(item[key], k) }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { currencyFormat } from '@/helpers/moeda'

export default {
	name: 'GenericCompactList',
	mixins: [],
	props: {
		items: {
			type: Array,
			required: true
		},
		dataMap: {
			type: Array,
			required: true
		}
	},
	data() {
		return {}
	},
	computed: {
		headers_() {
			return this.dataMap.map(h => h.header)
		},
		keys_() {
			return this.dataMap.map(h => h.key)
		}
	},
	methods: {
		renderValue(item, mapperIndex) {
			return this.dataMap[mapperIndex].money ? currencyFormat(item) : item
		}
	}
}
</script>

<style lang="scss" scoped>
#generic-compact-list-component {
	background-color: transparent;
	overflow: auto;
	flex-grow: 1;
	.table-wrapper {
		width: 100%;
		text-align: left;
		border-collapse: separate;
		.table {
			padding: 0px;
			margin: 0;
			table {
				border-radius: $border-radius;
				width: 100%;
				border-collapse: separate;
				border-spacing: 0 5px;
				th,
				td {
					padding: 3px 5px;
					font-family: $font-family;
					font-size: $font-size-small;
				}
				thead {
					border-radius: $border-radius;
					background-color: $main-color;
					tr {
						th {
							text-align: center;
							color: #fff;
							font-weight: $font-weight-default-bolder;
							border: none;
							&:first-of-type {
								text-align: left;
							}
							i {
								margin-left: 5px;
								font-size: 12px;
								font-weight: 600;
							}
						}
					}
				}
				tbody {
					tr {
						td {
							text-align: center;
							&:first-of-type {
								text-align: left;
							}
						}
					}
				}
			}
		}
	}
}
</style>
