2024/1/5
solve 1.优化 django 模型 input 和 output 数据另存一表，每条数据的上限改为 16MB，问题主体存放数据 ID 2.重写 view 中 ridgetproblem 方法和 judger，适配 solve1。
problem
1.mongodb 数据库单条记录大小限制为 16M 考虑使用 Mysql 来存储 input 和 output
2.vue3 前端处理数据时内存溢出导致崩溃
3.vue3 changeprobelm.vue 未更改

2024/1/13
problem 1.需求一个后端 view,获取所有数据 目标 vue 和 changeprobelm

2024/1/19
solve
1.vue3 前端处理数据时内存溢出导致崩溃 渲染前每个数据的前一百个字符控制减小内存压力

2024/1/22
solve 1.样例独立且可以添加多个
2.changeproblem 基本完成
problem 1.服务端上的 judger 需要更新在本地(不需要)

2024/1/24
main
4 人在线测试
problem 1.问题集的分类需求 2.多人访问时略有卡顿 (服务器) 3.多语言提交需求(java,python...)!!! 4.用户提交通过的 problem 在 problemset 界面显示 AC
5.danjgo 框架异步 flask 框架同步? 前一个提交耗时较久时候会把后面提交的文件删除或者覆盖

2024/1/25
main
problem 1.多个测评机部署 消息队列？
solve 1.单测评机 文件目录分离

2024/1/26
main
probelm 1.在单个问题界面展示当前用户对当前问题的提交
solve
2024/1/27
main
problem 1.数据库 user 表更新
solve

2024/2/1
problem 1.在 OJ 上挂载 挑战积分页面
2.user 表需要更新 3.需要挑战的爬虫 (暂定 VJ) 无 API 4.优化界面
2024/1/17
problem 1.消息队列 轮询
2.changeproblem 后端 3.新数据库结构部署

2024/1/25
problem 1.提交记录分类,在问题界面展示当前用户对该问题的提交记录

2024/2/4
problem 1.绑定 cfID 功能-挑战提交记录选取-数据库重构 2.外置脚本(选取题目)
3.user 库新增 codeforceid 属性(string)

2024/2/12
problem 1.后端增加 API-特定用户的提交记录
2.code 的存储是否仿照 date

2024/2/14
problem 1.问题集页面通过的题目背景颜色不同展示 有时会报错 (异步请求)

2024/2/17
probelm 1.使用 ws 搭建一个聊天室页面 (实时通讯) 2.后端完成 chat app 的基本功能实现
3.django 自带的 wsgi asgi 是否放弃 转而使用 Gunicorn 管理服务状态（抛弃宝塔？或者宝塔已经实现）

scp -r dist root@wongansweroj.online:/home/ojfront/dist
