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



###### Calendar 属性 (props)
* **date:** *(String, Moment.js object, Date, Function)* - default: null
* **format:** *(String)*  如果 date 为字符串，比如 2016.01.01 这种格式，就需要提供date值的格式，以便moment可以正确解析，针对 2016.01.01,format 就是 YYYY.MM.DD，相关文档请查阅 [moment文档](http://momentjs.com/docs/#/displaying/format/)
* **firstDayOfWeek** *(Number)* - default: [moment.localeData().firstDayOfWeek()](http://momentjs.com/docs/#/i18n/locale-data/)
* **onInit:** *(Function)* default: null
* **onChange:** *(Function)* default: null
* **isInvalid:** *(Function(dayMoment))* default: null
* **time:** *(Boolean)* default: false 增加时间选择
* **hour:** *(Boolean)* default: true 时间选择时，支持小时选择
* **minute:** *(Boolean)* default: true 时间选择时，支持分钟选择 
* **second:** *(Boolean)* default: true 时间选择时，支持秒数选择



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

###### Available Options (props)
* **startDate:** *(String, Moment.js object, Function)* - default: today
* **endDate:** *(String, Moment.js object, Function)* - default: today
* **format:** *(String)* 
* **firstDayOfWeek** *(Number)* - default: [moment.localeData().firstDayOfWeek()](http://momentjs.com/docs/#/i18n/locale-data/)
* **onInit:** *(Function)* default: null
* **onChange:** *(Function)* default: null
* **isInvalid:** *(Function(dayMoment))* default: null
* **ranges:** *(Object)* default: null
* **time:** *(Boolean)* default: false 增加时间选择
* **hour:** *(Boolean)* default: true 时间选择时，支持小时选择
* **minute:** *(Boolean)* default: true 时间选择时，支持分钟选择 
* **second:** *(Boolean)* default: true 时间选择时，支持秒数选择


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
				<Trigger target={<Calendar time onChange={this.handlerChange.bind(this)} />}>
					<input type="text" value={this.state.date ? date.format('YYYY.MM.DD HH:mm:ss') : '' } />
				</Trigger>
			</div>
		)
	}
}

```

###### Available Options (props)
* **target:** *(Element)* Calendar DateRange 都可以