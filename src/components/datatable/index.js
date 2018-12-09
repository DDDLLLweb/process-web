import React,{Component} from 'react'
import { Table } from 'antd'

class DataTable extends Component{
    constructor(props) {
        super(props)
        const {
          sortBy,
          sortDirection,
          columns,
          rowKey,
        } = props
        this.state = {
          fetchData: {
            offset: 0,
            limit: 10,
            sortBy: sortBy || rowKey,
            sortDirection: sortDirection || 'ASC',
          },
          selectedRowKeys: [],
          pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
            showTotal: total => `共 ${total} 条`,
            defaultPageSize: 10,
            defaultCurrent: 0,
            total: this.props.total,
          },
          columns,
          colsSwitchVisible: false,
        }
      }
      componentDidMount = () => {
        const { filter } = this.props
        const { fetchData, pagination } = this.state
        let iniFilter = []
        filter.forEach((f) => {
          if (f.options && f.options.initialValue) {
            iniFilter.push({
              [f.dataIndex]: f.options.initialValue,
            })
          }
        })
        const newFetchData = Object.assign({}, fetchData, ...iniFilter)
        this.setState({
          fetchData: newFetchData,
          pagination: pagination,
        }, () => {
          this.fetchList()
        })
      }

      fetchList = () => {
        const { fetchAction } = this.state
        this.props.dispatch({
          type: fetchAction,
          payload: this.state.fetchData,
        })
      }
    
    render(){
      const {
        dataSource, loading, fetchAction,
        enableSelection, enableDoubleClick, enablePagination, showReset,
        onSelect, validToSelect, ...tableProps
      } = this.props
      const { pagination, columns } = this.state
      const visibleColumns = columns.filter(c => c.visible !== false)
      pagination.total = this.props.total
        return(
          <div>
          <Table
            title={this.renderHeader}
            ref={`DataTable`}
            bordered
            rowKey={'id'}
            size="middle"
            onChange={this.handleTableChange}
            dataSource={dataSource}
            pagination={enablePagination === false ? false : pagination}
            onRowDoubleClick={enableDoubleClick === false ? () => {
            } : this.handleRowDoubleClick}
            {...tableProps}
            columns={visibleColumns}
          />
          </div>
        )
    }
}

export default DataTable