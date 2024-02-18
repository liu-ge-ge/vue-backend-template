//菜单源数据类型
export interface Menu {
  name?: string
  //表示这是父路由的id
  parentId: number
  // 路由路径
  path: string
  // 路由显示名称
  title: string
  // 路由使用的icon
  icon: string
  // 自己的菜单Id
  menuId: number
  //子菜单
  children: Array<Menu>
  //用于菜单
  activeIndex: string
}

// 菜单类型
export interface MenuItemType {
  //用于无限菜单解析
  parentId: number
  activeIndex: string
  path?: string
  name?: string
  component?: string | (() => Promise<unknown>)
  redirect?: string
  children: Array<MenuItemType>
  meta: {
    title: string
    icon: string
  }
}
