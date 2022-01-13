<template>
 <div id="content" v-html="html"></div>
</template>

<script>
import { marked } from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
  name: "MarkedView",
  props: {
    markDown:{
      type: String,
      default: ""
    }
  },
  computed: {
    html() {
      return marked(this.markDown)
    }
  },
  watch: {
    markDown: function() {
      this.$nextTick(() => {
        highlight.highlightAll()
      })
    }
  },
}
</script>

<style scoped>

</style>
<style lang="less">
#content {
  * {
    font-size: var(--font-page);
  }
  h1, h2 {
    font-size: var(--font-title);
    margin: 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  h3 {
    font-size: var(--font-title-h3);
    margin: 10px 0;
  }
  p {
    margin-bottom: 10px;
  }
  img {
    max-width: 100%;
  }
  code {
    border-radius: 20px
  }
  /* CodeMirror Dracula theme */
  .cm-s-inner {
    padding: .25rem;
    border: 1px solid #ffffff26 !important;
    border-radius: .25rem;
  }

  .cm-s-inner.CodeMirror, .cm-s-inner .CodeMirror-gutters {
    background-color: #282a36 !important;
    color: #f8f8f2 !important;
    border: none;
  }

  .cm-s-inner .CodeMirror-gutters {
    width: 5ch;
    color: #6d8a88;
  }

  .cm-s-inner .CodeMirror-cursor {
    border-left: solid thin #f8f8f2 !important;
  }

  .cm-s-inner .CodeMirror-linenumber {
    width: 4ch !important;
    color: #6D8A88;
  }

  .cm-s-inner .CodeMirror-line::selection, .cm-s-inner .CodeMirror-line::-moz-selection,
  .cm-s-inner .CodeMirror-line > span::selection,
  .cm-s-inner .CodeMirror-line > span::-moz-selection,
  .cm-s-inner .CodeMirror-line > span > span::selection,
  .cm-s-inner .CodeMirror-line > span > span::-moz-selection {
    background: rgba(255, 255, 255, 0.1);
  }

  .cm-s-inner span.cm-comment {
    color: #6272a4;
  }

  .cm-s-inner span.cm-string, .cm-s-inner span.cm-string-2 {
    color: #f1fa8c;
  }

  .cm-s-inner span.cm-number {
    color: #bd93f9;
  }

  .cm-s-inner span.cm-variable, .cm-s-inner span.cm-variable-2 {
    color: #50fa7b;
  }

  .cm-s-inner span.cm-def {
    color: white;
  }

  .cm-s-inner span.cm-operator {
    color: #ff79c6;
  }

  .cm-s-inner span.cm-keyword {
    color: #ff79c6;
  }

  .cm-s-inner span.cm-atom {
    color: #bd93f9;
  }

  .cm-s-inner span.cm-meta {
    color: #f8f8f2;
  }

  .cm-s-inner span.cm-tag {
    color: #ff79c6;
  }

  .cm-s-inner span.cm-attribute {
    color: #50fa7b;
  }

  .cm-s-inner span.cm-qualifier {
    color: #50fa7b;
  }

  .cm-s-inner span.cm-property {
    color: #66d9ef;
  }

  .cm-s-inner span.cm-builtin {
    color: #50fa7b;
  }

  .cm-s-inner span.cm-variable-3, .cm-s-inner span.cm-type {
    color: #ffb86c;
  }

  .md-fences.md-focus .cm-s-inner .CodeMirror-activeline-background {
    background: rgba(255, 255, 255, 0.1);
  }

  .cm-s-inner .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: white !important;
  }

  .cm-s-inner .CodeMirror-selected, .cm-s-inner .CodeMirror-selectedtext {
    background: #3b4254 !important;
    color: inherit;
    text-shadow: none;
  }

  .auto-suggest-container {
    border-color: #5b5b5b;
  }

  .auto-suggest-container .autoComplt-hint.active {
    background: #5b5b5b;
    color: #fff;
  }

  :root {
    --bg-color: #1e2022;
    --text-color: #ddd;
    --md-char-color: #5b5b5b;
    --meta-content-color: #757575;
    --table-border-color: #5b5b5b;
    --select-text-bg-color: #285194;
    --primary-color: #428bca;
    --primary-btn-border-color: #285e8e;
    --primary-btn-text-color: #ddd;
    --window-border: 1px solid #1b1b1d;
    --active-file-bg-color: #1b1b1d;
    --active-file-text-color: inherit;
    --active-file-border-color: #757575;
    --active-search-item-bg-color: #212121;
    --side-bar-bg-color: #2b2b2b;
    --item-hover-bg-color: #2e2e2e;
    --item-hover-text-color: #fff;
    --search-select-text-color: #ddd;
    --search-select-bg-color: #428bca90;
    --rawblock-edit-panel-bd: #3c3c3c;
    --monospace: 'Fira Mono', 'Cousine', 'Consolas', monospace;
    --node-fill: #1e2022;
    --node-border: #ffffff26;
  }

  html, body {
    font-family: 'Avenir Next LT Pro', 'Lato', sans-serif;
  }

  body {
    font-size: 1em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Adelle', 'Times New Roman', serif;
  }

  p {
    margin: .5rem 0;
  }

  a {
    color: #6bcafb;
  }

  del {
    color: #5b5b5b;
  }

  mark {
    padding: 0 2px 2px;
    background: #107da2eb;
    color: inherit;
  }

  blockquote {
    position: relative;
    margin: 1rem 0 1rem 2rem;
    font-family: 'Adelle', 'Times New Roman', serif;
    color: #888e9c;
  }

  blockquote::before {
    content: '';
    position: absolute;
    left: -2rem;
    height: 100%;
    width: .25rem;
    background: #428bca;
  }

  code,
  .md-fences,
  tt {
    font-family: 'Fira Mono', 'Cousine', 'Consolas', monospace;
    font-size: 1rem;
  }

  code {
    font-size: .9em;
    border: 1px solid #ffffff26;
    border-radius: .25rem;
    padding: 1px .25rem;
    background: #282a36;
  }

  kbd {
    font-family: 'Fira Mono', 'Cousine', 'Consolas', monospace;
    font-size: .875rem;
    border: 2px solid #ffffff26;
    background: #282a36;
    color: #ddd;
    box-shadow: none;
  }

  hr {
    border-color: #5b5b5b;
  }

  table {
    border: 1px solid #5b5b5b;
    margin: 1rem 0;
  }

  table tr:nth-child(2n) {
    background: #3c3c3c;
  }

  thead {
    background: #4d4d4d;
  }

  td, th {
    padding: .35rem .7rem;
    border: 1px solid #5b5b5b;
  }
}
</style>