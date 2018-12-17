import React, { Component } from 'react'
import { Button, Col, Popconfirm, Row, Table } from 'antd'
import SearchBar from './SearchBar'
class DataTable extends Component {

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
    this.props.fetchAction(this.state.fetchData)
  }
  renderHeader = () => {
    const { selectedRowKeys, selectedRows, searchBarForm } = this.state
    const { buttons } = this.props
    return (
      <Row>
        <Col span={18}>
          {buttons &&
            buttons.map(b => {
              if (b.visible === false) return null
              if(b.action === 'add') {
                return (
                  <Button
                    key={b.key}
                    disabled={b.disabled}
                    type={b.type}
                    onClick={() => {
                      b.cb()
                      this.setState({
                        selectedRowKeys: [],
                        selectedRows: [],
                      })
                    }}
                    style={{ marginLeft: 8 }}
                    loading={b.loading}
                  >
                    {b.name}
                  </Button>
                )
              } else if (b.action === 'update' || b.action === 'view') {
                if (selectedRowKeys.length === 1) {
                  return (
                    <Button
                      key={b.key}
                      disabled={b.disabled}
                      type={b.type}
                      onClick={() => {
                        b.cb(selectedRowKeys, searchBarForm, selectedRows)
                        this.setState({
                          selectedRowKeys: [],
                          selectedRows: [],
                        })
                      }}
                      style={{ marginLeft: 8 }}
                      loading={b.loading}
                    >
                      {b.name}
                    </Button>
                  )
                }
              } else if (b.action === 'delete') {
                if (selectedRowKeys.length >= 1) {
                  return (
                    <Popconfirm
                      key={b.key}
                      title={'确定要删除这些记录么?'}
                      placement="left"
                      onConfirm={() => {
                        b.cb(selectedRowKeys, searchBarForm, selectedRows)
                        this.setState({
                          selectedRowKeys: [],
                          selectedRows: [],
                        })
                      }
                      }
                    >
                      <Button type={b.type} style={{ marginLeft: 8 }} loading={b.loading}>
                        {b.name}
                      </Button>
                    </Popconfirm>
                  )
                }
              } else {
                return (
                  <Button
                    key={b.key}
                    disabled={b.disabled}
                    type={b.type}
                    onClick={() => {
                      b.cb(selectedRowKeys, searchBarForm, selectedRows)
                      this.setState({
                        selectedRowKeys: [],
                        selectedRows: [],
                      })
                    }}
                    style={{ marginLeft: 8 }}
                    loading={b.loading}
                  >
                    {b.name}
                  </Button>
                )
              }
            })}
          {selectedRowKeys.length > 0 && (
            <span key="total" style={{ fontSize: 13, marginLeft: 10 }}>
              选择了 {selectedRowKeys.length} 条记录
            </span>
          )}
        </Col>
        
      </Row>
    )
  }
  render() {
    const {
      rowSelection,
      dataSource, loading, fetchAction, filter,
      enableSelection, enableDoubleClick, enablePagination, showReset,
      onSelect,onFilterChange, validToSelect, ...tableProps
    } = this.props
    const { pagination, selectedRowKeys, columns, fetchData } = this.state
    console.log("fetchdata",fetchData)
    const visibleColumns = columns.filter(c => c.visible !== false)
    pagination.total = this.props.total
    const elRowSelection = {
      // type: 'radio',
      selectedRowKeys, // 不要覆盖
      onChange: (selectedRowKeys, selectedRows) => {
        // 不要覆盖
        this.setState({
          selectedRowKeys,
          selectedRows,
        })
      },
    }
    return (
      <div>
        {filter && <SearchBar
          showReset={showReset}
          onFilterChange={onFilterChange}
          fetchData = {fetchData}
          filter={filter}
        />}
        <Table
          title={this.renderHeader}
          ref={`DataTable`}
          bordered
          rowKey={'id'}
          size="middle"
          onChange={this.handleTableChange}
          dataSource={dataSource}
          pagination={enablePagination === false ? false : pagination}
          rowSelection={enableSelection === false ? null : { ...elRowSelection, ...rowSelection }}
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