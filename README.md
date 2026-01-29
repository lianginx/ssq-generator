# ssq-generator

一个 TypeScript 工具库，用于生成中国福利彩票双色球彩票号码。

## 特性

- 生成随机的 **单注** 号码
- 支持 **批量生成** 多注号码
- 支持 **复式** 和 **胆拖** 两种模式
- 提供 **TypeScript** 类型定义
- 兼容 **CJS** 和 **ESM** 模块系统

## 安装

### 使用 npm 安装

```bash
npm install ssq-generator
```

## 使用示例

### 1. 生成单注号码

生成一个随机的 **单注** 号码：

```ts
import { generateSSQ } from 'ssq-generator';

const ticket = generateSSQ();
console.log(ticket);
```

**示例输出：**

```ts
{
  reds: [3, 7, 12, 18, 24, 31],
  blue: 9
}
```

### 2. 批量生成多注号码

生成一批指定数量的号码：

```ts
import { generateSSQBatch } from 'ssq-generator';

const batch = generateSSQBatch(5);
console.log(batch);
```

### 3. 生成 **复式** 号码

在 **复式模式** 下，你可以选择多个红球和蓝球，库会自动生成所有合法组合。

```ts
import { generateFromMultiple } from 'ssq-generator';

const tickets = generateFromMultiple({
  reds: [1, 3, 5, 7, 9, 11, 13],
  blues: [2, 6]
});

console.log(tickets);
```

这将生成 14 注号码，因为 `C(7, 6) * 2 = 14` 种组合。

### 4. 生成 **胆拖** 号码

在 **胆拖模式** 下，你可以选择固定的红球（“胆码”）和灵活的红球（“拖码”），库会自动组合生成符合规则的号码。

```ts
import { generateFromDantuo } from 'ssq-generator';

const tickets = generateFromDantuo({
  redDan: [3, 8],
  redTuo: [1, 5, 7, 9, 12],
  blueDan: 6
});

console.log(tickets);
```

### 5. 校验号码是否合法

检查给定的号码是否合法（必须包含 6 个红球和 1 个蓝球）：

```ts
import { validateSSQ } from 'ssq-generator';

const ticket = generateSSQ();
const isValid = validateSSQ(ticket);

console.log(isValid);  // true 或 false
```

## API

### `generateSSQ()`

生成一注随机的双色球号码，包括 6 个红球和 1 个蓝球。

### `generateSSQBatch(count: number)`

生成指定数量的双色球号码。

### `generateFromMultiple(multiple: SSQMultiple)`

在 **复式模式** 下，生成所有可能的红球和蓝球组合。

### `generateFromDantuo(dantuo: SSQDantuo)`

在 **胆拖模式** 下，生成固定红球（“胆码”）与灵活红球（“拖码”）的所有合法组合。

### `validateSSQ(ticket: SSQTicket)`

验证给定的双色球号码是否符合规则。

## 许可证

本项目采用 MIT 许可证 - 详情见 [LICENSE](LICENSE) 文件。
