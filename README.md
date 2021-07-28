### TODO

#### 解析 json-schema

- [x] 1. rff 与 antd 结合，实现表单功能;
- [x] 2. 实现按条件显示；
- [ ] 3. 将 FormItem、Input、final-form.field 结合成一个组件；
- [ ] 4. json-schema 实现实例化，具备父级、子级递归功能；
- [ ] 5. 将 json-schema 属性转成 rrf 组件属性；
- [ ] 6. 完善数据验证；

#### 生成 json-schema（表单设计器）

- 新版


### 引用
- [understanding-json-schema](https://json-schema.org/understanding-json-schema/)

### 底层框架的实现逻

拖拉拽式流程设计器 + 拖拉拽式表单设计器
流程设计器定义了一个业务场景的流转过程和每个流转节点所需的收集的数据，
表单提供

### 一种基于矢量图形的流程代码转换方法：

使用 H5 画板（canvas）相关的绘图能力，画出具有 BPMN 语义标准的业务流程图，同时根据业务需求设置画板各个元素的相关属性，再通过 javascript 解析出画板上各个元素的的属性并生成后端可以解析的 xml 或 JSON 格式的文件，提交给后端，后端根据 xml 或 JSON 文件解析出流程引擎所需的各个参数，将这些参数应用于流程引擎中。

### 一种基于数据集的数据图形自动转换展示系统：

在系统上通过在  html  页面上使用图形化、拖拽等方式，配置基于 JavaScript 的开源可视化图表库所需的各个参数，通过配置约定好各展示图形所需的数据格式及数据类型规范，后端根据设计约定好的数据格式和数据类型规范，采集各个业务系统里面的数据，生成符合设计规范的数据集，并把生成的数据集通过 API 的形式提供给前端使用，前端再配置图形获取数据集的 API 地址，就能将数据集以图表的形式展示出来。

### 基于流程和图表怎么搭建业务系统

流程设计器提供根据 BPMN 语义标准，定义了完成一个业务场景的所需完成的任务、任务的执行顺序及完成每个任务所需要收集的数据的能力；表单设计器提供表单的设计、展示、填写表单能力，用于收集业务数据；图形设计器提供对数据图形化展示、统计的能力；三者结合，完成搭建一个业务系统，即流程完业务梳理，流程定义，表单辅助流程完成流程的数据收集、推动流程向前走，业务流程走完后，使用图形工具对数据进行梳理、统计、总结。
