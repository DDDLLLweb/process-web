import React from 'react'
import { connect } from 'react-redux'
import { DataTable } from '../../../components'
import { DO_ROLE_QUERY, DO_ROLE_INSERT, DO_ROLE_SINGLE, DO_ROLE_DELETE, hideModal, showModal } from '../../../redux/action/roles'
import Modal from './Modal'
class Role extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  fetchList = (params) => {
    const { dispatch } = this.props
    // console.log("dispatch",dispatch)
    dispatch({
      type: DO_ROLE_QUERY,
      payload: params,
    })
  }
 
  render() {
    const domain = 'roles'
    const domainCN = '角色'
    const { dispatch, roles } = this.props
    const { list, total, mode='create', modalVisible,currentItem} = roles
    console.log("roles",roles,this.props,modalVisible)
    const tableProps = {
      rowKey: 'id',
      fetchAction: this.fetchList,
      onFilterChange:(fields)=>{ 
        dispatch({
          type: DO_ROLE_QUERY,
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
            type: DO_ROLE_SINGLE,
            payload: selectedRowKeys[0],
          })
          dispatch(showModal('update'))
        },
      }, {
        action: 'view',
        name: '查看',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            type: DO_ROLE_SINGLE,
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
            type: DO_ROLE_DELETE,
            payload: selectedRowKeys,
          })
        },
      }],
      filter: [
        {
          title: '角色编码',
          dataIndex: 'roleCode',
          options: {},
        }, 
        {
          title: '角色名称',
          dataIndex: 'roleName',
          options: {},
        }, 
      ],
      dispatch,
      dataSource: list,
      total,
      columns: [
        {
          title: '角色编码',
          dataIndex: 'roleCode',
          align: 'center',
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          align: 'center',
        },
        {
          title: '角色描述',
          dataIndex: 'roleDesc',
          align: 'center',
        },{
          title: '角色类型',
          dataIndex: 'roleType',
          align: 'center',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'center',
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
        console.log(data)
        dispatch({
          type: DO_ROLE_INSERT,
          payload: data,
        })
      },
      onCancel() {
        dispatch(hideModal())
      },
    }


    return (
      <div>
        <DataTable {...tableProps}/>
        {modalVisible && <Modal {...modalProps} />}
      </div>
    )
  }

}

export default connect(({ dispatch, roles }) => ({ dispatch, roles }))(Role)