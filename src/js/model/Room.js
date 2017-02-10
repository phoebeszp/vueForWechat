import Model from '../model'

const room = {
  roomId: 0,
  roomTitle: '',
  rentType: 0, // 1.合租 2.整租
  lng: '',
  lat: '',
  roomFace: {
    type: Model.STRING,
    default: '1'
  },
  cityId: 0,
  community: '',
  districtId: '',
  road: '',
  nong: '',
  roadum: '',
  building: '',
  floorNum: '',
  roomNum: '',
  checkinTime: '',
  roomPrice: '',
  payType: '', // 押/付：1/3
  area: '', // 面积
  bookingPrice: '', // 定金
  agentType: {
    type: Model.STRING,
    default: '1'
  }, // 佣金类型
  picDetails: {
    type: Model.ARRAY,
    default: []
  },
  agentPercent: '',
  agentPrice: '',
  agentId: '',
  fixedPercent: '',
  fixedPrice: '',
  roomMemo: '',
  roomNumId: '',
  rentStatus: {
    type: Model.STRING,
    default: '1'
  }, // 1.待出租 2.已出租 3.待上线
  editType: {
    type: Model.NUMBER,
    default: 1
  }// 1.新增 2.修改,
}

export default new Model(room);
