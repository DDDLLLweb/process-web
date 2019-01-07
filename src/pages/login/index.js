/**
 * Created by hao.cheng on 2017/4/14.
 */
import React from 'react'
import { DO_CAPTCHA } from '../../redux/action/login'
import { DO_LOGIN } from '../../redux/action/app'
import { Avatar, Form, Icon, Input,Button, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import b1 from '../../style/imgs/b1.jpg'
import './index.less'
import SnowStorm from 'react-snowstorm'

const FormItem = Form.Item

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const { app, dispatch } = this.props
    const { user } = app
    if (user) {
      dispatch(push('/app'))
    } else {
      // dispatch({
      //   type: DO_CAPTCHA,
      // })
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: DO_LOGIN,
          payload: values,
        })
      }
    })
  };

  changeCap = () => {
    const { dispatch } = this.props
    dispatch({
      type: DO_CAPTCHA,
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form
    // const { captcha } = this.props.login
    return (
      <div>
        <SnowStorm />
        <Form onSubmit={this.handleSubmit} className="loginForm">
          <FormItem className="userphoto">
            <Avatar size="large" style={{ backgroundColor: '#fff' }} src={b1} />
          </FormItem>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          {/**<FormItem>
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(
                  <Input placeholder="验证码" />
                )}
              </Col>
              <Col span={12} style={{ height: 10 }} onClick={this.changeCap}>
                <img src={captcha} alt="captcha" className="captcha" />
              </Col>
            </Row>
              </FormItem>**/}
          <FormItem>
            {getFieldDecorator('rememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default connect(({ dispatch, app, login }) => ({ dispatch, app, login }))(Form.create()(LoginForm))