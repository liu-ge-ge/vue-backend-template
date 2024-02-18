export default [{
    url:'/api/auth/user',
    method:'get',
    response:()=>{
        return {
            code:0,
            message:'登录成功!',
            data:{
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
                            icon:'SketchOutlined',
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
                            icon:'SketchOutlined',
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
                            icon:'SketchOutlined',
                            //菜单Id
                            menuId:139
                        },
                    ]                    
                }

            }
    }
}]