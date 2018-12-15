import React from 'react'
import { connect } from 'react-redux'
import { DataTable } from '../../../components'
import { DO_USER_QUERY } from '../../../redux/action/users'
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
    const { dispatch, users } = this.props
    const { list, total } = users
    const tableProps = {
      fetchAction: this.fetchList,
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
          sorter: true,
          align: 'center',
        },
        {
          title: '昵称',
          dataIndex: 'nickname',
          align: 'center',
          sorter: true,
        },
        {
          title: '电话',
          dataIndex: 'phone',
          align: 'center',
          sorter: true,
        },
        {
          title: '性别',
          dataIndex: 'sex',
          align: 'center',
          sorter: true,
        },
      ],
    }
    return <DataTable {...tableProps}/>
  }

}

export default connect(({ dispatch, users }) => ({ dispatch, users }))(User)