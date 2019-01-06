import { Modal } from 'antd'
import React from 'react'
import { TreeMenu } from "../../../components"
// import { stringUtil } from '../../../utils'
class MenuModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeMenuIds:[],
    }
  }
  
  handleOk = (e) => {
    const modalOpts = this.props
    const {roleId} = modalOpts
    const {treeMenuIds} = this.state
    this.props.onOk(roleId,treeMenuIds)
  }

  handleCancel = (e) => {
    this.props.onCancel()
    ///
  }
  changeTreeMenuIds = (menuIds)=>{
    this.setState({
      treeMenuIds:menuIds,
    })
  }
  render() {
    const modalOpts = this.props
    // const { record } = modalOpts
    const {roleId} = modalOpts
    return (
      <Modal
        {...modalOpts}
        onOk = {this.handleOk}
      >
        <TreeMenu roleId={roleId} changeTreeMenuIds={this.changeTreeMenuIds}/>
      </Modal>
    )
  }
}
export default MenuModal
