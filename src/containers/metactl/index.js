import React from 'react'
import { connect } from 'react-redux'
import { DataTable } from '../../components'
import { DO_LOAD_METAQ_DATA } from '../../redux/action/metaq'


class Metaqtable extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
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

export default connect(({ dispatch, app}) => ({ dispatch, app }))(Metaqtable)
