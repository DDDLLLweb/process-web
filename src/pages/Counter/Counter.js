import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {increment,decrement,reset} from '../../redux/actions/counter'
import {connect} from 'react-redux'
import  './Counter.less'
class Counter extends Component {
  render() {
    return (
      <div>
        <div className="count">当前计数为{this.props.counter.count}</div>
        <button className="incre-btn" onClick={() => {
          this.props.increment()
        }}>自增
        </button>
        <button onClick={() => {
          this.props.decrement()
        }}>自减
        </button>
        <button className="reset-btn" onClick={() => {
          this.props.reset()
        }}>重置
        </button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    reset: () => {
      dispatch(reset())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Counter))
