import { Component, Fragment } from "react"
import extend from "extend"
import util from "util.react"
import FaceScroll from "face-scroll"
require('./index.css')
class Scroll extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {
            loadingStart: false,
            loadingEnd: false,
            fetchEndCloseAnimate: false,
            pullUpEmpty: false,
            offsetY: 0,
            padding: {
                start: false,
                end: false
            }
        }
    }
    isDisable = () => {
        const self = this
        if (typeof self.$refs === 'undefined' || typeof self.$refs.scroll === 'undefined') {
            return false
        }
        var scrollHeight = (self.$refs.scroll.getBoundingClientRect().bottom - self.$refs.scroll.getBoundingClientRect().top)
        var contentHeight = (self.$refs.content.getBoundingClientRect().bottom - self.$refs.content.getBoundingClientRect().top)
        return contentHeight < scrollHeight
    }
    componentDidMount () {
        const self = this
        self.scroll = new FaceScroll({
           onRelease: function (padding) {
               if (padding.start > self.props.pullDownDistance) {
                   self.scroll.close(self.props.pullDownDistance, function () {
                       self.setState({
                           loadingStart: true
                       })
                       new Promise(self.props.pullDownFetch).then(function (data) {
                           data = data || {}
                           switch(data.type) {
                               case '':
                               break;
                               default:
                                   self.setState({
                                       loadingStart: false
                                   }, function () {
                                       self.setState({
                                           fetchEndCloseAnimate: true
                                       })
                                       self.scroll.close(0, function () {
                                           self.setState({
                                               fetchEndCloseAnimate: false
                                           })
                                       })
                                   })
                           }

                       })
                   })
                   return false
               }
               if (padding.end > self.props.pullUpDistance) {
                   self.scroll.close(self.props.pullUpDistance, function () {
                       self.setState({
                           loadingEnd: true
                       })
                       new Promise(self.props.pullUpFetch).then(function (data) {
                           data = data || {}
                           switch(data.type) {
                               case 'empty':
                                    self.setState({
                                        pullUpEmpty: true
                                    })
                               break;
                               default:
                                   self.setState({
                                       pullUpEmpty: false
                                   })
                           }
                           self.setState({
                               loadingEnd: false
                           }, function () {
                               self.setState({
                                   fetchEndCloseAnimate: true
                               })
                               self.scroll.close(0, function () {
                                   self.setState({
                                       fetchEndCloseAnimate: false
                                   })
                               })
                           })

                       })
                   })
                   return false
               }
               return true
           },
           padding: function (mount) {
                var scrollHeight = (self.$refs.scroll.getBoundingClientRect().bottom - self.$refs.scroll.getBoundingClientRect().top)
                var contentHeight = (self.$refs.content.getBoundingClientRect().bottom - self.$refs.content.getBoundingClientRect().top)
                return {
                    start: self.state.offsetY + mount,
                    end: scrollHeight - contentHeight - self.state.offsetY + mount
                }
           },
           throttle: function (padding) {
                var ratioOfPaddingToScroll = padding / self.$refs.scroll.offsetHeight
                var min = 0.1
                var max = 0.4
                var diff = max - min
                ratioOfPaddingToScroll = 1 - ratioOfPaddingToScroll
                return min + (ratioOfPaddingToScroll * diff)
            },
           onChange: function (mount, padding) {
               self.setState({
                   offsetY: self.state.offsetY + mount,
                   padding
               })
           }
       })
       self.forceUpdate()
       self.$refs.scroll.addEventListener('touch', function (e) {
           if (self.isDisable()) { return }
           e.preventDefault()
           e.stopPropagation()
       })
        self.$refs.scroll.addEventListener('touchstart', function (e) {
            if (self.isDisable()) { return }
            e.preventDefault()
            e.stopPropagation()
            self.scroll.touchStart(e.touches[0].clientY)
        })
        self.$refs.scroll.addEventListener('touchmove', function (e) {
            if (self.isDisable()) { return }
            e.preventDefault()
            e.stopPropagation()
            self.scroll.touchMove(e.touches[0].clientY)
        })
        self.$refs.scroll.addEventListener('touchend', function (e) {
            e.preventDefault()
            e.stopPropagation()
            self.scroll.touchEnd()
        })
    }
    render() {
        const ref = util.ref(this)
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')
        if (self.isDisable()) {
            rootClassName = rootClassName + ' ' + self.props.prefixClassName + '--disable'
        }
        return (
            <div
                ref={ref`scroll`}
                className={rootClassName}
                style={self.props.style}
            >
                <div
                    ref={ref`content`}
                    style={{
                        transform: `translateX(0px) translateY(${self.state.offsetY}px) translateZ(0px)`
                    }}
                >
                    {
                        self.state.loadingStart?
                        (
                            <span className={`${self.props.prefixClassName}-content-pullDown-loading`}>
                                {self.props.pullDownLoading}
                            </span>
                        )
                        :

                            self.state.fetchEndCloseAnimate?
                            null:
                            <Fragment>
                            {
                                self.state.padding.start < self.props.pullDownDistance && self.state.padding.start !== false?
                                (
                                    <span className={`${self.props.prefixClassName}-content-pullDown-tip`}>
                                        {self.props.pullDownTip}
                                    </span>
                                ):null
                            }
                            {
                                self.state.padding.start > self.props.pullDownDistance?
                                (
                                    <span className={`${self.props.prefixClassName}-content-pullDown-releaseTip`}>
                                        {self.props.pullDownReleaseTip}
                                    </span>
                                ):null
                            }
                            </Fragment>

                    }
                    {self.props.children}
                    {
                        self.state.loadingEnd?
                        (
                            <span className={`${self.props.prefixClassName}-content-pullUp-loading`}>
                                {self.props.pullUpLoading}
                            </span>
                        )
                        :

                            self.state.fetchEndCloseAnimate?
                            null:
                            <Fragment>
                            {
                                self.state.padding.end < self.props.pullUpDistance&& self.state.padding.end !== false?
                                (
                                    <span className={`${self.props.prefixClassName}-content-pullUp-tip`}>
                                        {self.props.pullUpTip}
                                    </span>
                                ):null
                            }
                            {
                                self.state.padding.end > self.props.pullUpDistance?
                                (
                                    <span className={`${self.props.prefixClassName}-content-pullUp-releaseTip`}>
                                        {self.props.pullUpReleaseTip}
                                    </span>
                                ):null
                            }
                            </Fragment>

                    }
                    {
                        self.state.pullUpEmpty?
                        (
                            <span className={`${self.props.prefixClassName}-content-pullUp-empty`}>
                                {self.props.pullUpEmpty}
                            </span>

                        ):null
                    }
                </div>
            </div>
        )
    }
}
require('./props').default(Scroll)
export default Scroll
module.exports= Scroll
