# `@isxn/isbn-ranges-converter`

![Node.js](https://img.shields.io/node/v/@isxn/isbn-ranges-converter?label=Node.js&logo=nodedotjs)

Converts an [ISBN range message](https://www.isbn-international.org/range_file_generation) from XML into JSON.

## Installation

```sh
npm i @isxn/isbn-ranges-converter
```

## Usage

1. Download the latest ISBN range message:

    ```sh
    curl -m 5 -o RangeMessage.xml -- https://www.isbn-international.org/export_rangemessage.xml
    ```

2. Convert the file:

    ```sh
    npx isbn-ranges-converter RangeMessage.xml > isbn-ranges.json
    ```
