import Binding from '../components/common/Binding'
import BindSuccess from '../components/common/BindSuccess'
import SetTradePassword from '../components/common/SetTradePassword'
import NoticeDetail from '../components/common/NoticeDetail'
import TradeList from '../components/common/TradeList'
import TradeDetail from '../components/common/TradeDetail'
import Withdraw from '../components/common/Withdraw'
import WithdrawRecord from '../components/common/WithdrawRecord'
import UploaderDemo from '../components/common/UploaderDemo'
import FinanceManagement from '../components/common/FinanceManagement'

import Home from '../components/holder/Home'
import Setting from '../components/holder/Setting'
import IncomeManagement from '../components/holder/IncomeManagement'
import CostManagement from '../components/holder/CostManagement'
import Wallet from '../components/holder/Wallet'

import RoomManagement from '../components/room/Management'
import RoomDetail from '../components/room/Detail'
import RoomNew from '../components/room/New'
import SaleManagement from '../components/room/SaleManagement'
import OrderDetail from '../components/room/OrderDetail'
import RoomList from '../components/room/RoomList'


import RenterHome from '../components/renter/Home'
import MyOrder from '../components/renter/MyOrder'
import Publish from '../components/renter/Publish'

import AgentManagement from '../components/agent/AgentManagement'
import Opportunity from '../components/agent/Opportunity'
import AgentHome from '../components/agent/Home'
import ViewDetail from '../components/agent/ViewDetail'

import SelectorTest from '../components/MenuItem'

const routes = {
  '/': {
    name:"有住",
    component: Binding,
  },
  '/bind': {
    name: "账号绑定",
    component: Binding,
  },
  '/bind-success': {
    name: "设置交易密码",
    component: BindSuccess,
  },
  '/set-trade-password': {
    name: "设置交易密码",
    component: SetTradePassword,
  },
  '/holder-home': {
    name: "房东首页",
    component: Home,
  },
  '/renter-home': {
    name: "租客首页",
    component: RenterHome,
  },
  '/renter-myOrder': {
    name: "我的租约",
    component: MyOrder,
  },
   '/renter-publish': {
    name: "我的租约需求",
    component: Publish,
  },
  '/notice-detail/:type/:id': {
    component: NoticeDetail,
  },
  '/setting': {
    name: "用户设置",
    component: Setting,
  },
  '/uploader-demo': {
    component: UploaderDemo,
  },
  '/room-management': {
    name: "房源管理",
    component: RoomManagement
  },
  '/room-management/:type': {
    name: "房源管理",
    component: RoomManagement,
  },
  '/room-detail/:id': {
    name: "房源信息",
    component: RoomDetail,
  },
  '/room-new': {
    name: "创建房源",
    component: RoomNew,
  },
  '/sale-management': {
    component: SaleManagement
  },
  '/sale-management/:type': {
    component: SaleManagement
  },
  '/order-detail/:type/:id/:historyMode': {
    component: OrderDetail
  },
  '/finance-management': {
    name:'财务管理',
    component: FinanceManagement
  },
  '/income-management': {
    name:'收入管理',
    component: IncomeManagement
  },
  '/cost-management': {
    name:'支出管理',
    component: CostManagement
  },
  '/wallet': {
    name:'房东钱包',
    component: Wallet
  },
  '/trade-list/:startDate/:endDate/:accountType': {
    component: TradeList
  },
  '/trade-detail/:billId/:billType': {
    name:'明细',
    component: TradeDetail
  },
  '/withdraw': {
    name:'提现',
    component: Withdraw
  },
  '/withdraw-record': {
    name:'提现记录',
    component: WithdrawRecord
  },
  '/agent-management': {
    name:'经纪人管理页面',
    component: AgentManagement
  },
  '/agent-home': {
    name:'经纪人首页',
    component: AgentHome
  },
  '/opportunity': {
    name:'录新订单',
    component: Opportunity
  },
  '/room-list': {
    name:'房源列表',
    component: RoomList
  },
  '/room-list/:orderId': {
    name:'配盘',
    component: RoomList
  },
  '/selector-test': {
    component: SelectorTest
  },
  '/view-order/:id':{
    component: ViewDetail
  }
}

export default routes;
