# Express + Routing-Controllers + TypeORM Example

## Frameworks

- **Express**
- **Routing-Controllers**
- **TypeORM**
- **TypeCI**
## Setup
- TypeScript
- Mysql

## 编译
#### 代码结构说明
```shell
├─ package-lock.json
├─ package.json
├─ src # 项目主代码
│  ├─ app.ts
│  ├─ config.ts
│  ├─ bdConfig.ts
│  ├─ config.ts
│  ├─ index.ts
│  ├─ modules # 项目功能模块代码
│  │  ├─ users
│  │  │  ├─ controller.ts # 控制器
│  │  │  ├─ dto # 参数类型
│  │  │  ├─ index.ts
│  │  │  ├─ model.ts # 模型（表结构说明）
│  │  │  ├─ repository.ts 
│  │  │  └─ service.ts # 服务
│  ├─ log # 日志
│  ├─ middlewares # 中间件
│  ├─ utils # 工具方法
```
## Project setup
```
npm install
```
 
### Compiles and minifies for production
```
npm run build
```

### Compiles and hot-reloads for production
```
npm run build:watch
```

### Compiles and hot-reloads for development
```
npm run start
```