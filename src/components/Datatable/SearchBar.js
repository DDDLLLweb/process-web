import React from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, Row, Card } from 'antd'
const FormItem = Form.Item

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 6,
  style: {
    // marginBottom: 16,
  },
}

const Filter =
  ({
    onFilterChange,
    filter,
    showReset,
    fetchData,
    domain,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue,
      getFieldInstance,
      getFieldProps,
      resetFields,
    },
  }) => {
    const handleFields = (fields) => {
      let updatedFileds = {}

      for (const prop in fields) {
        if (Object.prototype.toString.call(fields[prop]) === '[object Array]') {
          updatedFileds[`${prop}From`] = fields[prop][0] && fields[prop][0].format('YYYY-MM-DDTHH:mm:ss')
          updatedFileds[`${prop}To`] = fields[prop][1] && fields[prop][1].format('YYYY-MM-DDTHH:mm:ss')
        } else {
          updatedFileds[prop] = fields[prop]
        }
      }
      return updatedFileds
    }

    const handleSearch = () => {
      let fields = getFieldsValue()
      fields = handleFields(fields)
      const fliterData = Object.assign({},fetchData,fields)
      onFilterChange(fliterData)

    }

    const handleReset = () => {
      const fields = getFieldsValue()
      for (let item in fields) {
        if ({}.hasOwnProperty.call(fields, item)) {
          const f = getFieldInstance(item)
          f.clear && f.clear()

          if (fields[item] instanceof Array) {
            fields[item] = []
          } else {
            fields[item] = undefined
          }
        }
      }
      setFieldsValue(fields)
      handleSearch()
    }

    const handleChange = (key, e) => {
      let fields = getFieldsValue()
      fields[key] = e.target.value
      fields = handleFields(fields)
      onFilterChange(fields)
    }

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
      colon: false,
    }

    const renderItem = (item, domain) => {

      if (item.tag) {
        // item.filter.tag.onPressEnter = handleSearch
        item.tag = React.cloneElement(item.tag, {
          size: 'large',
          // ref: item.dataIndex,
          onChange: item.searchOnChange ? handleChange.bind(this, item.dataIndex) : null,
        })
      }

      return (
        <Col key={item.dataIndex} {...ColProps} {...item.colProps}>
          <FormItem {...formItemLayout} {...item.formItemLayout} label={item.title}>
            {getFieldDecorator(item.dataIndex, { ...item.options })(item.tag ||
              <Input size="large" onPressEnter={handleSearch} />)
            }
          </FormItem>
        </Col>
      )
    }

    return (
      <Card>
        <Row gutter={4}>
          <Col span={22}>
            <Row type="flex" justify="space-betwee" align="middle">
              {filter.map(item => renderItem(item, domain))}
            </Row>
          </Col>

          {(filter && filter.length) && <Col span={2} style={{ textAlign: 'right', marginBottom: 16 }}>
            <Button
              size="large"
              className="margin-right"
              shape="circle"
              icon="search"
              onClick={handleSearch}
              style={{ marginBottom: 8, marginRight: 8 }}
            />
            {showReset !== false && <Button
              size="large"
              className="margin-right"
              shape="circle"
              icon="sync"
              onClick={handleReset}
            />}
          </Col>}
        </Row>
      </Card>
    )
  }

Filter.propTypes = {
  form: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
