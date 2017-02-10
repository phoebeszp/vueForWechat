<template>
	<div class="renter-publish">
		<ul>
			<li>
				<group >
					<cell title="订单编号" link="/">
						<span>XQD12345</span>
					</cell>
					<cell title="意向区域">
						<span>七宝中学附近</span>
					</cell>
					<cell title="租房预算">
						<span>3000元/月</span>
					</cell>
					<cell title="当前状态">
						<span>服务中</span>
					</cell>
					<cell title="经纪人">
						<span>李师师</span>
						<a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:12120">致电</a>
					</cell>
				</group>
			</li>
			<li>
				<group>
					<cell title="订单编号">
						<span>XQD12345</span>
					</cell>
					<cell title="意向区域">
						<span>七宝中学附近</span>
					</cell>
					<cell title="租房预算">
						<span>3000元/月</span>
					</cell>
					<cell title="当前状态">
						<span>服务中</span>
					</cell>
					<cell title="经纪人">
						<span>李师师</span>
						<a class="right weui_btn weui_btn_mini weui_btn_plain_primary" href="tel:12120">致电</a>
					</cell>
				</group>
			</li>
		</ul>
	</div>
</template>
<script>
import Cell from 'vux-components/cell'
import Group from 'vux-components/group'
export default {
	data(){
		return {

		}
	},
	components: {
    Group,
    Cell
  }
}
</script>
<style lang="less">

</style>
