import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Modal, Row } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  colon: false,
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
    // marginBottom: 20,
  },
}

const ColProps = {
  xs: 24,
  sm: 24,
  md: 8,
  xl: 8,
  style: {},
}

const modal =
  ({
    mode,
    readOnly,
    record,
    onOk,
    onCancel,
    dispatch,
    loading,  
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
    ...modalProps   
  }) => {
    const items = [{
      title: '角色编码',
      dataIndex: 'roleCode',
      options: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      tag: <Input disabled={readOnly} />,
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      options: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      tag: <Input disabled={readOnly} />,
    }, {
      title: '角色描述',
      dataIndex: 'roleDesc',
      options: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      tag: <Input disabled={readOnly} />,
    }, {
      title: '角色类型',
      dataIndex: 'roleType',
      options: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      tag: <Input disabled={readOnly} />,
    }, {
      title: '备注',
      dataIndex: 'remark',
      options: {
        rules: [
          {
            required: true,
            message: '必填',
          },
        ],
      },
      tag: <Input disabled={readOnly} />,
    },
    ]
    
    const handleOk = () => {
      if (mode === 'view') {
        onOk({})
        return 0
      }
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
        }
        let payload = {}
        if(record) {
          payload = Object.assign({},record,data)
        }
        onOk(payload)
      })
    }

    const modalOpts = {
      ...modalProps,
      onCancel: onCancel,
      footer: [
        <Button key="back" onClick={onCancel}>取消</Button>,
        mode !== 'view' &&
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
        >保存</Button>,
      ],
    }

    const renderItem = (item) => {
      return (
        <Col key={item.dataIndex} {...ColProps} {...item.colProps}>
          <FormItem
            label={item.title}
            hasFeedback={!readOnly && !!(item.options) && !!(item.options.rules)}
            {...formItemLayout}
            {...item.formItemLayout}
          >
            {getFieldDecorator(item.dataIndex, {
              ...item.options,
              initialValue: record[`${item.dataIndex}`] || (item.options && item.options.initialValue),
            })(item.tag)}
          </FormItem>
        </Col>
      )
    }

    return (
      <Modal {...modalOpts}>
        <Row type="flex" justify="start">
          {items.map(item => renderItem(item))}
        </Row>
      </Modal>
    )
  }

modal.propTypes = {
  readOnly: PropTypes.bool,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  record: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
