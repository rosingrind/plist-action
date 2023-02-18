# plist-action

This action converts between `plist` and `json` using [plist](https://www.npmjs.com/package/plist) package.

[![Tests](https://github.com/rosingrind/plist-action/actions/workflows/tests.yml/badge.svg)](https://github.com/rosingrind/plist-action/actions/workflows/tests.yml)
[![Tests](https://github.com/rosingrind/plist-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rosingrind/plist-action/actions/workflows/codeql-analysis.yml)

## Usage

### Inputs

- `source` - string containing source
- `format` - source format, can be `plist` or `json`
- `pretty` - set `true` if pretty-printing output is required

### Outputs

- `target` - output field of action presented as string to chain forward

### Example

```yaml
steps:
  - name: Convert plist to json
    id: plist
    uses: rosingrind/plist-action@v1
    with:
      source: <plist><string>Hello World!</string></plist> # input string
      format: plist # source format
      pretty: true  # pretty-print output
  - name: Output plist-action result
    env:
      PLIST_ACTION_OUTPUT: ${{steps.plist.outputs.target}}
    run: echo $PLIST_ACTION_OUTPUT
```
