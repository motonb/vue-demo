公司的GitLab是映射到公网的，映射的地址是`36.22.178.70:10080`

可以使用GitLab的公网的公网地址开发，如果不在公司网络操作Git仓库

```
# 以前端的项目为例

# 添加公网源（取名为out）
git remote add out http://36.22.178.70:10080/asoco/asoco-zhyy-amap-web.git

# 拉取代码（从out源更新master分支代码）
git pull out master

# 推送代码（推送patch0分支到out源）
git push out patch0

# 查看当前源
git remote -v
```

