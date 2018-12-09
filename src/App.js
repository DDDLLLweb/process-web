import React,{ Component } from 'react';
import { Layout} from 'antd';
import { connect } from 'react-redux';
import { API_PRINCIPAL } from './redux/action/app' 
import './App.less';
import './style/index.less';
import {HeaderCustom,SiderMenu} from './components/';
import { routesNode,childRoutes } from './routes';
const { Content, Footer ,Sider} = Layout;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    componentDidMount () {
       const { dispatch } = this.props;
        dispatch({
            type: API_PRINCIPAL
        })
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed
        });
    }
    render() {
        const { auth } = this.props;
        console.log(childRoutes);
        return (
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
                <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={ {auth}|| {}} />
                <Content style={{ margin: '0 16px' }}>
                    { routesNode }
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
                </Layout>
            </Layout>
        );
    }
}
// 负责输入逻辑 即将state 映射到UI组件的参数（props）
// const mapStateToProps = state => {
//     // return {auth, responsive};
// };
// 负责输出逻辑 即将用户对UI组件的操作映射成Action 从UI组件传出去
// Redux中的bindActionCreators，是通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)(隐式调用）
// const mapDispatchToProps = dispatch => 
//     bindActionCreators({
//       queryXsrf,
//       changePage: () => push('/login')
//     },
//     dispatch
//   );

export default connect(({dispatch,app}) => ({ dispatch,app }))(App);
