import { parser } from "./syntax.grammar"
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from "@codemirror/language"
import { styleTags, tags as t } from "@lezer/highlight";
import { completeFromList } from "@codemirror/autocomplete"

export const boolLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        "AND": t.operatorKeyword,
        "and": t.operatorKeyword,
        "And": t.operatorKeyword,
        "OR": t.operatorKeyword,
        "or": t.operatorKeyword,
        "Or": t.operatorKeyword,
        "NOT": t.operatorKeyword,
        "not": t.operatorKeyword,
        "Not": t.operatorKeyword,
        Identifier: t.variableName,
        "( )": t.paren
      })
    ]
  }),
});

export function bool() {
  return new LanguageSupport(boolLanguage, boolLanguage.data.of({
    autocomplete: completeFromList([
      {label: "AND", type: "keyword"},
      {label: "OR", type: "keyword"},
      {label: "NOT", type: "keyword"},
    ]),
  }))
}