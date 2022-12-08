# CodeMirror 6 Boolean Language support

This package provides extension support for simple boolean queries typically seen in literature databases.

It is forked from [lang-example](https://github.com/codemirror/lang-example) and [https://github.com/ShreyRavi/lang-simpleboolean](https://github.com/codemirror/lang-example)
and shares their license.

## Syntax
Syntax is a simple generalization of boolean syntax seen on large literature databases like PubMed. Binary operators provided are:

- `AND`
- `OR`
- `NOT`

Which are given in order of precedence and may either be all lower or upper case.

To specify precedence, `(` and `)` may wrap any expression.

All other tokens are treated as identifiers/variables.

### Examples

```
ketchup AND mustard
```

```
(rice and "soy sauce") 
OR 
(potatos AND cheese)
```