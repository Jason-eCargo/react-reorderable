function getClosestSortable(t){for(;t;){if(t.className&&t.className.indexOf("react-sortable-item")>=0)return t;t=t.parentNode}return null}function getNextNode(t){for(var e,a=t.parentNode,o=a.children,s=1/0,i=null,n=t.offsetTop,r=0;r<o.length;r+=1)if(e=o[r],e.getAttribute("data-sortable-key")!==t.getAttribute("data-sortable-key")){var l=e.offsetTop-n;l>0&&s>l&&(s=l,i=e)}return i}var ReactSortable=React.createClass({displayName:"ReactSortable",_indexChildren:function(t){var e,a=[],o="node-";this.sortableMap={};for(var s=0;s<t.length;s+=1)e=o+(s+1),a.push(e),t[s]=React.addons.cloneWithProps(t[s],{className:"react-sortable-item",key:e,"data-sortable-key":e}),this.sortableMap[e]=t[s];this.setState({order:a})},componentWillMount:function(){this._indexChildren(this.props.children),window.addEventListener("mouseup")},componentWillReceiveProps:function(t){t.children&&this._indexChildren(t.children)},getInitialState:function(){return this.activeNode=null,{order:[],activeItem:null}},onDragStop:function(){this.setState({activeItem:null})},onDrag:function(){var t=getNextNode(this.refs.handle.getDOMNode()),e=this.refs.handle.getDOMNode().getAttribute("data-sortable-key"),a=this.state.order.indexOf(e);this.state.order.splice(a,1);var o=null,s=this.state.order.length;t&&(o=t.getAttribute("data-sortable-key"),s=this.state.order.indexOf(o)),this.state.order.splice(s,0,e)},onMouseDown:function(t){this.setState({mouseDownPosition:{x:t.clientX,y:t.clientY}})},onMouseMove:function(t){if(!this.state.activeItem){var e=this.state.mouseDownPosition;if(!e)return;if(Math.abs(t.clientX-e.x)>=5||Math.abs(t.clientY-e.y)>=5){var a=getClosestSortable(t.target),o=a.getBoundingClientRect(),s=t.nativeEvent;this.activeItem=a,this.setState({mouseDownPosition:null,activeItem:a.getAttribute("data-sortable-key"),startPosition:{x:o.left,y:o.top}},function(){this.refs.handle.handleDragStart(s)}.bind(this))}}},render:function(){var t,e=this.state.order.map(function(t){var e="";return this.state.activeItem===t&&(e+="react-sortable-item-active"),React.addons.cloneWithProps(this.sortableMap[t],{onMouseDown:this.onMouseDown,onMouseMove:this.onMouseMove,className:e})},this);if(this.state.activeItem){var a=this.state.startPosition;t=React.addons.cloneWithProps(this.sortableMap[this.state.activeItem],{className:"react-sortable-handle"}),t=React.createElement(ReactDrag,{onStop:this.onDragStop,onDrag:this.onDrag,ref:"handle",start:{x:a.x,y:a.y}},t)}return React.createElement("div",{ref:"wrapper"},e,t)}});