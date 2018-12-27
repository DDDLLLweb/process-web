import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { API_PRINCIPAL } from './redux/action/app'
import './App.less'
import './style/index.less'
import { HeaderCustom, SiderMenu } from './components/'
import { routesNode } from './routes'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
const { Content, Footer, Sider } = Layout
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: API_PRINCIPAL,
    })
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    })
  }
  render() {
    const { auth } = this.props
    return (
      <LocaleProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <SiderMenu inlineCollapsed={this.state.collapsed} theme="dark" />
          </Sider>
          <Layout>
            <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={{ auth } || {}} />
            <Content style={{padding:20}}>
              {routesNode}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
             
            </Footer>
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}
export default connect(({ dispatch, app }) => ({ dispatch, app }))(App)
