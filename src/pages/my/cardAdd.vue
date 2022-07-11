<template>
    <div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="result"
                    is-link
                    readonly
                    name="picker"
                    label="银行名称"
                    placeholder="点击选择银行"
                    @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                    />
                </van-popup>
                <van-field
                    v-model="cardVal"
                    name="银行卡号码"
                    label="银行卡号码"
                    placeholder="银行卡号码"
                    :rules="[{ required: true, message: '请填写银行卡号码' }]"
                />
                <van-field
                    v-model="cardPhone"
                    type="number"
                    name="手机号码"
                    label="手机号码"
                    placeholder="手机号码"
                    :rules="[{ required: true, message: '请填写手机号码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block class="btn" type="primary" native-type="submit">确定</van-button>
            </div>
        </van-form>


    </div>
</template>
<script>
import { ref,onMounted } from 'vue';
import { ModifyBankCard } from "@/httpAction/card";
import { GetBankList } from "@/httpAction/publicCard";
export default {
  setup() {
    const result = ref('');
    const showPicker = ref(false);
    const columns = [];
    const cardVal = ref('');
    const cardPhone = ref('');
    onMounted(() => {
        GetBankCardLists();
    });
    const onConfirm = (value) => {
      result.value = value;
      showPicker.value = false;
    };
    const onSubmit = async () => {
        console.log('23454');
        try {
            let params = {
                action: "ModifyBankCard",
                BankName: cardVal.value,
                BankCardNo: cardPhone.value,
                BankCardMobile: result.value
            };
            const res = await ModifyBankCard(params);
            if (res.code != 0) {
                Toast(res.message)
                return false;
            }
            Toast("添加成功~");
            history.back();
        } catch (e) {
        }
    }
    const GetBankCardLists = async () => {
        try {
            let params = {
                action: "GetBankList"
            };
            const res = await GetBankList(params);
            if (res.code != 0) {
                Toast(res.message)
                return false;
            }
            // columns.value = res.data;
            res.data.forEach((item,index)=>{
                columns.push(item.bankName)
            })
            console.log(columns);
        } catch (e) {
        }
    }

    return {
      result,
      columns,
      onConfirm,
      showPicker,
      cardVal,
      cardPhone,
      onSubmit
    };
  },
};

</script>