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

#### 基本用法




```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { Calendar } from 'beyond-datetime';

class MyComponent extends Component {
	handlerSelect(date){
		console.log(date); // Momentjs object
	}

	render(){
		return (
			<div>
				<Calendar 
					onInit={this.handlerSelect} 
					onChange={this.handlerSelect} />
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
				<Calendar time 
					onInit={this.handlerSelect} 
					onChange={this.handlerSelect} />
			</div>
		)
	}
}

```

#### 禁止选择前一天以及更早的日期
```javascript 
const isInValidDate = (dayMoment)=> dayMoment.isBefore(new Date,'day')

class MyComponent extends Component {

	render(){
		return (
			<div>
				<Calendar isInvalid={isInValidDate} />
			</div>
		)
	}
}

```
#### 从外部更新日期组件，禁止内部setState进行更新
```javascript 
class MyComponent extends Component {

	constructor(props){
		super(props)
		this.state = {
			date : null
		}
	}

	handlerSelect(date){
		this.setState((state, props) => ({date}))
		return false  // 返回false 阻止 Calendar 组件内部刷新
	}

	render(){
		return (
			<div>
				<Calendar date={this.state.date} onChange={this.handlerSelect}  />
			</div>
		)
	}
}

```



#### Calendar API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| date    | string/Moment/date/function   | 设定日期值  | - |
| format    | string   |  如果 date 为字符串，比如 2016.01.01 这种格式，就需要提供date值的格式，以便moment可以正确解析，针对 2016.01.01,format 就是 YYYY.MM.DD，相关文档请查阅 moment文档 | - |
| firstDayOfWeek   |  number   |   -     |  moment.localeData().firstDayOfWeek() |
| onInit   |  function  | 初始化事件    | - |
| onChange |  function  | 改变日期/时间事件 | - |
| onConfirm |  function  | 使用Trigger时，使用该事件代替onChange事件 | - |
| isInvalid | function  | 禁止选择的日期  | - |
| time        | boolean   | 是否显示时间选择     | false |
| minute      | boolean   | 是否显示分选择      | true |
| second      | boolean   |   是否显示秒选择    |  true |
| yearLowerLimit      | number   | 年份下限设置      | - |
| yearUpperLimit      | number   | 年份上限设置    |  - |


### DateRange

#### 基本用法

```javascript
require('beyond-datetime/css/index.css')
import React, { Component } from 'react';
import { DateRange } from 'beyond-datetime';

class MyComponent extends Component {
	handlerSelect(range){
		console.log(range.startDate,range.endDate);
		// An object with two keys,
		// 'startDate' and 'endDate' which are Momentjs objects.
	}

	render(){
		return (
			<div>
				<DateRange
					onInit={this.handlerSelect}
					onChange={this.handlerSelect}
				/>
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

	render(){
		return (
			<div>
				<DateRange ranges={defaultRanges} />
			</div>
		)
	}
}

```

#### DateRange API (props)

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| startDate    | string/Moment/date/function   | 设定日期值  | - |
| endDate    | string/Moment/date/function   | 设定日期值  | - |
| format    | string   |  如果 date 为字符串，比如 2016.01.01 这种格式，就需要提供date值的格式，以便moment可以正确解析，针对 2016.01.01,format 就是 YYYY.MM.DD，相关文档请查阅 moment文档 | - |
| firstDayOfWeek   |  number   |   -     |  moment.localeData().firstDayOfWeek() |
| onInit   |  function  | 初始化事件    | - |
| onChange |  function  | 改变日期/时间事件 | - |
| onConfirm |  function  | 使用Trigger时，使用该事件代替onChange事件 | - |
| ranges |  object  | 快捷范围选择 | - |
| isInvalid | function  | 禁止选择的日期  | - |
| time        | boolean   | 是否显示时间选择     | false |
| second      | boolean   |   是否显示秒选择    |  true |
| yearLowerLimit      | number   | 年份下限设置      | - |
| yearUpperLimit      | number   | 年份上限设置    |  - |


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
		this.setState((state, props) => ({date}))
	}

	render(){
		return (
			<div>
				<Trigger target={<Calendar date={this.state.date} time onConfirm={this.handlerChange.bind(this)} />}>
					<input type="text" value={this.state.date ? this.state.date.format('YYYY.MM.DD HH:mm:ss') : '' } />
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
| wrapStyle    | object  | Trigger 会默认生成一个 span (style="display:inline-block")标签，使用wrapStyle 进行覆盖  | - |