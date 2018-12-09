import React from 'react';
import { connect } from 'react-redux';
import { Divider, Tag } from 'antd';
import { DataTable } from '../../components';
import { DO_LOAD_METAQ_DATA } from '../../redux/action/metaq'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a>{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a>Invite {record.name}</a>
      <Divider type="vertical" />
      <a>Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
class Metaqtable extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        dataSource: []
      }
    }
    tableProps = {

    }
   
    render(){
        const { dataSource } = this.state
        return (
          <DataTable fetchAction={DO_LOAD_METAQ_DATA} dataSource={dataSource} tableProps={this.tableProps} />
        )
    }
    
}

export default connect(({ dispatch, app}) => ({ dispatch, app }))(Metaqtable);
