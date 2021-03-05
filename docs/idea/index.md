---
title: React理念
group:
  title: React理念
  order: 1
  path: /intro
footer: false
---

## 从官网开始
我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。
React 最棒的部分之一是引导我们思考如何构建一个应用。
[React哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html)

## 制约快速响应的因素有哪些呢？
+ 1.CPU瓶颈，当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。
+ 2.IO的瓶颈，发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

## 内存瓶颈
当项目变得庞大、组件数量繁多时，就容易出现。

```javascript
const List = () => {
  return (
    <ul>
      {Array(length).fill(3000).map((_, i) => <li>{i}</li>)}
    </ul>
  )
}
ReactDOM.render(<List />, node)
```
主流浏览器的刷新频率是60HZ，即每秒钟刷新60次。 16.6ms刷新一次。

而js可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器执行、绘制不能同时执行。

既是在16.6ms内需要完成: JS脚本执行 --> 样式布局 --> 样式绘制

假如超出了这个时间范围，这次刷新就没有时间执行**样式布局**和**样式绘制**了.
如此页面就产生了卡顿现象。

### 时间切片
在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件。
当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则
等待下一帧时间到来继续被中断的工作。这就涉及到React的可中断异步更新。

> 这种将长任务分拆到每一帧中，每次执行一小段任务的操作，
> 被称为时间切片（time slice）

这目前还属于React的实验内容。需开启Concurrent Mode

## IO瓶颈
网络延迟、网络的快慢咱无能为力，但是可以减少用户对网络延迟的感知。

当“这一小段时间”足够短时，用户是无感知的。如果请求时间超过一个范围，再显示loading的效果。

试想如果我们一点击按钮就显示loading效果，即使数据请求时间很短，loading效果一闪而过。用户也是可以感知到的。

为此，React实现了**Suspense**功能及配套的hook **useDeferredValue**。

而在源码内部，为了支持这些特性，同样需要将同步的更新变为可中断的异步更新。


