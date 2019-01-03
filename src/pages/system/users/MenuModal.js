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
    const modalOpts = this.props
    const { record } = modalOpts
    return (
      <Modal
        {...modalOpts}
      >
        <TreeMenu userId={record.id} />
      </Modal>
    )
  }
}
export default MenuModal
