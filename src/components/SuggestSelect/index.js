import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
// import lodash from 'lodash'
import { Select } from 'antd'
import { config, networkUtils } from '../../utils'

const { api } = config
const { suggest } = api.common
const Option = Select.Option

class SuggestSelect extends React.Component {
  constructor(props) {
    super(props)
    const { value, params, mode } = this.props
    if(mode === 'multiple') {
      value ? value : []
    } else {
      value ? value : null
    }
    this.state = {
      params,
      value: value,
      dataSource: [],
      fetching: false,
    }
  }

  componentDidMount = () => {
    this.fetchData = debounce(this.fetchData, 800)
    this.fetchData()
  }

  componentWillReceiveProps = (nextProps) => {
    // let sameParam = true
    // if (!lodash.isEqual(this.props.params, nextProps.params)) {
    //   sameParam = false
    //   this.setState({ value: null }, () => {
    //     this.fetchData(nextProps.params, () => { // 放到回调函数判断属性值
    //       this.setState({ value: null })
    //     })
    //   })
    // }
    // if (sameParam) { // 相同查询条件,判断属性value
    //   !nextProps.value ?
    //     this.setState({ value: null }) :
    //     this.setState({ value: nextProps.isString === 'true' ?
    //       nextProps.value : parseInt(nextProps.value, 10)})
    // } else {
    //   this.setState({ 
    //     value: nextProps.isString === 'true' ?
    //       nextProps.value : parseInt(nextProps.value, 10)})
    // }
  }

  onFoucus = () => {
    const { params } = this.props
    params && this.fetchData(params)
  }

  handleSearch = (value) => {
    this.fetchData({ key: value })
  }

  clear = () => {
    this.setState({
      value: null,
    })
  }

  handleSelect = (value, option) => {
    this.props.onChange(value)
    let oldValue = this.state.value
    if(this.props.mode === 'multiple') {
      if(!oldValue) {
        oldValue = []
      }
      // if(oldValues.includes(value)) {
        
      // }
      oldValue.push(value)
    } else {
      oldValue = value
    }
    this.setState({
      value: oldValue,
      fetching: false,
    })
  }

  // handleChange = (value) => {
  //   this.props.onChange(value)
  // }
  handleDeSelect = (value) => {
    const newValues = this.state.value.filter(item => item !== value)
    this.setState({
      value: newValues,
    })
  }

  fetchData = (params, cb) => {
    this.setState({ fetching: true })
    networkUtils.request({
      method: 'get',
      url: suggest[this.props.apiName],
      data: { ...params, ...this.props.params },
    }).then((data) => {
      if (data.success) {
        this.setState({
          dataSource: data.data,
          fetching: false,
        })
      }
    })
  }

  render() {
    const { dataSource, value } = this.state
    const { disabled, size, showCode, showSearch, mode } = this.props

    return (
      <Select
        mode={mode ? mode : 'tags'}
        onFocus={this.onFoucus}
        disabled={disabled}
        showSearch={showSearch}
        value={value}
        placeholder="请至少输入一个字符"
        size={size}
        style={{ width: '100%' }}
        onSelect={this.handleSelect}
        onSearch={this.handleSearch}
        onDeselect={this.handleDeSelect}
      >
        { dataSource && dataSource.map(d =>
          <Option key={d.id} value={d.id} >{d.name} {showCode && `(${d.code})`}</Option>)}
      </Select>
    )
  }
}

SuggestSelect.propTypes = {
  apiName: PropTypes.string,
  dataSource: PropTypes.array,
}

export default SuggestSelect
