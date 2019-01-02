import { Modal } from 'antd'
import React from 'react'
import { TreeMenu } from "../../../components"
class MenuModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  handleOk = (e) => {
    this.props.onOk()
  }

  handleCancel = (e) => {
    this.props.onCancel()
    ///
  }

  render() {
    const {...modalOpts} = this.props
    return (
      <Modal
        title="Menu Modal"
        {...modalOpts}
      >
        <TreeMenu />
      </Modal>
    )
  }
}
export default MenuModal
