<template>
	<div class="Bank-Card-List">
		<div class="list">
			<div class="item" v-for="(item, i) in state.list" :key="i">
				<div class="top">{{item.bank_name}}</div>
				<!-- <div class="top-s">{{item.}}</div> -->
				<div class="bottom">
					<div class="price">
						{{item.bank_card_no}}
					</div>
				</div>
			</div>
		</div>
		<div class="add-card">
			<div class="icon">
				<img src="@/assets/common/add.png" alt="">
			</div>
			<div class="text" @click="toAddCard">添加银行卡</div>
		</div>
		<van-popup style="width: 200px;height: 120px;font-size: 18px;text-align: center;line-height: 120px;border-radius: 5px;overflow: hidden;" :show="state.show"><van-loading size="24px">检查绑卡状态：<b style="font-size:22px;">{{state.second}}</b>秒</van-loading></van-popup>
	</div>
</template>

<script setup> 
	import {
		Toast,
		Dialog,
		Popup,
		Loading
	} from "vant";
	import {
		reactive,
		onMounted,
		watch
	} from "vue";
	import {
		useRouter,
		useRoute
	} from "vue-router";
	import {
		BindPayBankCard,
		GetPayBankCardInfo,
		GetPayBankCardList
	} from "@/httpAction/card";
	import {
		exchangeDateTime
	} from "@/utils/help";

	import Empty from "../../components/Empty.vue";
	const router = useRouter();
	const route = useRoute();
	const state = reactive({
		list: [],
		timer:null,
		show:false,
		second:5
	});

	onMounted(() => {
		getList();

	});
	// 获取银行卡列表
	const getList = async () => {
		try {
			let params = {
				action: "GetPayBankCardList",
				paymentCompanyId: 1
			};
			const res = await GetPayBankCardList(params);
			if (res.code != 0) {
				Toast(res.message);
				return false;
			}
			state.list = res.data;
			console.log(res);
			checkBankCard();
		} catch (e) {
			console.log(e);
		}
	}
	// 检查是否绑定成功银行卡
	const checkBankCard = async () => {
		console.log(route.query)
		if (route.query.out_trade_no) {
			state.show = true;
			state.timer = window.setInterval(() => {
				state.second--;
				if (state.second) {
					checkStatus()
				} else {
					state.show = false;
					Toast('未查询到结果，请稍后再试');
					clearInterval(state.timer);
				}

			}, 1000);
		}

	}
	const checkStatus = async () => {
		try {
			let params = {
				action: "GetPayBankCardInfo",
				paymentCompanyId: 1,
				id: route.query.out_trade_no
			};
			const res = await GetPayBankCardInfo(params);
			if (res.code != 0) {
				Toast(res.message);
				clearInterval(state.timer);
				return false;
			}
			if (res.data.CardStatus == 1) {
				state.show = false;
				clearInterval(state.timer);
				Dialog.alert({
				  title: '汇付宝',
				  message: '银行卡绑定成功',
				}).then(() => {
				  // on close
				});
				return
			}
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	}
	// 添加银行卡
	const toAddCard = async () => {
		try {
			let params = {
				action: "BindPayBankCard",
				paymentCompanyId: 1
			};
			const res = await BindPayBankCard(params);
			if (res.code != 0) {
				Toast(res.message);
				return false;
			}
			// Toast('正在跳转第三方支付');
			console.log(res);
			window.location.href = res.data.sign_url
		} catch (e) {
			console.log(e);
		}
	};
	const clearPop = () => {
		state.show = false
	}
</script>

<style lang="scss" scoped>
	.Bank-Card-List {
		box-sizing: border-box;
		padding: 16px;
		min-height: 100%;
		background-color: #f8f8f8;
		.loading-text {
			width: 30%;
		}
		.list {
			.item {
				position: relative;
				padding: 16px;
				border-radius: 5px;
				font-size: 16px;
				height: 100px;
				background-color: #ee0a2499;
				color: #fff;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
				margin-bottom: 24px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				cursor: pointer;
				transition: 0.3s;

				&:hover {
					transform: scale(0.98);
				}

				.top {
					font-size: 18px;
				}

				.top-s {
					font-size: 12px;
					color: #eee;
				}

				.bottom {
					margin-top: 20px;

					.goPay {
						font-size: 15px;
					}

					.price {
						font-size: 30px;

						b {
							font-size: 24px;
						}
					}
				}
			}
		}

		.add-card {
			overflow: hidden;
			background: #fff;
			padding: 20px 20px;
			border-radius: 5px;
			transition: 0.3s;

			&:hover {
				transform: scale(0.98);
			}

			.icon {
				float: left;
				width: 30px;
				height: 30px;
				margin-right: 8px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				float: left;
				height: 30px;
				line-height: 30px;
				font-size: 16px;
			}
		}
	}
</style>
