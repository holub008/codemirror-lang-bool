import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight";
import {Completion, autocompletion, CompletionContext} from "@codemirror/autocomplete"

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

/**
 * Customizable autocomplete function for lang-bool
 * @param completeFromListParameter Completion[]
 * @returns CodeMirror autocomplete
 */
export const boolCompletion = (completeFromListParameter: Completion[]=[]) => {
  function getCompletionsFromList(list: Completion[]) {
    let options = list.map(o => typeof o == "string" ? { label: o } : o);
    let [span, match] = [/\w*$/, /\w+$/];
    return (context: CompletionContext) => {
      let token = context.matchBefore(match);
      return token || context.explicit ? { from: token ? token.from : context.pos, options, span } : null;
    };
  }
  return autocompletion({
    override: [getCompletionsFromList(completeFromListParameter.concat([
      {label: "AND", type: "keyword"},
      {label: "OR", type: "keyword"},
      {label: "NOT", type: "keyword"},
    ]))]
  });
}
export function bool() {
  return new LanguageSupport(boolLanguage)
}