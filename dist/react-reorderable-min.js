!function(e,t){"function"==typeof define&&define.amd?define(["React"],t):"object"==typeof exports?module.exports=t(require("React")):e.ReactReorderable=t(e.React)}(this,function(e){function t(e){return o(e,"scrollTop")}function r(e){return o(e,"scrollLeft")}function o(e,t){for(var r=0;e;)r+=e[t]||0,e=e.parentNode;return r}function a(e){for(;e;){if(e.className&&e.className.indexOf("react-reorderable-item")>=0)return e;e=e.parentNode}return null}function n(e){for(var r,o=e.parentNode,a=o.children,n=1/0,i=null,s=e.offsetTop+t(e.parentNode),c=0;c<a.length;c+=1)if(r=a[c],r.getAttribute("data-reorderable-key")!==e.getAttribute("data-reorderable-key")){var l=r.offsetTop-s;l>0&&n>l&&(n=l,i=r)}return i}function i(t){for(var r="node-",o={},a=[],n=0;n<t.length;n+=1)id=r+(n+1),a.push(id),t[n]=e.createElement("div",{className:"react-reorderable-item",key:id,"data-reorderable-key":id},t[n]),o[id]=t[n];return{map:o,ids:a}}var s=e.createClass({displayName:"ReactReorderable",componentWillMount:function(){var e=i(this.props.children);this.setState({order:e.ids,reorderableMap:e.map})},componentWillReceiveProps:function(e){if(e.children){var t=i(e.children);this.setState({order:t.ids,reorderableMap:t.map})}},getInitialState:function(){return{order:[],startPosition:null,activeItem:null,reorderableMap:{}}},onDragStop:function(){this.setState({activeItem:null,startPosition:null}),this.props.onDrop(this.state.order.map(function(e){return this.state.reorderableMap[e].props.children},this))},onDrag:function(){var e=this.refs.handle.getDOMNode(),t=n(e),r=e.getAttribute("data-reorderable-key"),o=this.state.order,a=o.indexOf(r);o.splice(a,1);var i=null,s=o.length;t&&(i=t.getAttribute("data-reorderable-key"),s=o.indexOf(i)),o.splice(s,0,r),this.setState({order:o}),this.props.onDrag(s),s!==a&&this.props.onChange(this.state.order.map(function(e){return this.state.reorderableMap[e].props.children},this))},onMouseDown:function(e){this.setState({mouseDownPosition:{x:e.clientX,y:e.clientY}})},onMouseMove:function(e){if(!this.state.activeItem){var o=this.state.mouseDownPosition;if(!o)return;if(Math.abs(e.clientX-o.x)>=5||Math.abs(e.clientY-o.y)>=5){var n=a(e.target),i=e.nativeEvent;this.activeItem=n,this.setState({mouseDownPosition:null,activeItem:n.getAttribute("data-reorderable-key"),startPosition:{x:n.offsetLeft-r(n),y:n.offsetTop-t(n)}},function(){this.refs.handle.handleDragStart(i),this.props.onDragStart(this.refs.active)}.bind(this))}}},render:function(){var t,r=this.state.order.map(function(t){var r="";return this.state.activeItem===t&&(r+="react-reorderable-item-active"),e.addons.cloneWithProps(this.state.reorderableMap[t],{ref:"active",onMouseDown:this.onMouseDown,onMouseMove:this.onMouseMove,className:r})},this);if(this.state.activeItem){var o=this.state.startPosition;t=e.addons.cloneWithProps(this.state.reorderableMap[this.state.activeItem],{className:"react-reorderable-handle"}),t=e.createElement(ReactDrag,{onStop:this.onDragStop,onDrag:this.onDrag,ref:"handle",start:{x:o.x,y:o.y}},t)}return e.createElement("div",{ref:"wrapper"},r,t)}});return s.propTypes={onDragStart:e.PropTypes.func,onDrag:e.PropTypes.func,onDrop:e.PropTypes.func,onChange:e.PropTypes.func},s.defaultProps={onDragStart:function(){},onDrag:function(){},onDrop:function(){},onChange:function(){}},s});