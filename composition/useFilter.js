import {
	computed
} from 'vue'

export default function useFilter(zt) { 
	const three_year_position_status = computed(() => {
		let value = zt?.value.three_year_position_status
		let text = value || ''
		if(value == '1') text = '低位'
		else if(value == '2') text = '中低位' 
		else if(value == '3') text = '中位' 
		else if(value == '4') text = '中高位'  
		else if(value == '5') text = '高位'  
		return text
	})  
	const position_status = computed(() => {
		let value = zt?.value.position_status
		let text = value || ''
		if(value == '1') text = '低位'
		else if(value == '2') text = '中低位' 
		else if(value == '3') text = '中位' 
		else if(value == '4') text = '中高位'  
		else if(value == '5') text = '高位'  
		return text
	})  
	const pay_status = computed(() => {
		let value = zt?.value.pay_status
		let text = value
		if(value == '1') text = '已支付'
		else if(value == '2') text = '已过期' 
		else if(value == '0') text = '未支付' 
		return text
	})  
	const bill_status = computed(() => {
		let value = zt?.value.bill_status
		let text = value
		if(value == '0') text = '审核未通过'
		else if(value == '1') text = '审核已通过' 
		return text
	})  
	const plot_status = computed(() => {
		let value = zt?.value.plot_status
		let text = value
		if(value == '0') text = '发票未寄送'
		else if(value == '1') text = '发票已寄送' 
		else text = '未申请开票'
		return text
	})  
	const type_status = computed(() => {
		let value = zt?.value.type_status
		let text = value
		if(value == '1') text = ''
		else if(value == '2') text = '期货通' 
		else if(value == '3') text = '股票通'  
		return text
	})  
	return {
		position_status,
		pay_status,
		bill_status,
		plot_status,
		type_status,
		three_year_position_status
	}
}