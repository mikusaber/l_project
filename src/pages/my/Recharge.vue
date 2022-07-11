<template>
	<div class="Recharge">
		<div class="recharge-type" @click="state.show=true">
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
				<van-field center="true"
					style="font-size: 30px;font-weight: bold;padding-left: 0;padding-right: 0;padding-bottom: 15px;"
					placeholder="请输入金额" v-model="state.digit" type="digit" label="¥" label-width='20' />
			</div>
		</div>
		<div class="button">
			<van-button :disabled="state.digit.length>0?false:true" type="primary" size="large">确认充值</van-button>
		</div>
		<van-overlay :show="state.show">
			<div class="wrapper" @click.stop>
				<div class="block">

					<div class="title">
						<div class="text">选择支付方式</div>
						<div class="img" @click="state.show=false">
							<img src="@/assets/common/close.png" alt="">
						</div>
					</div>
					<div class="center">
						<div class="item">
							<div class="img">
								<img src="@/assets/common/bankCardIcon.png" alt="">
							</div>
							<div class="text">兴业银行(4514)</div>
							<div class="r-arrow">
								<img src="@/assets/common/choose.png" alt="">
							</div>
						</div>
						<div class="add">
							<div class="img">
								<img src="@/assets/common/bankCardIcon2.png" alt="">
							</div>
							<div class="text">添加银行卡</div>
							<div class="r-arrow">
								<img src="@/assets/common/add.png" alt="">
							</div>
						</div>
					</div>
				</div>


			</div>
		</van-overlay>
	</div>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		watch
	} from "vue";
	import {
		Overlay
	} from 'vant';
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
		digit: '100',
		show: false
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

		.button {
			margin-top: 20px;
		}

		.wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;

			.block {
				width: 80%;
				background-color: #fff;
				.title {
					overflow: hidden;
					position: relative;
					border-bottom: 1px solid #eee;
					.text {
						width: 100%;
						height: 50px;
						line-height: 50px;
						font-size: 20px;
						text-align: center;
						font-weight: bold;
					}
					.img {
						position: absolute;
						z-index: 100;
						top: 0;
						right: 0;
						width: 50px;
						height: 50px;
						padding: 15px;
						box-sizing: border-box;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
				.center {
					padding: 0 10px;
					.item {
						border-bottom: 1px solid #eee;
						overflow: hidden;
						padding: 20px 0;
						.img {
							float: left;
							width: 30px;
							height: 30px;
							padding: 2px;
							box-sizing: border-box;
							margin-right: 10px;
							
							img {
								width: 100%;
								height: 100%;
							}
						}
						.text {
							float: left;
							font-size: 16px;
							color: #000;
							eight: 30px;
							line-height: 30px;
						}
						.r-arrow {
							float: right;
							width: 30px;
							height: 30px;
							padding: 0px;
							box-sizing: border-box;
							
							img {
								width: 100%;
								height: 100%;
							}
						}
					}
					.add {
						border-bottom: 1px solid #eee;
						overflow: hidden;
						padding: 20px 0;
						.img {
							float: left;
							width: 30px;
							height: 30px;
							padding: 2px;
							box-sizing: border-box;
							margin-right: 10px;
							
							img {
								width: 100%;
								height: 100%;
							}
						}
						.text {
							float: left;
							font-size: 16px;
							color: #333;
							eight: 30px;
							line-height: 30px;
							// font-weight: bold;
						}
						.r-arrow {
							float: right;
							width: 30px;
							height: 30px;
							padding: 4px;
							box-sizing: border-box;
							
							img {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				
			}
		}
	}
</style>
