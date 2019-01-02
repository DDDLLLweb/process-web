import React from 'react'
import { connect } from 'react-redux'
import { Popconfirm, Button } from 'antd'
import { DataTable } from '../../../components'
import { DO_USER_QUERY, DO_USER_INSERT, DO_USER_SINGLE,DO_USER_DELETE,DO_USER_REFRESH_PWD, showModal, hideModal, showMenuModal, hideMenuModal } from '../../../redux/action/users'
import Modal from './Modal'
import MenuModal from './MenuModal'


class User extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  fetchList = (params) => {
    const { dispatch } = this.props
    dispatch({
      type: DO_USER_QUERY,
      payload: params,
    })
  }
 
  render() {
    const domain = 'users'
    const domainCN = '用户'
    const { dispatch, users } = this.props
    const { list, total, mode='create', modalVisible,currentItem ,menuModalVisible} = users
    const handleRefreshPass = record => {
      dispatch({
        type: DO_USER_REFRESH_PWD,
        payload: record.id,
      })
    }
    const tableProps = {
      rowKey: 'id',
      fetchAction: this.fetchList,
      onFilterChange:(fields)=>{ 
        dispatch({
          type: DO_USER_QUERY,
          payload: fields,
        })
      },
      buttons: [{
        type: 'primary',
        action: 'add',
        name: '新增',
        cb: () => { 
          dispatch(showModal('create'))
        },
      }, {
        type: 'primary',
        action: 'update',
        name: '修改',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            type: DO_USER_SINGLE,
            payload: selectedRowKeys[0],
          })
          dispatch(showModal('update'))
        },
      }, {
        action: 'view',
        name: '查看',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            type: DO_USER_SINGLE,
            payload: selectedRowKeys[0],
          })
          dispatch(showModal('view'))
        },
      }, {
        type: 'danger',
        action: 'delete',
        name: '删除',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            type: DO_USER_DELETE,
            payload: selectedRowKeys,
          })
        },
      },{
        type: 'primary',
        action: 'dealMenu',
        name:'菜单权限管理',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch(showMenuModal())
          console.log(11111)
        },
      }],
      filter: [
        {
          title: '用户名',
          dataIndex: 'username',
          options: {},
        }, 
      ],
      dispatch,
      dataSource: list,
      total,
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          align: 'center',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          align: 'center',
        },
        {
          title: '电话',
          dataIndex: 'phone',
          align: 'center',
        },{
          title: '邮箱',
          dataIndex: 'email',
          align: 'center',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          align: 'center',
        },
        {
          title: '重置密码',
          align: 'center',
          render: (value, record, index) => (
            <div>
              <Popconfirm
                title="确定要重置吗？"
                okText="是"
                cancelText="否"
                onConfirm={handleRefreshPass.bind(this, record)}
              >
                <Button type="danger" shape="circle" icon="sync"></Button>
              </Popconfirm>
            </div>
          ),
        },
      ],
    }
    const modalProps = {
      dispatch,
      mode,
      domain,
      record: currentItem || {},
      visible: modalVisible,
      maskClosable: false,
      width: '60%',
      readOnly: mode === 'view',
      title: mode === 'create' ? `新增${domainCN}` : mode === 'update' ? `修改${domainCN}` : `查看${domainCN}`,
      wrapClassName: 'vertical-center-modal',
      onOk(data) {
        dispatch({
          type: DO_USER_INSERT,
          payload: data,
        })
      },
      onCancel() {
        dispatch(hideModal())
      },
    }
    const menuModalProps = {
      dispatch,
      domain,
      record: currentItem || {},
      visible: menuModalVisible,
      maskClosable: false,
      width: '60%',
      title: '修改菜单权限',
      wrapClassName: 'vertical-center-modal',
      onOk() {
        // dispatch({
        // type: DO_USER_INSERT,
        // payload: data,
        // })
        dispatch(hideMenuModal())
      },
      onCancel() {
        dispatch(hideMenuModal())
      },
    }

    return (
      <div>
        <DataTable {...tableProps}/>
        {modalVisible && <Modal {...modalProps} />}
        {menuModalVisible && <MenuModal {...menuModalProps}/>}
      </div>
    )
  }

}

export default connect(({ dispatch, users }) => ({ dispatch, users }))(User)