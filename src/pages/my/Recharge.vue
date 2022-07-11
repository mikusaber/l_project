<template>
	<div class="Recharge">
		<div class="recharge-type">
			<div class="title">充值方式</div>
			<div class="center">
				<div class="img">
					<img src="@/assets/common/bankCardIcon.png" alt="">
				</div>
				<div class="text">兴业银行(4514)</div>
			</div>
			<div class="r-arrow">
				<img src="@/assets/common/r-arrow.png" alt="">
			</div>
		</div>
		<div class="recharge-content">
			<div class="title">充值金额</div>
			<div class="input">
				<van-field placeholder="请输入金额" v-model="number" type="number" label="¥" label-width='20' />
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		watch
	} from "vue";
	import {
		GetPaymentCompanyList
	} from "@/httpAction/collection";
	import {
		exchangeDateTime
	} from "@/utils/help";
	import {
		useRouter
	} from "vue-router";

	import Empty from "../../components/Empty.vue";
	const router = useRouter();
	const state = reactive({
		list: [],
		number:''
	});

	onMounted(() => {
		getList();
	});
	const getList = async () => {
		try {
			let params = {
				action: "GetPaymentCompanyList",
			};
			const res = await GetPaymentCompanyList(params);
			if (res.code != 0) {
				Toast(res.message);
				return false;
			}
			state.list = res.data;
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};
	const toPage = () => {
		router.push("/my/BankCardList");
	}
</script>

<style lang="scss" scoped>
	.Recharge {
		box-sizing: border-box;
		padding: 16px;
		min-height: 100%;
		background-color: #fff;

		.recharge-type {
			overflow: hidden;
			padding-bottom: 15px;
			padding-top: 10px;
			border-bottom: 1px solid #ccc;

			.title {
				width: 30%;
				float: left;
				font-size: 20px;
				font-weight: bold;
				height: 30px;
				line-height: 30px;
				// margin-right: 10px;
			}
			.center {
				float: left;
				width: 55%;
				.img {
					float: left;
					width: 30px;
					height: 30px;
					padding: 5px;
					box-sizing: border-box;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					float: left;
					font-size: 16px;
					color: #888;
					eight: 30px;
					line-height: 30px;
				}
			}
			.r-arrow {
				float: right;
				width: 30px;
				height: 30px;
				padding: 5px;
				box-sizing: border-box;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.recharge-content {
			margin-top: 20px;
			.title {
				font-size: 20px;
				font-weight: bold;
				height: 30px;
				line-height: 30px;
			}
			.input {
				font-size: 20px;
				margin-top: 20px;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
