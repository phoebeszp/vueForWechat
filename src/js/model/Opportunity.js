import Model from '../model'

const opportunity = {
  userId: 0,
  renterName: '',
  renterSex: '',
  renterPhone: '',
  renterWechat: '',
  cityId: '',
  districtId: '',
  busiAreaId: 0,
  rentType: 1,
  roomPriceMin: '',
  roomPriceMax: '',
  renterLong: '',
  checkInDate:'',
  lookedType: '',
  lookedDate:'',
  orderMemo: '',
  thanksAmount: ''
}

export default new Model(opportunity);
