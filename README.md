# beyond-datetime

简体中文版，浏览器支持 ie9+ （ie8未经测试过）

fork from [http://adphorus.github.io/react-date-range](http://adphorus.github.io/react-date-range)


## 文档

### 安装
```
$ npm install --save beyond-datetime
```

## 使用

### Calendar

日期选择器


#### 基本用法


```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { Calendar } from 'beyond-datetime';

class MyComponent extends Component {
	handlerSelect(date){
		console.log(date); // Date object
	}

	render(){
		return (
			<div>
				<Calendar onChange={this.handlerSelect} />
			</div>
		)
	}
}

```

#### 增加时间选择
```javascript 
class MyComponent extends Component {
	handlerSelect(date){
		console.log(date); // Momentjs object
	}

	render(){
		return (
			<div>
				<Calendar time onChange={this.handlerSelect} />
			</div>
		)
	}
}

```

#### 禁止选择前一天以及更早的日期
```javascript 
const invalidDates = (date)=>{
	let today = new Date
	today.setHours(0)
	today.setMinutes(0)
	today.setSeconds(0)
	today.setMilliseconds(0)
	return  +date < +today
}

class MyComponent extends Component {

	render(){
		return (
			<div>
				<Calendar invalidDates={invalidDates} />
			</div>
		)
	}
}

```

#### 从外部通过属性更新，禁止内部setState进行更新， onChange 事件必须返回 false 阻止内部 state 更新，本例也适用于 DateRange、 Time 组件

```javascript 
class MyComponent extends Component {

	constructor(props){
		super(props)
		this.state = {
			date : new Date
		}
	}

	handlerChange(date){
		this.setState({date})
		return false  // 返回false 阻止 Calendar 组件内部刷新
	}

	render(){
		return (
			<div>
				<Calendar date={this.state.date} onChange={this.handlerChange.bind(this)}  />
			</div>
		)
	}
}

```



#### Calendar API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| defaultDate    | Date   | 设定默认日期值  | - |
| date    | Date   | 设定日期值  | - |
| onChange |  Function  | 改变日期/时间事件 | - |
| onConfirm |  Function  | 通过确定按钮改变日期/时间事件 | - |
| invalidDates | Function  | 禁止选择的日期  | - |
| confirm |  boolean  | 显示确定按钮 | - |
| time        | boolean   | 是否显示时间选择     | false |
| second      | boolean   |   是否显示秒选择    |  true |
| timeFilter      | Array   |   时间过滤    |  - |


### DateRange

日期范围选择器

#### 基本用法

```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { DateRange } from 'beyond-datetime';

class MyComponent extends Component {
	handlerSelect(range){
		console.log(range.startDate,range.endDate);
	}

	render(){
		return (
			<div>
				<DateRange onChange={this.handlerSelect}/>
			</div>
		)
	}
}

```
#### 使用默认预设（包括今天，昨天，最近7天，最近30天）选择范围

```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { DateRange,defaultRanges } from 'beyond-datetime';

class MyComponent extends Component {

	handlerSelect(range){
		console.log(range.startDate,range.endDate);
	}

	render(){
		return (
			<div>
				<DateRange ranges={defaultRanges} onChange={this.handlerSelect} />
			</div>
		)
	}
}

```
#### 时间过滤

```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { DateRange,defaultRanges } from 'beyond-datetime';
const filter = ()=> [[0,3,6,9,12,15,18,21],[0,15,30,45,60],[0,15,30,45,60]]
class MyComponent extends Component {

	handlerSelect(range){
		console.log(range.startDate,range.endDate);
	}

	render(){
		return (
			<div>
				<DateRange timeFilter={filter} ranges={defaultRanges} onChange={this.handlerSelect} />
			</div>
		)
	}
}

```

#### DateRange API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| defaultStartDate    | Date   | 设定默认的开始日期值  | - |
| defaultEndDate    | Date   | 设定默认的结束日期值  | - |
| startDate    | Date   | 设定开始日期值  | - |
| endDate    | Date   | 设定结束日期值  | - |
| onChange |  Function  | 改变日期/时间事件 | - |
| onConfirm |  Function  | 通过确定按钮改变日期/时间事件 | - |
| ranges |  Array  | 快捷的日期范围选择 | - |
| invalidDates | Function  | 禁止选择的日期  | - |
| time        | boolean   | 是否显示时间选择     | false |
| second      | boolean   |   是否显示秒选择    |  true |
| timeFilter      | Array   |   时间过滤    |  - |
| startTimeFilter      | Array   |   开始日期时间过滤，优先级高于 timeFilter    |  - |
| endTimeFilter      | Array   |   结束日期时间过滤，优先级高于 timeFilter    |  - |


### Time

时间选择器

#### 基本用法

```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { Time } from 'beyond-datetime';
const filter = ()=> [[0,3,6,9,12,15,18,21],[0,15,30,45,60],[0,15,30,45,60]]

class MyComponent extends Component {
	handlerSelect(range){
		console.log(range.startDate,range.endDate);
	}

	render(){
		return (
			<div>
				<Time filter={filter} onChange={this.handlerSelect}/>
			</div>
		)
	}
}

```


#### Time API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| defaultDate    | Date   | 设定默认日期值  | - |
| date    | Date   | 设定日期值  | - |
| onChange |  Function  | 改变日期/时间事件 | - |
| onConfirm |  Function  | 通过确定按钮改变日期/时间事件 | - |
| confirm |  boolean  | 显示确定按钮 | - |
| second      | boolean   |   是否显示秒选择    |  true |
| filter      | Array   |   时间过滤    |  - |



### Trigger
```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { Calendar,Trigger } from 'beyond-datetime';

class MyComponent extends Component {

	constructor(props){
		super(props)
		this.state = {
			date : null
		}
	}

	handlerChange(date){
		this.setState({date})
	}

	render(){
		let {date} = this.state
		return (
			<div>
				<Trigger target={<Calendar defaultDate={date} time onConfirm={this.handlerChange.bind(this)} />}>
					<input type="text" value={date ? date.toString() : '' } />
				</Trigger>
			</div>
		)
	}
}

```

#### Trigger API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| target    | Calendar/DateRange  | -  | - |
| wrapStyle    | object  | Trigger 会默认生成一个 div (style="display:inline-block")标签实现定位， 使用 wrapStyle 进行覆盖该div默认样式  | - |