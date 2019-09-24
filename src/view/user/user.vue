<template>
    <Card>
        <div class="text-right mb10">
            <Button type="primary" @click="handleAdd">添加用户</Button>
        </div>
        <Table :columns="columns" :data="data">
            <template slot-scope="{ row }" slot="role">
                <Tag v-if="row.role === 0" color="blue">{{ roles[row.role] }}</Tag>
                <Tag v-else color="green">{{ roles[row.role] }}</Tag>
            </template>
        </Table>
        <Modal v-model="userModalVisible" title="添加用户" width="400" @on-cancel="cancel">
            <Form ref="userForm" :model="userForm" :rules="formValidate" :label-width="80" style="padding-right: 30px">
                <FormItem label="角色" prop="role">
                    <Select v-model="userForm.role">
                        <Option :value="0">管理员</Option>
                        <Option :value="1">收银员</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名" prop="username">
                    <Input v-model="userForm.username" />
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="userForm.password" type="password" />
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="userForm.name" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">确定</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    import {addUser, getUserList} from '../../api/user'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '角色',
                        slot: 'role'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    }
                ],
                data: [],
                roles: {
                    '0': '管理员',
                    '1': '收银员'
                },
                userModalVisible: false,
                userForm: {},
                formValidate: {
                    role: [
                        { required: true, message: '请选择用户角色', trigger: 'change', type: 'number' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            fetchData () {
                getUserList().then(res => {
                    this.data = res.data
                })
            },
            handleAdd () {
                this.open()
            },
            open () {
                this.userModalVisible = true
            },
            cancel () {
                this.userModalVisible = false
                this.$refs.userForm.resetFields()
            },
            handleSubmit () {
                this.$refs.userForm.validate(valid => {
                    if (valid) {
                        addUser({
                            ...this.userForm
                        }).then(() => {
                            this.$Message.success('添加成功！')
                            setTimeout(() => {
                                this.cancel()
                            }, 500)
                        })
                    }
                })
            }
        }
    }
</script>
