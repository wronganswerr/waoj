2024/1/5
solve
1.优化django模型 input和output数据另存一表，每条数据的上限改为16MB，问题主体存放数据ID
2.重写view中ridgetproblem方法和judger，适配solve1。
problem
1.mongodb数据库单条记录大小限制为16M 考虑使用Mysql来存储input和output
2.vue3前端处理数据时内存溢出导致崩溃
3.vue3 changeprobelm.vue 未更改

2024/1/13
problem
1.需求一个后端view,获取所有数据 目标vue和changeprobelm

2024/1/19
solve
1.vue3前端处理数据时内存溢出导致崩溃 渲染前每个数据的前一百个字符控制减小内存压力

2024/1/22
solve
1.样例独立且可以添加多个
2.changeproblem 基本完成
problem
1.服务端上的judger需要更新在本地(不需要)

2024/1/24
main
4人在线测试
problem
1.问题集的分类需求
2.多人访问时略有卡顿 (服务器)
3.多语言提交需求(java,python...)!!!
4.用户提交通过的problem在problemset界面显示AC
5.danjgo框架异步 flask框架同步? 前一个提交耗时较久时候会把后面提交的文件删除或者覆盖

2024/1/25
main
problem
1.多个测评机部署 消息队列？
solve
1.单测评机 文件目录分离

2024/1/26
main
probelm
1.在单个问题界面展示当前用户对当前问题的提交
solve
2024/1/27
main
problem
1.数据库user表更新
solve

2024/2/1
problem
1.在OJ上挂载 挑战积分页面
2.user表需要更新
3.需要挑战的爬虫 (暂定VJ) 无API
4.优化界面
2024/1/17
problem
1.消息队列 轮询
2.changeproblem 后端
3.新数据库结构部署

2024/1/25
problem
1.提交记录分类,在问题界面展示当前用户对该问题的提交记录

2024/2/4
problem
1.绑定cfID功能-挑战提交记录选取-数据库重构
2.外置脚本(选取题目)
3.user库新增codeforceid属性(string)

2024/2/12
problem
1.后端增加API-特定用户的提交记录
2.code的存储是否仿照date

2024/2/14
problem
1.问题集页面通过的题目背景颜色不同展示 有时会报错 (异步请求)

2024/2/17
probelm
1.使用ws搭建一个聊天室页面 (实时通讯)
2.后端完成chat app的基本功能实现
3.django自带的wsgi asgi 是否放弃 转而使用Gunicorn管理服务状态（抛弃宝塔？或者宝塔已经实现）


scp -r dist root@wongansweroj.online:/home/ojfront/dist