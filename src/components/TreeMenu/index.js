import React from 'react'
import { Tree, Icon } from 'antd'
import debounce from 'lodash.debounce'
const { TreeNode } = Tree
import { networkUtils, config } from '../../utils'
import './index.less'
const { api } = config
const { common } = api
const { userMenu } = common

const treeData = [{
  title: '0-0',
  key: '0-0',
  menuIcon: 'smile-o',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0', menuIcon: 'smile-o' },
      { title: '0-0-0-1', key: '0-0-0-1', menuIcon: 'smile-o' },
      { title: '0-0-0-2', key: '0-0-0-2', menuIcon: 'smile-o' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}]

class TreeMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      dataSource: treeData,
      fetching: false,
    }
  }
  componentDidMount = () => {
    this.fetchData = debounce(this.fetchData, 800)
    this.fetchData()
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys })
  }

  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys })
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item} icon={<Icon type={item.menuIcon} />}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode {...item} key={item.key} icon={<Icon type={item.menuIcon} />} />
  })
  fetchData = (params, cb) => {
    this.setState({ fetching: true })
    networkUtils.request({
      method: 'get',
      url: userMenu,
    }).then(data => {
      if (data.success) {
        this.setState({
          dataSource: data.data,
          fetching: false,
        }, () => {
          const { userId } = this.props
          networkUtils.request({
            method: 'get',
            url: userMenu,
            data: { userId: userId },
          }).then((data) => {
            if (data.success) {
              const menuIds = data.data.map(menu => menu.menuId)
              this.setState({
                selectedKeys: menuIds || [],
              })
            }
          })
        })
      }
    })
  }
  render() {
    const { dataSource } = this.state
    return (
      <Tree
        checkable
        showIcon
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
        className="treeMenu"
      >
        {this.renderTreeNodes(dataSource)}
      </Tree>
    )
  }
}
export default TreeMenu