<template>
    <div>
        <Row class="total-preview">
            <Col :span="4">
                <info-card shadow color="#19be6b" icon="md-add-circle" :icon-size="36">
                    <CountTo :end="profits" :decimals="2" count-class="count-style" />
                    <p>今日收益</p>
                </info-card>
            </Col>
            <Col :span="4">
                <info-card shadow color="#ed4014" icon="md-remove-circle" :icon-size="36">
                    <CountTo :end="expend" :decimals="2" count-class="count-style" />
                    <p>今日支出</p>
                </info-card>
            </Col>
            <Col :span="4">
                <info-card shadow color="#1c8aec" icon="md-remove-circle" :icon-size="36">
                    <CountTo :end="soldNumber" count-class="count-style" />
                    <p>售出商品</p>
                </info-card>
            </Col>
            <Col :span="4">
                <info-card shadow color="#ff5a00" icon="ios-filing" :icon-size="36">
                    <CountTo :end="stock" count-class="count-style" />
                    <p>今日进货</p>
                </info-card>
            </Col>
        </Row>
<!--        <Row>-->
<!--            <Col :style="{marginBottom: '10px', padding: '10px'}">-->
<!--                <Card>-->
<!--                    <ChartBar style="height: 300px;" :value="barData" text="每日销售情况"></ChartBar>-->
<!--                </Card>-->
<!--            </Col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--            <Col :style="{marginBottom: '10px', padding: '10px'}">-->
<!--                <Card>-->
<!--                    <ChartLine style="height: 500px;" :value="lineData" text="每日收入情况"></ChartLine>-->
<!--                </Card>-->
<!--            </Col>-->
<!--        </Row>-->
    </div>
</template>
<script>
    import InfoCard from '_c/InfoCard'
    import CountTo from '_c/CountTo'
    import { ChartBar, ChartLine } from '_c/Charts'
    import {getExpend, getIncome, getSold, getStock} from '../../api/statistics'
    import {dateFormatter} from '../../libs/util'

    export default {
        components: {
            InfoCard,
            CountTo,
            ChartBar,
            ChartLine
        },
        data () {
            return {
                barData: {
                    xAxisData: ['周一', '周二', '周三', '周四', '周五'],
                    seriesData: [
                        {
                            name: 'Forest',
                            type: 'bar',
                            barGap: 0,
                            data: [320, 332, 301, 334, 390]
                        },
                        {
                            name: 'Steppe',
                            type: 'bar',
                            data: [220, 182, 191, 234, 290]
                        },
                        {
                            name: 'Desert',
                            type: 'bar',
                            data: [150, 232, 201, 154, 190]
                        },
                        {
                            name: 'Wetland',
                            type: 'bar',
                            data: [98, 77, 101, 99, 40]
                        }
                    ]
                },
                lineData: {
                    xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    seriesData: [
                        {
                            name: '运营商/网络服务',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#2d8cf0'
                                } },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '银行/证券',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#10A6FF'
                                } },
                            data: [257, 358, 278, 234, 290, 330, 310]
                        },
                        {
                            name: '游戏/视频',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#0C17A6'
                                } },
                            data: [379, 268, 354, 269, 310, 478, 358]
                        },
                        {
                            name: '餐饮/外卖',
                            type: 'line',
                            stack: '总量',
                            areaStyle: { normal: {
                                    color: '#4608A6'
                                } },
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '快递/电商',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: { normal: {
                                    color: '#398DBF'
                                } },
                            data: [820, 645, 546, 745, 872, 624, 258]
                        }
                    ]
                },
                date: dateFormatter('yyyy-MM-dd'),
                profits: 0,
                expend: 0,
                soldNumber: 0,
                stock: 0
            }
        },
        created () {
            this.getIncome()
            this.getExpend()
            this.getSold()
            this.getStock()
        },
        methods: {
            getIncome () {
                getIncome({
                    date: this.date
                }).then(res => {
                    this.profits = res.data.profits
                })
            },
            getExpend () {
                getExpend({
                    date: this.date
                }).then(res => {
                    this.expend = res.data.price
                })
            },
            getSold () {
                getSold({
                    date: this.date
                }).then(res => {
                    this.soldNumber = res.data.amount
                })
            },
            getStock () {
                getStock({
                    date: this.date
                }).then(res => {
                    this.stock = res.data.amount;
                })
            }
        }
    }
</script>
<style lang="less" src="./home.less" scoped></style>
<style lang="less">
    .count-style{
        font-size: 40px;
    }
</style>
