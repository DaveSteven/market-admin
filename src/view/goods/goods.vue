<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">添加商品</Button>
        </div>
        <Table :columns="columns" :data="data" class="mb10">
            <template slot-scope="{ row, index }" slot="number">
                {{ index | getSerialNumber(start, limit) }}
            </template>
            <template slot-scope="{ row }" slot="category">
                <Tag color="green">{{ getCategory(row.categoryId) }}</Tag>
            </template>
            <template slot-scope="{ row }" slot="price">
                ¥{{ row.price | parseMoney }}
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="success" class="mr5" @click="handleEdit(row)">编辑</Button>
                <Button type="error" @click="handleDelete(row)">删除</Button>
            </template>
        </Table>
        <Page :page-size="limit" :total="total" @on-change="toPage"></Page>
        <Modal v-model="modalVisible" :title="modalTitle" width="400">
            <Form ref="goodsForm" :rules="goodsFormValidate" :model="goodsForm" :label-width="80">
                <FormItem prop="categoryId" label="商品分类">
                    <Select v-model="goodsForm.categoryId" style="width: 150px">
                        <Option v-for="(item, index) in categoryList" :key="index" :value="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="code" label="商品条码">
                    <Input v-model="goodsForm.code" icon="ios-barcode-outline" />
                </FormItem>
                <FormItem prop="name" label="商品名称">
                    <Input v-model="goodsForm.name" />
                </FormItem>
                <FormItem prop="price" label="商品售价">
                    <Input v-model.number="goodsForm.price" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="confirm()">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import { addGoods, editGoods, deleteGoods, getGoodsList } from '../../api/goods'
    import { getCategoryList } from '../../api/category'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '编号',
                        slot: 'number'
                    },
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '商品分类',
                        slot: 'category'
                    },
                    {
                        title: '商品售价',
                        slot: 'price'
                    },
                    {
                        title: '商品条码',
                        key: 'code'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [],
                categoryList: [],
                goodsForm: {
                    typeId: '',
                    code: '',
                    name: '',
                    price: ''
                },
                goodsFormValidate: {
                    categoryId: [
                        { required: true, message: '请选择商品分类', trigger: 'change' }
                    ],
                    code: [
                        { required: true, message: '请输入商品编码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur', type: 'number' }
                    ]
                },
                start: 1,
                limit: 10,
                total: 0,
                modalVisible: false,
                actionType: 'add'
            }
        },
        computed: {
            modalTitle () {
                return this.actionType === 'add' ? '添加' : '编辑'
            }
        },
        created () {
            this.fetchData();
        },
        methods: {
            async fetchData () {
                const categoryListResult = await getCategoryList();
                const goodsListResult = await getGoodsList({
                    start: (this.start - 1) * this.limit,
                    limit: this.limit
                })
                this.categoryList = categoryListResult.data;
                this.data = goodsListResult.data.list;
                this.total = goodsListResult.data.total
            },
            cancel () {
                this.modalVisible = false
                this.$refs.goodsForm.resetFields()
            },
            open () {
                this.modalVisible = true
            },
            handleAdd () {
                this.actionType = 'add'
                this.open()
            },
            handleEdit (row) {
                this.actionType = 'edit'
                this.goodsForm = Object.assign({}, row)
                this.currentGoods = row;
                this.open()
            },
            handleDelete (row) {
                this.currentGoods = row;
                this.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除此商品吗？',
                    onOk: () => {
                        this.deleteGoods();
                    }
                })
            },
            addGoods () {
                addGoods({
                    ...this.goodsForm
                }).then(() => {
                    this.$Message.success('添加成功！')
                    this.cancel();
                    this.fetchData();
                })
            },
            editGoods () {
                editGoods({
                    ...this.goodsForm,
                    id: this.currentGoods.id
                }).then(() => {
                    this.$Message.success('修改成功！')
                    this.cancel();
                    this.fetchData();
                })
            },
            deleteGoods () {
                deleteGoods({
                    id: this.currentGoods.id
                }).then(() => {
                    this.$Message.success('删除成功！')
                    this.fetchData();
                })
            },
            confirm () {
                this.$refs.goodsForm.validate((valid) => {
                    if (valid) {
                        if (this.actionType === 'add') {
                            this.addGoods();
                        } else if (this.actionType === 'edit') {
                            this.editGoods();
                        }
                    }
                })
            },
            getCategory(id) {
                const category = this.categoryList.find(item => {
                    return item.id === id;
                })
                return category.name;
            },
            toPage (page) {
                this.start = page;
                this.fetchData();
            }
        }
    }
</script>
<style lang="less" src="./goods.less" scoped></style>
