import React from 'react'
import { connect } from 'react-redux'
import { DataTable } from '../../../components'
import { DO_ROLE_QUERY  } from '../../../redux/action/roles'

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
    // const domain = 'roles'
    // const domainCN = '角色'
    const { dispatch, roles } = this.props
    const { list, total} = roles
    console.log("roles",roles,this.props)
    const tableProps = {
      rowKey: 'id',
      fetchAction: this.fetchList,
      buttons: [{
        type: 'primary',
        action: 'add',
        name: '新增',
        cb: () => { 

        },
      }, {
        type: 'primary',
        action: 'update',
        name: '修改',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            // type: DO_USER_SINGLE,
            // payload: selectedRowKeys[0],
          })
        //   dispatch(showModal('update'))
        },
      }, {
        action: 'view',
        name: '查看',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
        //   dispatch(showModal('view'))
        },
      }, {
        type: 'danger',
        action: 'delete',
        name: '删除',
        cb: (selectedRowKeys, searchBarForm, selectedRows) => { 
          dispatch({
            // type: DO_USER_DELETE,
            payload: selectedRowKeys,
          })
        },
      }],
      filter: [
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
    

    return (
      <div>
        <DataTable {...tableProps}/>
      </div>
    )
  }

}

export default connect(({ dispatch, roles }) => ({ dispatch, roles }))(Role)