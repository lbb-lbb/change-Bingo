<template>
    <div class="card">
        <div class="list">
            <el-card>
              <div id="content" v-html="html"></div>
            </el-card>
        </div>
        <right-menu-layout :page-title="needList"/>
    </div>
</template>

<script>
import RightMenuLayout from './RightMenuLayout'

export default {
  name: 'ViewLayout',
  components: {
    RightMenuLayout
  },
  data() {
    return {
      list: '',
      html: '<h1>call,apply,bind的用处</h1>\n' +
          '\n' +
          '<p>call，apply，bind都是为了改变调用时候this的指向，其区别是<br/>- call,apply方法是再传入一个指定的this值和若干的参数值的前提下调用某个函数或方法，作用都是相同的，只不过是call传参是一个参数列表，而apply传参是一个数组列表\n' +
          '- bind方法也是调用时候改变this的值，只不过是bind方法会返回一个函数永久绑定该this，下次可以直接调用</p>\n' +
          '\n' +
          '<h2>call的模拟实现</h2>\n' +
          '\n' +
          '<p><code>\n' +
          'Function.prototype.myCall = function(obj) {\n' +
          '    if (typeof this !== &#39;function&#39;) {\n' +
          '        throw new TypeError(&#39;Error&#39;)\n' +
          '    }\n' +
          '    //没传参数或者为null是默认是window\n' +
          '    let ctx = obj || window\n' +
          '    //复制该this函数的除第一个参数的所有参数\n' +
          '    let args = [...arguments].slice(1)\n' +
          '    // 首先要获取调用call的函数，用this可以获取\n' +
          '    ctx.fn = this\n' +
          '    //调用该函数，并且传入参数...args,返回结果result\n' +
          '    let result = ctx.fn(...args)\n' +
          '    //删除该函数的fn属性方法\n' +
          '    delete ctx.fn\n' +
          '    return result\n' +
          '}\n' +
          '</code>\n' +
          'myCall本质上是在绑定对象上新增一个方法，该方法转换成调用的函数，调用返回结果后再删除该对象上的方法，实现改变this的指向  </p>\n' +
          '\n' +
          '<h2>apply的模拟实现</h2>\n' +
          '\n' +
          '<p><code>  \n' +
          'Function.prototype.myApply = function(obj) {\n' +
          '    if (typeof this !== &#39;function&#39;) {\n' +
          '        throw new TypeError(&#39;Error&#39;)\n' +
          '    }\n' +
          '    //没传参数或者为null是默认是window\n' +
          '    let ctx = obj || window\n' +
          '    // 首先要获取调用apply的函数，用this可以获取\n' +
          '    ctx.fn = this\n' +
          '    if(arguments[1]){\n' +
          '        result = ctx.fn(...arguments[1])\n' +
          '    }else{\n' +
          '        result = ctx.fn()\n' +
          '    }\n' +
          '    //删除该函数的fn属性方法\n' +
          '    delete ctx.fn\n' +
          '    return result\n' +
          '}\n' +
          '</code>  </p>\n' +
          '\n' +
          '<p>myApply的本质实现与上面的myCall一样  </p>\n' +
          '\n' +
          '<h2>bind方法的模拟实现</h2>\n' +
          '\n' +
          '<p><code></code>` </p>\n' +
          '\n' +
          '<p>// 因为需要所有函数都能执行，所以绑定到Function.prototype上\n' +
          'Function.prototype.bindFn=function(thisArg) {\n' +
          '   if(typeof this !== &#39;function&#39;) {\n' +
          '         throw new TypeError(this +&#39; is not a function&#39;);\n' +
          '   }</p>\n' +
          '\n' +
          '<p>   // 调用bindFn方法的函数的引用\n' +
          '   var self = this;\n' +
          '   // 以数组形式保存第二个及其以后的参数\n' +
          '   var beforeArg = [].slice.call(arguments,1);</p>\n' +
          '\n' +
          '<p>   var bound = function() {\n' +
          '        // 以数组形式保存着当前函数的所有参数\n' +
          '        var afterArg = [].slice.call(arguments);\n' +
          '        // bindFn第二个及其以后的参数和当前函数所有参数的 集合\n' +
          '        // 全部传到self函数的参数里\n' +
          '        var finalArgs = beforeArg.concat(afterArg);\n' +
          '        // 如果new调用的话，this指向实例对象\n' +
          '        // 否则this指向需要绑定的对象\n' +
          '        // this instanceof bound并不准确，可以用es6中的new.target来解决\n' +
          '        return  self.apply(this instanceof bound ? this : thisArg, finalArgs);\n' +
          '   }</p>\n' +
          '\n' +
          '<p>   // new调用的时候有用\n' +
          '   // 避免es6中的箭头函数\n' +
          '   // 箭头函数没有prototype\n' +
          '   if(this.prototype) {\n' +
          '         // 避免修改 bound.prototype 污染到 this.prototype\n' +
          '      function a(){}\n' +
          '      a.prototype=this.prototype;\n' +
          '      bound.prototype=new a();\n' +
          '      bound.prototype.constructor=bound;\n' +
          '   }\n' +
          '   return bound;\n' +
          '}\n' +
          'v\n' +
          '<code></code>`</p>\n' +
          '\n' +
          '<h2>new的模拟</h2>\n' +
          '\n' +
          '<p>我们都知道通过构造函数new返回一个实例，但是使用了new操作符之后发生了什么呢？\n' +
          '- 创建一个空对象\n' +
          '- 将构造函数的prototype赋值给对象的的<em>proto</em>属性\n' +
          '- 绑定this，将该对象作为构造函数的this\n' +
          '- 返回构造函数要返回的对象，如果构造函数没有返回对象或者返回基本类型，那么就返回第一步中创建的对象\n' +
          '<code></code>`\n' +
          '//new 的模拟实现\n' +
          'function objFactory() {\n' +
          '    //创建一个空对象\n' +
          '    let obj = {}\n' +
          '        //剔除arguments中的第一个参数，并返回，实质上是第一个参数是构造函数\n' +
          '    let Con = [].shift.call(arguments)\n' +
          '        //将对象的原型指针指向该构造函数的原型，使得obj的原型为构造函数的原型\n' +
          '    obj.<em>proto</em> = Con.prototype\n' +
          '        //将该对象作为this，使用构造函数\n' +
          '    let result = Con.apply(obj, arguments)\n' +
          '        //返回对象或者构造函数中指定返回的对象\n' +
          '    return Object.prototype.toString.call(result) === &#39;[object Object]&#39; ? result : obj\n' +
          '}\n' +
          'function Par(name, age) {\n' +
          '    this.name = name\n' +
          '    this.age = age\n' +
          '}\n' +
          'let a = objFactory(Par, &#39;lbb&#39;, 99)\n' +
          'console.log(a.name)  //lbb\n' +
          'console.log(a.age)   //99</p>\n' +
          '\n' +
          '<p><code></code>`  </p>'
    }
  },
  computed: {
    needList: function() {
      const arr = []
      for (let i in this.list) {
        if (this.list[i].nodeName === 'H1' || this.list[i].nodeName === 'H2' || this.list[i].nodeName === 'H3') {
          this.list[i].setAttribute('id', this.list[i].innerText)
          const { id, innerText, nodeName } = this.list[i]
          arr.push({ id, innerText, nodeName })
        }
      }
      console.log(arr)
      return arr
    }
  },
  mounted() {
    this.list = document.getElementById('content').children
  }

}
</script>

<style lang="less" scoped>
    .card {
        display: flex;
        flex-wrap: wrap;
    }

    .list{
        margin: 0 auto;
        flex: 1 1 70%;
    }

    .el-card {
        /deep/ .el-card__body {
            padding: 10px 0 20px 10px;
        }

        /deep/ .el-card__header {
            padding: 10px 0 0 10px;
            border-bottom: none;
        }

        margin-bottom: 2vh;
        margin-right: 1vw;
    }
</style>
