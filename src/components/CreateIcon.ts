import * as icons from '@ant-design/icons-vue'
import { createVNode } from 'vue'
const CreateIcon = props => {
  const { icon } = props
  return createVNode(icons[icon])
}

export default CreateIcon
