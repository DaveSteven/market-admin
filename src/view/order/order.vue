<template>
    <Card>
        <Table :columns="columns" :data="data" class="mb10">
            <template slot-scope="{ row }" slot="total">
                ¥{{ row.total | parseMoney }}
            </template>
            <template slot-scope="{ row }" slot="payment">
                <Tag :color="payment[row.payment].color">{{ payment[row.payment].name }}</Tag>
            </template>
            <template slot-scope="{ row }" slot="username">
                {{ getUsername(row) }}
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="success" @click="getOrderDetail(row.id)">订单信息</Button>
            </template>
        </Table>
        <Page :total="total" :page-size="limit" @on-change="toPage"></Page>
        <Modal v-model="orderVisible" title="订单详情" width="60%">
            <Table :columns="detailColumns" :data="orderDetail">
                <template slot-scope="{ row }" slot="price">¥{{ row.price | parseMoney }}</template>
                <template slot-scope="{ row }" slot="total">¥{{ getTotal(row) | parseMoney}}</template>
            </Table>
        </Modal>
    </Card>
</template>
<script>
    import { getOrderList, getOrderInfo } from '../../api/order'
    import {getUserList} from '../../api/user'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '订单id',
                        key: 'id'
                    },
                    {
                        title: '总价',
                        slot: 'total'
                    },
                    {
                        title: '支付方式',
                        slot: 'payment'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '收银',
                        slot: 'username'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [],
                start: 1,
                limit: 10,
                total: 0,
                payment: {
                    0: {
                        name: '现金',
                        color: 'orange'
                    },
                    1: {
                        name: '支付宝',
                        color: 'blue'
                    },
                    2: {
                        name: '微信',
                        color: 'green'
                    }
                },
                detailColumns: [
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '出售金额',
                        slot: 'price'
                    },
                    {
                        title: '出售数量',
                        key: 'amount'
                    },
                    {
                        title: '总计',
                        slot: 'total'
                    }
                ],
                userList: [],
                orderDetail: [],
                orderVisible: false
            }
        },
        created () {
          this.fetchData()
        },
        methods: {
            getOrderList () {
                getOrderList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                }).then(res => {
                    this.data = res.data.list
                    this.total = res.data.total
                })
            },
            async fetchData () {
                const userResult = await getUserList();
                const orderResult = await getOrderList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                })
                this.userList = userResult.data;
                this.data = orderResult.data.list;
                this.total = orderResult.data.total;
            },
            getOrderDetail (orderId) {
                getOrderInfo({
                    orderId
                }).then(res => {
                    this.orderDetail = res.data
                    this.orderVisible = true
                })
            },
            getTotal (data) {
                return data.price * data.amount
            },
            toPage (page) {
                this.start = page
                this.getOrderList()
            },
            getUsername (data) {
                const user = this.userList.find(item => {
                    return item.id === data.userId
                })
                return user.name
            }
        }
    }
</script>
