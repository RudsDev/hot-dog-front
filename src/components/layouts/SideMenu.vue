<template>
	<sidebar-menu
		:show-one-child="true"
		:menu="menu"
		:hide-toggle="true"
		:width="'250px'"
	>
		<div slot="header" class="header"></div>
		<div slot="footer" class="footer">
			<!-- <div class="logout">
				<span @click="logout">
					Sair
					<i class="fas fa-sign-out-alt" />
				</span>
			</div> -->
		</div>
	</sidebar-menu>
</template>

<script>
/* eslint-disable */
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
	name: 'SideMenu',
	components: { SidebarMenu },
	mixins: [],
	data () {
		return {
			menu: this.createMenu()
		}
	},

	methods: {
		logout () {
			alert("Implementar Logout (ou não...)")
		},
		createMenu() {
			return [
				{
					title: 'Ingredientes',
					icon: 'fas fa-egg',
					href: { name: 'ingredienteCreate' }
				},
				{
					title: 'Lanches',
					icon: 'fas fa-hotdog',
					href: { name: 'lancheCreate' }
				},
				{
					title: 'Promoções',
					icon: 'fas fa-piggy-bank',
					href: { name: 'promocaoCreate' }
				},
			]
		}
	}
}

</script>

<style lang="scss" scoped>
	@import url('../../../node_modules/vue-sidebar-menu/dist/vue-sidebar-menu.css');
</style>

<style lang="css">

.v-sidebar-menu {
	position: relative;
	height: 100%;
}

.v-sidebar-menu .vsm--header {
	height: 80px;
}

.v-sidebar-menu .vsm--item.vsm--item_open .vsm--link.vsm--link_level-1,
.v-sidebar-menu .vsm--item.vsm--item_open .vsm--link.vsm--link_level-1 i {
	background-color: #3367d6;
}

.v-sidebar-menu .vsm--link.vsm--link_level-1.vsm--link_active {
	-webkit-box-shadow: 3px 0px 0px 0px #3367d6 inset;
	box-shadow: 3px 0px 0px 0px #3367d6 inset;
}

/*
.v-sidebar-menu .vsm--item {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_expanded {}
.v-sidebar-menu.vsm_collapsed {}
.v-sidebar-menu.vsm_rtl {}
.v-sidebar-menu .vsm--item.vsm--item_open {}
.v-sidebar-menu .vsm--link {}
.v-sidebar-menu .vsm--link.vsm--link_active {}
.v-sidebar-menu .vsm--link.vsm--link_exact-active {}
.v-sidebar-menu .vsm--link.vsm--link_mobile-item {}
.v-sidebar-menu .vsm--link.vsm--link_level-[n] {}
.v-sidebar-menu .vsm--link.vsm--link_disabled {}
.v-sidebar-menu .vsm--title {}
.v-sidebar-menu .vsm--icon {}
.v-sidebar-menu .vsm--arrow.vsm--arrow_open {}
.v-sidebar-menu .vsm--arrow {}
.v-sidebar-menu .vsm--badge {}
.v-sidebar-menu .vsm--header {}
.v-sidebar-menu .vsm--list {}
.v-sidebar-menu .vsm--dropdown>.vsm--list {}
.v-sidebar-menu .vsm--mobile-item {}
.v-sidebar-menu .vsm--mobile-bg {}
.v-sidebar-menu .vsm--toggle-btn {}
*/

</style>

<style lang="scss" scoped>
.v-sidebar-menu {
	background-color: $main-color;
	.header {
		padding: 25px 35px;
	}
	.footer {
		background-color: transparent;
		padding: 0;
		.logout {
			height: 40px;
    	display: flex;
    	justify-content: center;
			span {
				width: fit-content;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				column-gap: 5px;
				font-size: $font-size-mid-big;
				user-select: none;
				text-transform: uppercase;
				cursor: pointer;
				&:hover {
					color: $font-color-btn;
				}
			}
		}
	}
}
</style>
