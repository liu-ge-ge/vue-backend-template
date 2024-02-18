export default [{
    url:'/api/login',
    method:'post',
    response:()=>{
        return {
            code:0,
            message:'登录成功!',
            data:{
                access_token:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VybmFtZVwiOlwiYWRtaW5cIixcInRlbmFudElkXCI6Mn0iLCJleHAiOjE3MDc5ODgyMTUsImlhdCI6MTcwNzkwMTgxNX0.3dub2w0mKhwi71JFrfCe911Y58GimTdNdWEKJEJyUcM",
                user:{
                    avatar:'https://avatars.githubusercontent.com/u/65114586?v=4',
                    nickname:'liugege',
                    sex:'1',
                    roles:[
                        {
                            comments:'管理员',
                            roleName:'管理员',
                            roleId:4,
                            roleCode:'admin'
                        }
                    ],
                    authorities:[
                        {
                            //表示这是父路由的id,如果是0就代表是顶级路由
                            parentId:0,
                            // 路由路径
                            path:'/user',
                            // 路由显示名称
                            title:'个人中心',
                            // 路由使用的icon
                            icon:'',
                            //菜单Id
                            menuId:126
                        },
                        {
                            //表示这是父路由的id,如果是0就代表是顶级路由
                            parentId:126,
                            // 路由路径
                            path:'/user/profile',
                            // 路由显示名称
                            title:'个人资料',
                            // 路由使用的icon
                            icon:'',
                            //菜单Id
                            menuId:138
                        },
                        {
                            //表示这是父路由的id,如果是0就代表是顶级路由
                            parentId:126,
                            // 路由路径
                            path:'/user/message',
                            // 路由显示名称
                            title:'我的消息',
                            // 路由使用的icon
                            icon:'',
                            //菜单Id
                            menuId:139
                        },
                    ]                    
                }

            }
        }
    }
}]